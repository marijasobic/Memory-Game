# Memory-Game
Završni projekat obuke Front-End web programiranje, Comtrade

# Kratki opis
Igrica pamćenja, gde se u zavisnosti od izabranog nivoa težine otvaraju kartice i uparuju iste sličice. Igrica je završena kada se sve kartice upare, a cilj je da se to uradi za što kraće vreme i sa što manje poteza.

# Struktura i opis
Igra se sastoji od jedne HTML stranice.

- Prvi div *Pocetak* je vidljiv i tu se nalazi naslov Memory Game i dugmici za izbor nivoa, kao i dugmad Rules(koji prikazuje div sa opisom pravila igre) i Restart (koji relouduje stranicu).

- Klikom na dugmice nivoa (easy, medium, hard) u drugom divu  *"dodatak"*  se prikazuju tajmer, brojac pokusaja (Moves) i rating sa tri zvezdice, a u odredjenim praznim divovima, f-jom  *dogadjaj(nivo)* , se smestaju polja sa razlicitim brojem kartica u zavisnosti koji nivo smo izabrali (easy=6;medium=10;hard=12).

- Kartice sa slicicama (*.kartica*) se otvaraju (transition: all 0.4s linear;
                                                 transform-style: preserve-3d; 
                                      (*.front*) transform: rotateY(180deg); )
    f-ja  *otvaranje(nivo)*  , sa prvim klikom se pokrece tajmer (otvorene kartice se smestaju u niz  *otvoreneKartice* ), kad se upare smestaju se u niz  *upareneKartice*  (cija se duzina uporedjuje sa brojem razlicitih kartica za odredjeni nivo).
- Kad se dve kartice upare dodaje se klasa *.match* (koja sklanja sliku) i kartice nestaju sa polja.

- Kad se sve kartice upare poziva se f-ja *cestitamo(nivo)* preko koje se otvara modal sa podacima vreme (finalTime), broj poteza (klik) i broj osvojenih zvezdica(starRating); 

-naslov preko animacije (ubacena pozadinska slika preko slova sa -webkit-background-clip: text;)
    (animation: animate 15s linear infinite;)

# Korišćene tehnologije

    Html
    CSS
    JavaScript
    Bootstrap
    Font Awesome
    
# Ostalo

- Slicice za kartice koriscene sa sajta https://www.peecheey.com/ (Free Vector Resoursces)
- Font slova koriscen sa https://fonts.google.com/
