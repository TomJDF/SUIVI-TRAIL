#!/usr/bin/env python3
"""Fusionne les données du jour dans data.json (utilisé par la tâche du matin et par Claude).

Usage : python3 scripts/maj_jour.py payload.json

payload.json peut contenir, toutes facultatives :
  "sommeil": { "AAAA-MM-JJ" (date du réveil): {vfc, fc_min, fc_moy, duree, coucher, lever, score, profond, rem, note} }
  "pas":     { "AAAA-MM-JJ": nombre_de_pas }
  "seances": { "AAAA-MM-JJ": [ {nom, type, km, dp, fc, duree} ] }   (remplace les séances Strava du jour ; les renfos et séances "manuel" restent)
  "dos":     { "AAAA-MM-JJ": {etat: "ok"|"gene"|"douleur", score, derouillage, nuit, note} }
  "douleurs":{ "AAAA-MM-JJ": [ {zone: "mollet droit", etat: "ok"|"gene"|"douleur", score, note} ] }   (hors dos)
Les champs existants d'une nuit sont conservés sauf s'ils sont fournis (la note n'est jamais effacée).
Les km et le D+ de chaque semaine qui a des séances sont recalculés (course, trail, rando, marche) ; la note de la semaine est gardée.
"""
import json, sys, datetime as dt, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / 'data.json'
PIED = {'Run', 'TrailRun', 'Hike', 'Walk', 'VirtualRun'}

def monday(day):
    d = dt.date.fromisoformat(day)
    return (d - dt.timedelta(days=d.weekday())).isoformat()

def main(path):
    d = json.loads(DATA.read_text())
    p = json.loads(pathlib.Path(path).read_text())
    for k, v in p.get('sommeil', {}).items():
        cur = d.setdefault('sommeil', {}).get(k, {})
        note = cur.get('note')
        cur.update({x: y for x, y in v.items() if y not in (None, '')})
        if note and not v.get('note'):
            cur['note'] = note
        d['sommeil'][k] = cur
    for k, v in p.get('pas', {}).items():
        d.setdefault('pas', {})[k] = int(v)
    for k, v in p.get('dos', {}).items():
        d.setdefault('dos', {}).setdefault(k, {}).update(v)
    for k, v in p.get('douleurs', {}).items():
        # une liste par jour : {zone, etat: ok|gene|douleur, score, note} ; même zone = remplacée
        cur = {x.get('zone'): x for x in d.setdefault('douleurs', {}).get(k, [])}
        for x in v: cur[x.get('zone')] = x
        d['douleurs'][k] = list(cur.values())
    touched = set()
    for k, v in p.get('seances', {}).items():
        # la liste Strava remplace celle du jour, mais les séances notées à la main (renfo, etc.) restent
        noms = {a.get('nom') for a in v}
        gardees = [a for a in d.setdefault('seances', {}).get(k, []) if (a.get('type') == 'Renfo' or a.get('manuel')) and a.get('nom') not in noms]
        d['seances'][k] = v + gardees
        touched.add(monday(k))
    # recalcul des semaines touchées
    for mon in touched:
        days = [(dt.date.fromisoformat(mon) + dt.timedelta(days=i)).isoformat() for i in range(7)]
        acts = [a for day in days for a in d.get('seances', {}).get(day, []) if a.get('type') in PIED]
        w = d.setdefault('semaines', {}).setdefault(mon, {})
        w['km'] = round(sum(float(a.get('km') or 0) for a in acts), 1)
        w['dplus'] = int(round(sum(float(a.get('dp') or 0) for a in acts)))
    d['maj'] = dt.datetime.now(dt.timezone(dt.timedelta(hours=1))).strftime('%d/%m/%Y')
    DATA.write_text(json.dumps(d, ensure_ascii=False, indent=1) + '\n')
    print(json.dumps({'ok': True, 'sommeil': sorted(p.get('sommeil', {})), 'pas': sorted(p.get('pas', {})),
                      'seances': sorted(p.get('seances', {})), 'semaines': sorted(touched)}, ensure_ascii=False))

if __name__ == '__main__':
    main(sys.argv[1])
