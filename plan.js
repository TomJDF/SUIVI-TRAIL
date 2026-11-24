/* Le plan de saison (fixe). Les données réalisées sont dans data.json. */
const PHASES = [
  { id:'pre', name:'Avant le plan', c:'--pr', start:'2026-09-28', end:'2026-10-25', km:[0,0], dp:[0,0], pre:true,
    sub:'Les 4 semaines qui ont lancé la saison',
    week:[],
    focus:['Vameval : FC max 181, VMA 17,5-18 km/h','U Periplu : 16e sur 114, 91 % de FC max pendant 1h45','Point de départ : environ 35 km et 1 200 m de D+ par semaine','Alerte : footings faciles qui partent vers 150, aine droite qui tire'],
    races:['pv5k','periplu'] },
  { id:'nov', name:'Bloc novembre', c:'--p0', start:'2026-10-26', end:'2026-11-29', km:[30,40], dp:[1000,1800],
    sub:'30-40 km/sem · San Parteu le 29/11',
    week:[['Lun','Renfo kiné (programme du cycle)'],['Mar','GUMP, footing sous 141'],['Mer','CAB : côtes, pas de sprint'],['Jeu','Renfo kiné (programme suivant)'],['Ven','Footing 40 min sous 141'],['Sam','Sortie montagne'],['Dim','Repos ou marche']],
    focus:['Aine : plus rien depuis début novembre, dossier classé le 12/11','Calvi : sub 1h, montée de départ à 170-173, pas de sprint final','14-15/11 : reco du San Parteu ou deux tours de Zucca','San Parteu : FC moyenne 158-162, 165 max en montée, bâtons, 60 g de glucides par heure','San Parteu, matériel obligatoire : 1 L d\'eau, veste à capuche, couverture de survie, sifflet, téléphone, gobelet, réserve alimentaire','San Parteu : ravitos aux km 10,3 et 15,8 · barrière au sommet à 12h30'],
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
    races:['figatellu','monte'] },
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
  parteu:   { d:'2026-11-29', label:'29/11',   name:'San Parteu', note:'Trail di a Sant\'Andria, Felicetu · départ 9h · inscrit', f:'A Teppa di San Parteu · 23 km · 1 958 D+', key:true },
  cross:    { d:'2027-01-24', label:'24/01',   name:'Cross de Corte', f:'cross' },
  blanc:    { d:'2027-01-31', label:'fin jan.', name:'Restonica Trail Blanc', note:'date à confirmer', f:'18 km · 650 D+ · Corte' },
  mandria:  { d:'2027-02-14', label:'~15/02',  name:'Mandrialinca', f:'9 km · 900 D+' },
  figatellu:{ d:'2027-03-07', label:'mars',    name:'Figatellu o Pane Seccu', note:'date à confirmer (8 mars en 2026)', f:'10 km · 600 D+ · Ghisoni' },
  monte:    { d:'2027-03-29', label:'29/03',   name:'Trail di Monte', f:'13 km · 800 D+' },
  gravona:  { d:'2027-04-18', label:'avril',   name:'Gravona', note:'date à confirmer', f:'Marathon 40 km · 2 600 D+ · Ucciani', key:true },
  venaco:   { d:'2027-05-02', label:'déb. mai', name:'Venaco', f:'19 km · 2 000 D+' },
  pietralba:{ d:'2027-06-05', label:'05/06',   name:'Pietralba', note:'en contrôle', f:'L\'Alturaghja 45 km · 2 900 D+', key:true }
};


/* Fiche course San Parteu (29/11) : profil tiré du GPX (un point tous les 200 m), passages estimés, plan nutri.
   Le GPX donne 22,2 km / 1 830 D+ (le règlement annonce 23 km / 1 958 D+). */
const RACEPLAN = {
  parteu: {
    titre:'San Parteu', date:'Dim. 29/11 · départ 9h · place de Felicetu', obj:'Arrivée vers 12h30-12h45', km:22.2, dp:1830, step:0.2,
    officiel:'23,5 km · 1 950 m D+', // règlement v3 (le site annonce 23,05 km / 1 958 m) ; le profil vient du GPX lissé (22,2 km / 1 830 m)
    prof:[357,376,410,447,466,521,553,601,618,658,704,712,693,670,667,675,682,689,732,793,866,934,1004,1100,1217,1292,1361,1446,1515,1592,1625,1533,1421,1330,1251,1205,1188,1121,1109,1074,1071,1058,1055,1050,1038,1014,989,959,938,912,900,861,821,805,779,754,761,767,764,754,764,762,789,805,832,858,886,918,938,968,1011,1059,1082,1092,1055,1027,1022,998,972,959,941,911,879,884,900,900,872,843,832,822,783,736,694,638,579,526,483,450,432,390,375,357,318,307,296,281,284,285,291,312,341,353],
    marks:[
      { km:6.0, n:'San Parteu', alt:1688, t:'10h30', bar:'barrière 12h30', top:true },
      { km:10.3, n:'Ravito 1', s:'Bocca di Scuperta', t:'11h10', rav:true },
      { km:14.6, n:'Col', t:'11h45', top:true, small:true },
      { km:15.8, n:'Ravito 2', s:'Croce d\'Olu', t:'11h50', bar:'barrière 14h45', rav:true }
    ],
    // ce que je bois sur le profil (100 % liquide depuis le 23/11)
    food:[ { km:6.0, l:'160' }, { km:10.3, l:'320 CAF' }, { km:15.8, l:'eau' } ],
    // cardio visé, affiché en bande sous le profil (lvl 0 = libre, 1 = modéré, 2 = fort, 3 = à fond)
    fcz:[ { a:0, b:2, l:'160-165, marche active dans les passages raides', s:'165', lvl:1 }, { a:2, b:3.4, l:'155-165, ça se court', s:'cours', lvl:1 }, { a:3.4, b:6, l:'160-167, aux jambes (plafond 170)', s:'167', lvl:2 }, { a:6, b:10.3, l:'libre', lvl:0 }, { a:10.3, b:14.6, l:'165-170', lvl:2 }, { a:14.6, b:20.9, l:'libre', lvl:0 }, { a:20.9, b:22.2, l:'170+, tout ce qui reste', s:'max', lvl:3 } ],
    // tronçons : up = montée (flasque A, 320), sinon descente (flasque B, 160)
    segs:[
      { a:0, b:6.0, up:true, fc:'160-165 puis 160-167', n:'Montée au San Parteu', dv:'+1 290 m', t:'1h30', what:'Flasque A : toute la Maurten 320 (80 g), sans caféine', how:'Km 0-2 : ça monte déjà (+350 m, 17 % de moyenne, des passages à 20-28 %) : tu cours les replats et les pentes douces, tu marches fort aux bâtons dès que ça dépasse ~15 %, 160-165. Km 2-3,4 : replat puis petite descente, là tu cours. Le mur du km 3,4 → 6 (+930 m sur 2,6 km) : 160-167, plafond 170. Ce sont tes jambes qui fixent le rythme, pas le cardio : si les cuisses brûlent, tu lèves le pied même à 160. Une gorgée toutes les 8-10 min, la flasque doit être vide au sommet (testé le 21/11 : 80 g en 1h10, sans souci).', g:80 },
      { a:6.0, b:10.3, up:false, fc:'libre · jambes à 80 %', n:'Grande descente', dv:'−900 m', t:'40 min', what:'Flasque B : Maurten 160 par gorgées', how:'Rien à mâcher. Descente à 80 % : petits pas rapides, pas de sauts ni de grandes marches, tu ne doubles personne. Repère : un cran en dessous de la descente de la Zucca du 21/11 (les cuisses l\'ont sentie le lendemain). Attendu 38-42 min avec la fatigue de la montée. Si les cuisses brûlent, tu lèves le pied.', g:30 },
      { a:10.3, b:14.6, up:true, fc:'165-170', n:'Ravito 1 et remontée', dv:'+350 m', t:'35 min', what:'Sachet 320 CAF dans la A · sachet 160 dans la B · un gobelet d\'eau', how:'Debout, 1 min max : sachets ouverts dans la descente, tu remplis, tu bois un gobelet d\'eau sur place et tu repars en secouant. La caféine arrive pour la remontée et la descente finale, là où se joue le classement. La moitié de la A dans la remontée (40 g). Montée courte : 165-170 jusqu\'au col.', g:45 },
      { a:14.6, b:22.2, up:false, fc:'lâche les chevaux, puis tout', n:'Ravito 2 et descente finale', dv:'−815 m', t:'45 min', what:'Un gobelet d\'eau au ravito 2 et tu repars', how:'Ici plus rien derrière : tu descends comme tu sais, à fond. Le reste de la A (CAF) et de la B par gorgées dans les passages roulants. La petite remontée finale (+75 m) : tout ce qui reste, 170 et plus.', g:55 },
    ],
    fc:'Repère : U Periplu (1h45) à 165 de moyenne, montées à 168-172, max 175. Calvi (1h02) à 170. Ici 2 fois plus long et 2 fois plus de D+ : le cardio sert de plafond, ce sont les jambes qui décident. La grosse montée arrive jambes fraîches, la remontée ne fait que 350 m : c\'est là que tu peux appuyer. Moyenne attendue ~160-163.',
    // Pronostic (niveaux Betrail des inscrits, relevés le 18/11/2026). f = femme, b = forme récente plus basse que la cote
    prono:{
      maj:'18/11',
      liste:[
        ['Lambert Santelli',80.8],['Noël Giordano',76.8],['Quentin Pécheul',68.2],['Antony Ceccaldi',63.3],['Joseph Lovati',63.1],
        ['Ange Riu',62.5,'b'],['Sébastien Dumont',61.2],['Tiger-Lily Keyser',60.3,'f'],['Xavier Saint-Antonin',59.4],['Émile Bahaji',57.9],
        ['Sylvain Bonachera',55.5],['F.-Xavier Farrucci',55.3,'b'],['Morad Boustatin',55.1],['Fabien Duvalet',55.1,'b'],['Petru Byrde',54.6],
        ['Nathalie Quilghini',53.5,'f'],['Timao Glavieux',53.2],['J.-François Bernardini',52.6,'b'],['Tom Paillasson',52.5,'tom'],
        ['Andrea Forneris',51.9],['Sébastien Baudino',51.9],['Jean-Noël Santelli',50.5],['Dumenicu Frediani',49.8],['Nicolas Vertu',49.8],
        ['Clémence Imard',49.3,'f'],['Ariane Verzura',49.3,'ari']
      ],
      cards:[
        { k:'tom', nom:'Tom', theo:'19e', prono:'12e-15e', cat:'au scratch', temps:'3h30-3h40', obj:'Top 10 : il faut ta meilleure course (~57 de niveau, ≈ 3h20). Ton repère : Boustatin, 3 places devant toi au Periplu.' },
        { k:'ari', nom:'Ariane', theo:'25e', prono:'3e-4e', cat:'femme', temps:'3h50-4h05', obj:'Podium jouable : Quilghini favorite, Keyser inconnue, puis Ariane, Imard et Calabio dans un mouchoir.' }
      ]
    },
    avant:[
      ['Sam. soir','Dîner simple : pâtes ou riz, pas de crudités ni de lentilles. Zéro alcool. Sac prêt, flasques et sachets posés, tenue sortie. Au lit vers 22h.'],
      ['5h15','Lever.'],
      ['5h30','Petit-déj ~120 g, peu de fibres : pain blanc + miel ou confiture, compote. Pas de café : la caféine est gardée pour le ravito 1.'],
      ['6h15','Départ de Biguglia (compte ~1h15 de route, à vérifier sur le GPS).'],
      ['7h30','Arrivée au village : retrait du dossard (pièce d\'identité + licence ou PPS) et contrôle du matériel. Demande si la boisson compte dans le litre d\'eau obligatoire. Toilettes.'],
      ['8h00','Flasques : A = 320 (500 ml) en main, B = 160 (500 ml) en ceinture. Sachets 320 CAF + 160 dans la ceinture. Dossard devant, bien visible.'],
      ['8h30','½ Naak ou une banane (~15-20 g), le seul solide de la journée.'],
      ['8h35','Échauffement 15 min : 10 min de trot très facile + 3-4 accélérations en montée. Le 21/11, jambes lourdes et cardio haut pendant 30 min : on règle ça avant le départ.'],
      ['8h50','Dans le sas : 2e-3e rang, pour entrer dans le single autour de la 15e-20e place (ton niveau). Derrière les cadors, devant le gros du peloton. Veste dans le dos, bâtons prêts.']
    ],
    essentiel:[
      'Single dès le départ : les 200-300 premiers mètres un peu vite pour entrer dans le single vers la 15e-20e place, puis tu te poses. Km 0-2 (+350 m) : tu cours le doux, tu marches fort aux bâtons au-dessus de ~15 %, 160-165. Km 2-3,4 : replat, tu cours. Tu laisses partir ceux qui courent tout.',
      'Le mur (km 3,4 → 6, +930 m) : aux jambes, plafond 170. Il y a un prix pour le premier au sommet : ce n\'est pas ta course, ne te fais pas aspirer.',
      'Une gorgée toutes les 8-10 min : la flasque A (320) vide au sommet.',
      'Grande descente à 80 % : un cran sous la Zucca du 21/11. Tu ne doubles personne.',
      'Ravito 1 en 1 min : 320 CAF + 160, un gobelet d\'eau. Remontée à 165-170.',
      'Descente finale : là, tu lâches tout. C\'est là que se joue le top 10.'
    ],
    planb:[
      ['Dos qui lance dans le mur','Quelques pas mains sur les genoux, foulée plus courte, et les bâtons poussent vraiment. S\'il dépasse 5/10 et ne redescend pas dans la descente : tu finis en gestion, le classement n\'en vaut pas la peine.'],
      ['Ventre qui tourne','Plus rien de concentré pendant 15 min : eau du ravito et petites gorgées de 160. Pas de solide. Ça repart presque toujours.'],
      ['Crampes ou cuisses qui brûlent','Foulée plus courte, cadence haute, tu lèves le pied. Bois, et prends du salé au ravito s\'il y en a (bouillon, chips).'],
      ['Froid et vent au sommet','Veste fermée AVANT le sommet, dans le dernier hectomètre du mur, gants et bonnet si tu les as. Deux minutes perdues valent mieux qu\'une descente frigorifiée.'],
      ['Coup de mou dans la remontée','Ta Naak de réserve est faite pour ça : tu la manges. Le matériel obligatoire, c\'est d\'en avoir une au départ.'],
      ['Parcours modifié (météo)','L\'organisation peut neutraliser la partie haute. Le plan reste : 320 en montée, 160 en descente, eau aux ravitos.'],
      ['Chute ou blessure','Tu préviens un signaleur, un poste de secours ou le PC course (numéro sur le dossard). Abandon = toujours signalé, dossard rendu.']
    ],
    infos:[
      ['Distance officielle','23,5 km · 1 950 m D+ (règlement v3), sommet du Monte San Parteo à 1 688 m'],
      ['Barrières','Sommet 12h30 · ravito 2 (Croce d\'Olu) 14h45 · fermeture 16h30 : à ton rythme, environ 2h de marge'],
      ['Pointages','Départ, sommet, ravito 1 (Bocca di Scuperta, km 10,3), ravito 2 (km 15,8), arrivée'],
      ['Semi-autosuffisance','Pas d\'eau entre le départ et le km 10,3. Sans gobelet jetable : ton gobelet à chaque ravito'],
      ['Matériel contrôlé au départ','1 L d\'eau, veste à capuche imperméable ou déperlante, couverture de survie, sifflet, téléphone chargé avec le n° du PC course, gobelet, réserve alimentaire'],
      ['Recommandé','Bonnet, gants, veste chaude, bâtons (autorisés)'],
      ['Défi de la montée','Classement à part du segment d\'ascension, prix au premier homme et à la première femme au sommet'],
      ['Après','Repas coureur inclus (dès 12h30), récompenses à 15h30 (3 premiers scratch H/F). Nuit vers 17h'],
      ['Contact','felicetutrail@gmail.com · n° du PC course sur le dossard, à enregistrer dans le téléphone']
    ],
    sac:['Flasque A en main : Maurten 320 (80 g)','Flasque B en ceinture : Maurten 160 (40 g) — 1 L de liquide au total','Pour le ravito 1 : 1 sachet 320 CAF 100 + 1 sachet 160','1 Naak en réserve alimentaire obligatoire (on n\'y touche pas)',
      'Veste à capuche, couverture, sifflet, gobelet, tél. chargé avec le n° du PC course',
      'Bonnet et gants (recommandés, il fera 0-5 °C au sommet), dossard devant',
      'Bâtons, Merrell MTL Long Sky 2 (celles de la Zucca)'],
    testk:'Validé à l\'entraînement',
    test:'14/11 : double Zucca avec tout le matériel, bâtons et Maurten 320 (80 g en 50 min sans souci). 21/11 : Maurten 320 CAF bien passée, montée record (54\'35 à 156), descente rapide payée en courbatures le lendemain. Le 23/11 : passage au 100 % liquide (320 en montée, 160 en descente), la 160 est déjà connue.'
  }
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
