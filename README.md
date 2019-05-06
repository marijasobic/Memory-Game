# Memory-Game
Završni projekat obuke Front-End web programiranje, Comtrade

# Opis
Igrica pamćenja, gde se u zavisnosti od izabranog nivoa težine otvaraju kartice i uparuju iste sličice. Igrica je završena kada se sve kartice upare, a cilj je da se to uradi za što kraće vreme i sa što manje poteza.

Igrica se pokrece klikom na dugme željenog nivoa (easy, medium, hard) a nivoi se razlikuju po broju kartica koje se pojavljuju na polju za igru. Otvaraju se po dve kartice koje otkrivaju sličice i ukoliko su sličice iste one će nestati sa polja, a ukoliko se razlikuju kartice će se ponovo zatvoriti. Mesta sličica se ne menjaju u jednoj partiji. Kada se sve kartice poklope otvara se modal za čestitanje sa podacima o vremenu, broju poteza i broju osvojenih zvezdica.

# Struktura
Igra se sastoji od jedne HTML stranice.
Prvi div Pocetak je vidljiv i tu se nalazi naslov Memory Game i dugmici za izbor nivoa, kao i dugmad Rules(koji prikazuje div sa opisom pravila igre) i Restart (koji relouduje stranicu). 
Kada se klikne na dugmice nivoa (easy, medium, hard) u drugom divu "dodatak" se prikazuju tajmer, brojac pokusaja (Moves) i rating sa tri zvezdice, a u odredjenim praznim divovima, f-jom dogadjaj(nivo), se smestaju polja sa razlicitim brojem kartica u zavisnosti koji nivo smo izabrali (easy=6;medium=10;hard=12).
Kartice sa slicicama (front) o po

-naslov preko animacije (ubacena pozadinska slika preko slova sa -webkit-background-clip: text;
    animation: animate 15s linear infinite;
