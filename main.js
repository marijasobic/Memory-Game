//Promenljive za odredjene nivoe koji imaju odredjeni broj razlicitih kartica
const easy_razliciteKartice = 6;
const medium_razliciteKartice = 10;
const hard_razliciteKartice = 12;

//Promenljive vezane za divove gde se prikazuju elementi (polja sa karticama, dodatna polja, pravila igre)
const easyNivo = document.getElementById('easy');
const mediumNivo = document.getElementById('medium');
const hardNivo = document.getElementById('hard');
const pravilaIgre = document.getElementById('pravila');
const dodatnaPolja = document.getElementById('dodatak');

//prom. sa dugmica nivoa, da bi se provukle kroz petlju
let easy1 = document.getElementById('easy1');
let medium1 = document.getElementById('medium1');
let hard1 = document.getElementById('hard1');
//Dugmici za nivoe:
let dugmici = document.querySelectorAll('.dugmici button');

//Brojac, prvi i drugi pokusaj:
let moves = 0;
let prvi = '';
let drugi = '';

//Brojac poteza igraca:
klik = 0;
let brojPokusaja = document.getElementById('br_pokusaja');

//Da se kartica moze samo jednom kliknuti:
let prethodniKlik = null;

//Timer:
let minuti = 0;
let sekunde = 0;
let interval;
let vreme = document.getElementById('sat');

//MODAL:
let modal =  document.getElementById("popup1");
//ikonica x koja zatvara modal
let ikonica = document.querySelectorAll(".close");

//ZVEZDICE za rating:
let rating = document.getElementById('zvezdice');
const stars = document.querySelectorAll(".fa-star"); //za ikonice zvezdica
let starsList = document.querySelectorAll(".stars li");//za listu zvezica

// nizovi kada se otvaraju i upare kartice
let otvoreneKartice = [];
let upareneKartice = [];

//Niz kartica koje se prikazuju
const karticeNiz = [
    {
        name: 'sladoled',
        img: './img/sladoled.jpg',
    },
    {
        name: 'pas',
        img: './img/Jack.jpg',
    },
    {
        name: 'maca',
        img: './img/Cat.jpg',
    },
    {
        name: 'pahulja',
        img: './img/plava_pahulja.jpg',
    },
    {
        name: 'ukras',
        img: './img/ukras.jpg',
    },
    {
        name: 'koktel',
        img: './img/coctail.jpg'
    },
    {
        name: 'koktel1',
        img: './img/koktel.jpg',
    },
    {
        name: 'avion',
        img: './img/avion.jpg',
    },
    {
        name: 'brodic',
        img: './img/brodic.jpg',
    },
    {
        name:'mesecina',
        img: './img/mesecina.jpg'
    },
    {
        name: 'panda',
        img: './img/panda.jpg',
    },
    {
        name: 'naocare',
        img: './img/naocare.jpg',
    },
    // {
    //     name: 'masna',
    //     img: './img/masna.jpg',
    // }
]
//prazan niz u koji ce se ubaciti dupli niz
let duplo = [];

//DUPLIRANJE NIZA U ZAVISNOSTI OD NIVOA I PRIKAZ POLJA SA KARTICAMA
dugmici.forEach(dugme => {
    let game;

    if (dugme == easy1) {
        game = document.getElementById('game');
        let noviNiz = karticeNiz.slice(0, easy_razliciteKartice);
        console.log(noviNiz)
        //dupliranje niza kartica:
        duplo = noviNiz.concat(noviNiz);
        //  console.log(duplo)

        //Mesanje kartica sa svakim novim load-om
        duplo.sort(() => 0.5 - Math.random());
        
    } else if (dugme == medium1) {
        game = document.getElementById('game1');
        let noviNiz1 = karticeNiz.slice(0, medium_razliciteKartice);
        console.log(noviNiz1)
        duplo = noviNiz1.concat(noviNiz1);
        duplo.sort(() => 0.5 - Math.random());
        
    } else if (dugme == hard1) {
        game = document.getElementById('game2');
        duplo = karticeNiz.concat(karticeNiz);
        duplo.sort(() => 0.5 - Math.random());
        console.log(duplo);
        // hard();
    }
    console.log(duplo);
    console.log(dugme);
                
    //pravljenje elementa section sa klasom polje
    const polje = document.createElement('section');
    polje.setAttribute('class', 'polje');
    game.appendChild(polje);

    //za svaku karticu u nizu:
    duplo.forEach(item => {
        //Pravimo div u koji smestamo kartice , sa klasama kartica, front i back (prednja i zadnja strana kartice)

        //kartice kojima dajemo ime i slike iz karticeNiz
        const kartica = document.createElement('div');
        kartica.classList.add('kartica');
        kartica.dataset.name = item.name;
        kartica.style.backgroundImage = `url(${item.img})`;

        //front je prednja strana kartice
        const front = document.createElement('div');
        front.classList.add('front');

        //back je zadnja strana kartice(sa slikama)
        const back = document.createElement('div');
        back.classList.add('back');

        polje.appendChild(kartica);
        kartica.appendChild(front);
        kartica.appendChild(back);
    });
});

//reset tajmera:
vreme.innerHTML = "0 min : 0 sek";
vreme.style.paddingTop = "10px";
vreme.style.color = "pink";
clearInterval(interval);

//stil brojaca:
brojPokusaja.innerHTML = "Moves: 0";
brojPokusaja.style.paddingTop = '10px';
brojPokusaja.style.color = "pink";

//zvezdice za rating:
for (var i= 0; i < stars.length; i++){
    stars[i].style.visibility = "visible";
}

//Match funkcija kojom izabranoj kartici dodajemo klasu match
const match = () => {
    let izabrano = document.querySelectorAll('.selected');
    izabrano.forEach(kartica => {
         kartica.classList.add('match');
    });
}
//reset pokusaja (moves):
moves = 0;
let izabrano = document.querySelectorAll('.selected');
izabrano.innerHTML = moves;

//resetovanje pokusaja da bi imali vise pokusaja:
const resetPokusaja = () => {
    prvi = '';
    drugi = '';
    moves = 0;
    let izabrano = document.querySelectorAll('.selected');
    izabrano.forEach(kartica => {
        kartica.classList.remove('selected');
    });
};

//FUNKCIJE

//otvaranje nivoa easy na dugme Easy
function easy() {
    easyNivo.style.display = 'flex';
    dodatnaPolja.style.display = 'flex';
    pravilaIgre.style.display = 'none';
   //da se ne vide polja drugih nivoa:
    mediumNivo.style.display = 'none';
    hardNivo.style.display = 'none';
    //da se ne vide drugi dugmici:
    medium1.style.display = 'none';
    hard1.style.display = 'none';

    dogadjaj('easy');  
}
//otvaranje nivoa medium na dugme Medium
function medium() {
    mediumNivo.style.display = 'flex';
    dodatnaPolja.style.display = 'flex';
    pravilaIgre.style.display = 'none';
    easyNivo.style.display = 'none';
    hardNivo.style.display = 'none';
    easy1.style.display = 'none';
    hard1.style.display = 'none';
    
    dogadjaj('medium');
}
//otvaranje nivoa hard na dugme Hard
function hard() {
    hardNivo.style.display = 'flex';
    dodatnaPolja.style.display = 'flex';
    pravilaIgre.style.display = 'none';
    easyNivo.style.display = 'none';
    mediumNivo.style.display = 'none';
    easy1.style.display = 'none';
    medium1.style.display = 'none';

    dogadjaj('hard');   
}
function timer() {
    interval = setInterval(function () {
        vreme.innerHTML = `${minuti} min : ${sekunde} sek`;
        sekunde++;
        if (sekunde == 60) {
            minuti++;
            sekunde = 0;
        };
        //postavljanje skora sa zvezicama u odnosu na tajmer:
        if (sekunde > 30 && sekunde < 60) {
           for( i= 0; i < 3; i++){
               if(i > 1){
                 stars[i].style.visibility = "collapse"; //smanjuje za jednu zvezicu
               }
           }
        } else if (minuti == 1){
            for( i= 0; i < 3; i++){
               if(i > 0){
                 stars[i].style.visibility = "collapse";//smanjuje za jos jednu zvezdicu
               }
            } 
        } 
    }, 1000);
};
//Otvaranje kartica i stavljanje u niz:
function otvaranje(nivo) {
    otvoreneKartice.push(izabrano);
    //aktiviranje tajmera klikom na prvu karticu:
    let duzina = otvoreneKartice.length;
    if (duzina === 1) {
        timer();
    };
    //broj razlicitih kartica u zavisnosti od nivoa:
    let brojRazlicitihKartica;
    if (nivo === 'easy') {
        brojRazlicitihKartica = easy_razliciteKartice;

    } else if (nivo === 'medium') {
        brojRazlicitihKartica = medium_razliciteKartice;
        
    } else {
        brojRazlicitihKartica = hard_razliciteKartice;
    }
    //kad se upare sve kartice pozivanje modala:
    if (upareneKartice.length == brojRazlicitihKartica) {
        clearInterval(interval);
         setTimeout(() => cestitamo(nivo), 1500);
    };
}
function brojac() {
    klik++;
    brojPokusaja.innerHTML =`Moves: ${klik}`;
}
//Funkcija koja polju daje event click:
function dogadjaj(nivo) {
    const polje = document.querySelector(`#${nivo} .polje`);
    //Dodavanje dogadjaja polju
    polje.addEventListener('click', function (event) {
        //event.target tamo gde kliknemo:
        let klik = event.target;
        //ne dozvoljavamo da se selektuje ceo deo section iza kartica, vec samo kartica moze, i to samo jednom
        if (klik.nodeName === 'SECTION' ||  klik.parentNode.classList.contains('selected')) {
            return;
        };
        if (moves < 2) {
            moves++;
            if (moves === 1) {
                //Definisanje prvog pokusaja
                prvi = klik.parentNode.dataset.name;
                console.log(prvi);
                klik.parentNode.classList.add('selected');
            } else {
               //Definisanje drugog pokusaja
                 drugi = klik.parentNode.dataset.name;
                 console.log(drugi);
                 klik.parentNode.classList.add('selected');

                brojac();
                console.log(brojPokusaja);
            };
            //Ako oba pokusaja nisu prazni...
            if (prvi !== '' && drugi !== '') {
                 //i prvi i drugi pokusaj su pogodjeni
                if (prvi === drugi) {
                    //niz u koji ubacujemo uparene kartice
                    upareneKartice.push(izabrano);
                    console.log(upareneKartice);

                    //pozivanje funkcije match sa odlaganjem
                    setTimeout(match, 1200);
                    //pozivanje funkcije resetPokusaja
                    setTimeout(resetPokusaja, 1200);
                } else {
                    setTimeout(resetPokusaja, 1200);
                };
            };
            //Set previous target to clicked (I'll assign the clicked value to prevousTarget after the first click.)
            prethodniKlik = klik;
        };
        otvaranje(nivo);
    });
};

//MODAl:
function cestitamo(nivo){ //cestitka kad sve kartice upare

    //vreme zavrsetka partije
    finalTime = vreme.innerHTML;
    //prikaz modala za cestitanje
    modal.style.display = 'block';

    //deklarisanje skora zvezdica tj starRating
    let starRating = document.querySelector(".stars").innerHTML;

    //prikaz konacnog broja poteza, skora sa zvezdicama i konacnog vremena
    document.getElementById("finalMove").innerHTML = klik;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    //pozivanje funkcije za zatvaranje modala
    closeModal();

    //da se ne vidi polje iza modala:
    const polje = document.querySelector(`#${nivo} .polje`);
    polje.style.display = "none";
};
// zatvaranje modala na x
function closeModal(){
    ikonica[1].addEventListener("click", function(e){
        modal.style.display = 'none';
    });
};
// pokretanje igre ponovo na dugme playAgain u modalu
function playAgain(){
    restart();
}

//otvaranje diva za pravila igre na dugme Rules:
function pravila() {
    pravilaIgre.style.display = 'flex';
    dodatnaPolja.style.display = 'none';
    easyNivo.style.display = 'none';
    mediumNivo.style.display = 'none';
    hardNivo.style.display = 'none';
}
//zatvaranje diva pravila igre
function closePravila(){
    ikonica[0].addEventListener("click", function(e){
        document.getElementById('pravila').style.display = 'none';
    });
};
closePravila();

//restartovanje igrice na dugme Restart
function restart(){
    location.reload();
}