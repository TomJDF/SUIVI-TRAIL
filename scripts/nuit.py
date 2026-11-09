#!/usr/bin/env python3
"""Reconstitue la nuit qui se termine le matin du jour donné à partir des enregistrements de sommeil Suunto (via Freddy).

Usage : python3 scripts/nuit.py enregistrements.json AAAA-MM-JJ
enregistrements.json : liste de {start, end (ISO avec fuseau), duree_s, eveil_s, vfc, fc_min, fc_moy, score, sieste}
  (sleep_BedtimeStart, sleep_BedtimeEnd, sleep_Duration, sleep_WakeAfterSleepOnsetDuration, sleep_AvgHRV,
   sleep_HRMin, sleep_HRAvg, sleep_SleepQualityScore, sleep_IsNap)
Écrit sur la sortie l'entrée "sommeil" pour data.json, ou {} s'il n'y a pas de nuit qui finit ce matin-là.
Règles : on ignore les siestes et les faux « sommeils » de journée (montre posée, début entre 6 h et 18 h) ;
une nuit coupée en plusieurs morceaux (moins de 90 min d'écart) est recollée.
"""
import json, sys, datetime as dt

def t(s): return dt.datetime.fromisoformat(s.replace('Z', '+00:00'))

def main(path, day):
    W = dt.date.fromisoformat(day)
    recs = []
    for r in json.load(open(path)):
        if r.get('sieste') in (True, 'true'): continue
        a, b = t(r['start']), t(r['end'])
        if 6 <= a.hour < 18: continue                       # montre posée en journée
        lo = dt.datetime.combine(W - dt.timedelta(days=1), dt.time(18), a.tzinfo)
        hi = dt.datetime.combine(W, dt.time(13), b.tzinfo)
        if a >= lo and b <= hi: recs.append(dict(r, a=a, b=b))
    if not recs: print('{}'); return
    recs.sort(key=lambda r: r['a'])
    grp = [recs[-1]]
    for r in reversed(recs[:-1]):                           # recolle les morceaux proches de la fin
        if (grp[0]['a'] - r['b']).total_seconds() <= 90 * 60: grp.insert(0, r)
        else: break
    sl = [max(0, float(r.get('duree_s') or 0) - float(r.get('eveil_s') or 0)) for r in grp]
    tot = sum(sl) or 1
    w = lambda k: round(sum(float(r[k]) * s for r, s in zip(grp, sl) if r.get(k) is not None) / sum(s for r, s in zip(grp, sl) if r.get(k) is not None)) if any(r.get(k) is not None for r in grp) else None
    m = round(tot / 60)
    out = {'vfc': w('vfc'), 'fc_min': min(int(float(r['fc_min'])) for r in grp if r.get('fc_min') is not None) if any(r.get('fc_min') is not None for r in grp) else None,
           'fc_moy': w('fc_moy'), 'duree': '%dh%02d' % (m // 60, m % 60), 'coucher': grp[0]['a'].strftime('%H:%M'), 'lever': grp[-1]['b'].strftime('%H:%M'), 'score': w('score')}
    gaps = sum((grp[i]['a'] - grp[i - 1]['b']).total_seconds() for i in range(1, len(grp)))
    eveil = round((sum(float(r.get('eveil_s') or 0) for r in grp) + gaps) / 60)
    if eveil >= 15: out['eveil_min'] = eveil
    if grp[0]['a'].hour < 21 and grp[0]['a'].hour >= 18 and tot > 10.5 * 3600:
        out['a_verifier'] = 'début de nuit à vérifier (montre hors du poignet ?)'
    print(json.dumps({k: v for k, v in out.items() if v is not None}, ensure_ascii=False))

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
