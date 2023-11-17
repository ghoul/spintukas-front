# yoyo

1.	Sprendžiamo uždavinio aprašymas 
1.1.	Sistemos paskirtis 
Projekto tikslas – suteikti reikalingos informacijos žmonėms, norintiems išmokti yoyo triukų, nesvarbu kiek pažengę jie būtų. 
Veikimo principas – pačią kuriamą platformą sudaro dvi dalys: internetinė aplikacija, kuria naudosis yoyo mėgėjai ir administratorius bei aplikacijų programavimo sąsaja (angl. trump. API). 
Yoyo mėgėjas, norėdamas naudotis šia platforma, prisiregistruos prie internetinės aplikacijos ir galės matyti visus yoyo triukus, suskirstytus pagal kategorijas. Išmokus kurį nors triuką, jį bus galima pažymėti kaip atliktą bei palikti atsiliepimą. Administratorius gali pridėti naujus triukus prie kategorijų bei šalinti neetiškus komentarus.
1.2.	Funkciniai reikalavimai 
Neregistruotas sistemos naudotojas galės: 
1.	Peržiūrėti puslapius su triukais; 
2.	Peržiūrėti atsiliepimus;
3.	Prisijungti prie internetinės aplikacijos. 
Registruotas sistemos naudotojas galės: 
1. Atsijungti nuo internetinės aplikacijos; 
2. Prisijungti (užsiregistruoti) prie platformos; 
3.	Pažymėti triukus kaip atliktus;
4.	Palikti atsiliepimą.
Administratorius galės: 
1.	Patvirtinti naudotojo registraciją;
2.	Įkelti naują triuką;
3.	Šalinti naudotojus;
4.	Šalinti netinkamus atsiliepimus.

2.	Sistemos architektūra 
Sistemos sudedamosios dalys: 
•	Kliento pusė (ang. Front-End) – naudojant React.js; 
•	Serverio pusė (angl. Back-End) – naudojant PHP Laravel. Duomenų bazė – MySQL. 
2.1 pav. pavaizduota kuriamos sistemos diegimo diagrama. Sistemos talpinimui yra naudojamas Azure serveris. Kiekviena sistemos dalis yra diegiama tame pačiame serveryje. 
Internetinė aplikacija yra pasiekiama per HTTP protokolą. Internetinė svetainė vykdo duomenų mainus su duomenų baze per TCP/IP ryšį.
