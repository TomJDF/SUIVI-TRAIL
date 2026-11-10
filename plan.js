/* Le plan de saison (fixe). Les données réalisées sont dans data.json. */
const PHASES = [
  { id:'pre', name:'Avant le plan', c:'--pr', start:'2026-09-28', end:'2026-10-25', km:[0,0], dp:[0,0], pre:true,
    sub:'Les 4 semaines qui ont lancé la saison',
    week:[],
    focus:['Vameval : FC max 181, VMA 17,5-18 km/h','U Periplu : 16e sur 114, 91 % de FC max pendant 1h45','Point de départ : environ 35 km et 1 200 m de D+ par semaine','Alerte : footings faciles qui partent vers 150, aine droite qui tire'],
    races:['pv5k','periplu'] },
  { id:'nov', name:'Bloc novembre', c:'--p0', start:'2026-10-26', end:'2026-11-29', km:[30,40], dp:[1000,1800],
    sub:'30-40 km/sem · calmer l\'aine',
    week:[['Lun','Renfo kiné (programme du cycle)'],['Mar','GUMP, footing sous 141'],['Mer','CAB : côtes, pas de sprint'],['Jeu','Renfo kiné (programme suivant)'],['Ven','Footing 40 min sous 141'],['Sam','Sortie montagne'],['Dim','Repos ou marche']],
    focus:['Serrage adducteurs tous les jours, test du matin','Calvi : sub 1h, montée de départ à 170-173, pas de sprint final','14-15/11 : reco du San Parteu ou deux tours de Zucca','San Parteu : montée 145-155, descentes gardées'],
    races:['calvi','parteu'] },
  { id:'recup', name:'Récup', c:'--pr', start:'2026-11-30', end:'2026-12-13', km:[25,25], dp:[500,500],
    sub:'Footings courts, randos, point aine et dos',
    week:[['Lun','Renfo léger'],['Mar','GUMP tranquille'],['Mer','Footing ou vélo'],['Jeu','Mobilité'],['Ven','Repos'],['Sam','Rando'],['Dim','Libre']],
    focus:['Faire le point sur l\'aine et le dos','Rien d\'intense, on recharge'],
    races:[] },
  { id:'base', name:'Base hiver', c:'--p1', start:'2026-12-14', end:'2027-02-14', km:[35,50], dp:[1000,1500],
    sub:'35 → 50 km/sem · 80 % sous 141 · renfo lourd',
    week:[['Lun','Renfo kiné (programme du cycle)'],['Mar','GUMP, footing sous 141'],['Mer','CAB : VMA (30/30, 400, 1000), la séance dure'],['Jeu','GUMP en version légère : avec le groupe, sans forcer'],['Ven','Renfo kiné (programme suivant) ou repos'],['Sam','Montagne douce 2h30 → 3h30'],['Dim','Repos ou rando']],
    focus:['Le volume facile développe les muscles, ton vrai point faible','Renfo lourd : descente de box et SLRDL lestés jusqu\'à 16 kg','Courses courtes = la séance de qualité de la semaine','Une semaine sur quatre allégée de 30 %'],
    races:['cross','blanc','mandria'] },
  { id:'constr', name:'Construction', c:'--p2', start:'2027-02-15', end:'2027-04-11', km:[45,60], dp:[1500,2200],
    sub:'45 → 60 km/sem · seuil en côte · SL jusqu\'à 5h',
    week:[['Lun','Renfo kiné (programme du cycle)'],['Mar','GUMP, footing sous 141'],['Mer','CAB en version légère : avec le groupe, sans forcer'],['Jeu','GUMP côtes, la séance dure : montées au seuil, 160-165'],['Ven','Renfo kiné (programme suivant) ou repos'],['Sam','Montagne douce 3h30 → 5h'],['Dim','1h30 facile en montagne']],
    focus:['Nutrition 60-70 g/h sur chaque sortie de plus de 2h30','Premiers week-ends doublés','Renfo : fente bulgare, step-down lent, sauts sur box'],
    races:['monte'] },
  { id:'spe', name:'Spécifique', c:'--p3', start:'2027-04-12', end:'2027-06-13', km:[55,70], dp:[2200,3000],
    sub:'55 → 70 km/sem · terrain Corte · sorties de nuit',
    week:[['Lun','Renfo kiné, 2 tours'],['Mar','GUMP, footing sous 141'],['Mer','CAB en version légère : avec le groupe, sans forcer'],['Jeu','GUMP côtes ou descente rapide, la séance dure'],['Ven','Renfo kiné (programme suivant) ou repos'],['Sam','Montagne longue 5h → 7h'],['Dim','1h30 → 3h de montagne douce']],
    focus:['Reconnaissances autour de Corte dès que la neige le permet','Trois sorties qui partent vers 2h-3h du matin','Week-ends choc : 1 500 m puis 1 000 m de D+','Gravona en gérant, Pietralba à 145-150 de FC'],
    races:['gravona','venaco','pietralba'] },
  { id:'aff', name:'Affûtage', c:'--p4', start:'2027-06-14', end:'2027-07-10', km:[45,25], dp:[1500,800],
    sub:'Volume −30 puis −50 % · sommeil · rien de nouveau',
    week:[['Lun','Renfo mobilité et activation'],['Mar','Footing court'],['Mer','Rappel d\'intensité court'],['Jeu','Footing court'],['Ven','Repos'],['Sam','Sortie 2h-3h max'],['Dim','Repos']],
    focus:['Pause GUMP pendant l\'affûtage : coucher tôt, zéro alcool, footings seul ou au CAB','Matériel et nutrition figés','Dernière semaine : grosses nuits du lundi au jeudi','Sieste le vendredi après-midi avant le départ de 2h'],
    races:[] }
];

const RACES = {
  pv5k:     { d:'2026-10-04', label:'04/10',   name:'5 km Porto-Vecchio', f:'5 km route' },
  periplu:  { d:'2026-10-18', label:'18/10',   name:'U Periplu', f:'11 km · 1 060 D+' },
  calvi:    { d:'2026-11-07', label:'07/11',   name:'Trail in Calvi', note:'objectif sub 1h', f:'Giru di a Serra · 11 km · 324 D+ · une montée de 240 m' },
  parteu:   { d:'2026-11-29', label:'29/11',   name:'San Parteu', f:'23 km · 1 958 D+', key:true },
  cross:    { d:'2027-01-24', label:'24/01',   name:'Cross de Corte', f:'cross' },
  blanc:    { d:'2027-01-31', label:'fin jan.', name:'Restonica Trail Blanc', note:'date à confirmer', f:'18 km · 650 D+ · Corte' },
  mandria:  { d:'2027-02-14', label:'~15/02',  name:'Mandrialinca', f:'9 km · 900 D+' },
  monte:    { d:'2027-03-29', label:'29/03',   name:'Trail di Monte', f:'13 km · 800 D+' },
  gravona:  { d:'2027-04-18', label:'avril',   name:'Gravona', note:'date à confirmer', f:'Marathon 40 km · 2 600 D+ · Ucciani', key:true },
  venaco:   { d:'2027-05-02', label:'déb. mai', name:'Venaco', f:'19 km · 2 000 D+' },
  pietralba:{ d:'2027-06-05', label:'05/06',   name:'Pietralba', note:'en contrôle', f:'L\'Alturaghja 45 km · 2 900 D+', key:true }
};


/* Plan de course Restonica (objectif sub 13h, départ 2h). Heures et rythmes estimés à partir du GPX de la course :
   à recaler avec les sorties longues de l'hiver et Pietralba. Chaque partie a sa séance type pour imprimer le rythme. */
const RESTO = {
  pass: [
    { t:'2h00', n:'Départ Corte', km:0, alt:430 },
    { t:'4h35', n:'Aleri', km:13, alt:1580, dp:1510, bar:'7h05', rav:'boisson + petite nourriture' },
    { t:'7h00', n:'Inzecche', km:26.6, alt:1710, dp:2150, bar:'10h45', rav:'repas chaud' },
    { t:'7h25', n:'Ninu', km:29.8, alt:1750, dp:2210, rav:'pointage' },
    { t:'9h40', n:'Bocca a Soglia', km:41.6, alt:2010, dp:2910, rav:'eau seulement' },
    { t:'10h25', n:'Grotelle chez Téo', km:45.7, alt:1370, dp:2910, rav:'repas chaud' },
    { t:'11h15', n:'Tragone-César', km:51, alt:1020, dp:2940, bar:'17h05', rav:'boisson' },
    { t:'12h20', n:'Alzu', km:56, alt:1580, dp:3570, rav:'repas chaud' },
    { t:'14h40', n:'Arrivée Corte', km:68.5, alt:430, dp:3690 }
  ],
  parts: [
    { n:'Montée 1', up:true, km:'0 → 8', alt:'430 → 1 810 m', d:'+1 450 m', dur:'1h50', rythme:'~790 m/h', fc:'145-150, pas plus', note:'De nuit, à la frontale. Tout le monde part trop vite : laisse partir, tu reprendras le temps dans les descentes.',
      seance:'Montée continue de 45 min à 1h à 145-150, en visant 750-800 m/h (Zucca, Cima). Une fois par mois à la frontale.' },
    { n:'Descente 1', up:false, km:'8 → 16', alt:'1 810 → 1 160 m', d:'−720 m', dur:'1h20', rythme:'~6 km/h', fc:'relâché', note:'Encore de nuit. On descend propre, sans se cramer les cuisses : il reste 50 km.',
      seance:'Descente technique à la frontale, allure facile, regard loin devant.' },
    { n:'Montée 2', up:true, km:'16 → 27', alt:'1 160 → 1 770 m', d:'+680 m', dur:'1h55', rythme:'~5,5 km/h', fc:'140-150', note:'Longue montée roulante, le jour se lève. Alterner course et marche. Repas chaud à Inzecche.',
      seance:'Sortie de 2h en montée douce, en alternant 4 min courues et 1 min marchée, sans dépasser 150.' },
    { n:'Faux-plat', up:false, km:'27 → 34', alt:'1 770 → 1 540 m', d:'−250 m', dur:'1h10', rythme:'~6,3 km/h', fc:'135-145', note:'Courir en relâché et manger : c\'est là qu\'on remplit le réservoir avant le point haut.',
      seance:'Footing vallonné de 1h en mangeant 60 g de glucides : habituer l\'estomac à manger en courant.' },
    { n:'Montée 3', up:true, km:'34 → 39', alt:'1 540 → 2 210 m', d:'+680 m', dur:'1h05', rythme:'~630 m/h', fc:'145-155', note:'Le point haut, après 7h de course. C\'est le moment de ton coup de mou de Pietralba : arriver avec des glucides avalés depuis le départ. À Bocca a Soglia, il n\'y a que de l\'eau.',
      seance:'Une montée de 600-700 m en fin de sortie longue, après 3h ou plus d\'effort.' },
    { n:'Grande descente', up:false, km:'39 → 49', alt:'2 210 → 1 010 m', d:'−1 230 m', dur:'1h50', rythme:'~5,8 km/h', fc:'libre', note:'Ton point fort. Doubler, mais garder des cuisses pour la suite. Repas chaud à Grotelle.',
      seance:'Longue descente technique de 1 000 m en fin de sortie longue. Au renfo, la descente de box.' },
    { n:'Montée 4', up:true, km:'49 → 53', alt:'1 010 → 1 640 m', d:'+640 m', dur:'1h00', rythme:'~640 m/h', fc:'145-155', note:'Raide, vers midi, en pleine chaleur. S\'arroser, sel dans les flasques. Alzu en haut : ne pas s\'asseoir.',
      seance:'Montée raide de 600 m en milieu de journée quand il fait chaud (printemps, été).' },
    { n:'Descente finale', up:false, km:'53 → 68,5', alt:'1 640 → 430 m', d:'−1 320 m', dur:'2h25', rythme:'~5,5 km/h', fc:'libre', note:'13 km jusqu\'à Corte, dans la chaleur de l\'après-midi. Si les jambes et le carburant sont là, c\'est là que tu doubles du monde.',
      seance:'Enchaîner une longue descente à la fin d\'une sortie de 5h ou plus.' }
  ]
};
