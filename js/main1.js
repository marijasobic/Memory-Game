function medium() {
    document.getElementById('easy').style.display = 'none';
    document.getElementById('hard').style.display = 'none';
    document.getElementById('medium').style.display = 'block';
 
    dogadjaj_1(event);
}
//Brojac, prvi i drugi pokusaj:
let moves1 = 0;
let prvi1 = '';
let drugi1 = '';

//Da se kartica moze samo jednom kliknuti:
let prethodniKlik1 = null;

//Timer:
let sati1 = 0;
let minuti1 = 0;
let sekunde1 = 0;
let interval1;
let vreme1 = document.getElementById('sat1');

//MODAL:
let modal1 =  document.getElementById("popup2");
//ikonica x koja zatvara modal
let ikonica1 = document.getElementById("ikonica");

//Niz kartica koje se prikazuju
const karticeNiz1 = [
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
    }
];

// nizovi kada se otvaraju i upare kartice   
let otvoreneKartice1 = [];
let upareneKartice1 = [];

const game1 = document.getElementById('game1');

//pravljenje elementa section sa klasom polje
const polje1 = document.createElement('section');
polje1.setAttribute('class', 'polje');

game1.appendChild(polje1);

//dupliranje niza kartica:
let duplo1 = karticeNiz1.concat(karticeNiz1);

//Mesanje kartica sa svakim novim load
duplo1.sort(() => 0.5 - Math.random());

//za svaku karticu u nizu:
duplo1.forEach(item => {
    //Pravimo div u koji smestamo kartice , sa klasama kartica, front i back (prednja i zadnja strana kartice)

    //kartice kojima dajemo ime i slike iz karticeNiz
    const kartica1 = document.createElement('div');
    kartica1.classList.add('kartica1');
    kartica1.dataset.name = item.name;
    kartica1.style.backgroundImage = `url(${item.img})`;

    //front je prednja strana kartice
    const front1 = document.createElement('div');
    front1.classList.add('front1');

    //back je zadnja strana kartice(sa slikama)
    const back1 = document.createElement('div');
    back1.classList.add('back1');

    polje1.appendChild(kartica1);
    kartica1.appendChild(front1);
    kartica1.appendChild(back1);
});
    
function timer1() {
    interval1 = setInterval(function () {
        vreme1.innerHTML = `vreme: ${sati1}h : ${minuti1}min : ${sekunde1}sek`;
        sekunde1++;
        if (sekunde1 == 60) {
            minuti1++;
            sekunde1 = 0;
        }
        if (minuti1 == 60) {
            sati1++;
            minuti1 = 0;
        }
    }, 1000);
}
//reset tajmera:
vreme1.innerHTML = "vreme: 0h : 0min : 0sek";
vreme1.style.paddingTop = "10px";
vreme1.style.color = "pink";
clearInterval(interval1);

function restart1(){
    location.reload();
};

//Match funkcija kojom izabranoj kartici dodajemo klasu match
const match1 = () => {
    let izabrano1 = document.querySelectorAll('.selected')
    izabrano1.forEach(kartica1 => {
        kartica1.classList.add('match');
    });
};

//reset pokusaja (moves):
moves1 = 0;
let izabrano1 = document.querySelectorAll('.selected');
izabrano1.innerHTML = moves1;

//resetovanje pokusaja da bi imali vise pokusaja:
const resetPokusaja1 = () => {
    prvi1 = '';
    drugi1 = '';
    moves1 = 0;

    let izabrano1 = document.querySelectorAll('.selected');
    izabrano1.forEach(kartica1 => {
        kartica1.classList.remove('selected');
    });
};

//Otvaranje kartica i stavljanje u niz, pa aktiviranje tajmera klikom na prvu:
function otvaranje1() {
    otvoreneKartice1.push(izabrano1);
    let len1 = otvoreneKartice1.length;
    if (len1 === 1) {
        timer1();
    };
    if (upareneKartice1.length == 10) {
        clearInterval(interval1);
        setTimeout(cestitamo1, 1500);
    };
};

//Brojac pokusaja(moves) igraca:
klik1 = 0;
let brojPokusaja1 = document.getElementById('br_pokusaja1');
brojPokusaja1.innerHTML = "Moves: 0";
brojPokusaja1.style.paddingTop = '10px';
brojPokusaja1.style.color = "pink";

function brojac1() {
    klik1++;
    brojPokusaja1.innerHTML = `Moves: ${klik1}`;
};
   
function dogadjaj_1() {
    //Dodavanje dogadjaja polju
    polje1.addEventListener('click', function (event) {

        //event.target tamo gde kliknemo
        let klik1=event.target;
        //ne dozvoljavamo da se selektuje ceo deo section iza kartica, vec samo kartica moze, i to samo jednom
        if (klik1.nodeName === 'SECTION' || klik1 === prethodniKlik || klik1.parentNode.classList.contains('selected')) {
            return;
        };
        if (moves1 < 2) {
            moves1++;
            if (moves1 === 1) {
                //Definisanje prvog pokusaja
                prvi1 = klik1.parentNode.dataset.name;
                console.log(prvi1);
                klik1.parentNode.classList.add('selected');
            } else {
                //Definisanje drugog pokusaja
                drugi1 = klik1.parentNode.dataset.name;
                console.log(drugi1);
                klik1.parentNode.classList.add('selected');

                brojac1();
                console.log(brojPokusaja1)
            };
            //Ako oba pokusaja nisu prazni...
            if (prvi1 !== '' && drugi1 !== '') {
                //i prvi i drugi pokusaj su pogodjeni
                if (prvi1 === drugi1) {
                    //niz u koji ubacujemo uparene kartice
                    upareneKartice1.push(izabrano1);
                    console.log(upareneKartice1);

                    //pozivanje funkcije match1 sa odlaganjem
                    setTimeout(match1, 1200);
                    //pozivanje funkcije resetPokusaja1
                    setTimeout(resetPokusaja1, 1200);
                } else {
                    setTimeout(resetPokusaja1, 1200);
                };
            };
            //Set previous target to clicked (I'll assign the clicked value to prevousTarget after the first click.)
            // prethodniKlik1 = klik1;
        };
        otvaranje1();
    });
};
function cestitamo1(){
    //vreme zavrsetka partije
    finalTime1 = vreme1.innerHTML;
    //prikaz modala za cestitanje
    modal1.classList.add("show");
    modal1.style.display = 'block';

    //declare star rating variable
    //var starRating = document.querySelector(".stars").innerHTML;
    //prikaz konacnog broja pokusaja i konacnog vremena
    document.getElementById("finalMove2").innerHTML = klik1;
    //document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime2").innerHTML = finalTime1;
    //pozivanje funkcije za zatvaranje modala
    closeModal1();
};

// zatvaranje modula na x
function closeModal1(){
    ikonica1.addEventListener("click", function(e){
        restart1();
    });
};

// pokretanje igre ponovo na dugme playAgain
function playAgain1(){
    restart1();
}

