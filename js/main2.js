function hard() {
    document.getElementById('easy').style.display = 'none';
    document.getElementById('medium').style.display = 'none';
    document.getElementById('hard').style.display = 'block';
    dogadjaj_2(event);
}
//Brojac, prvi i drugi pokusaj:
let moves2 = 0;
let prvi2 = '';
let drugi2 = '';

//Da se kartica moze samo jednom kliknuti:
let prethodniKlik2 = null;

//Timer:
let sati2 = 0;
let minuti2 = 0;
let sekunde2 = 0;
let interval2;
let vreme2 = document.getElementById('sat2');

//MODAL:
let modal2 =  document.getElementById("popup3");
//ikonica x koja zatvara modal
let ikonica2 = document.getElementById("ikonica2");

//Niz kartica koje se prikazuju
const karticeNiz2 = [
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
];

// nizovi kada se otvaraju i upare kartice   
let otvoreneKartice2 = [];
let upareneKartice2 = [];

const game2 = document.getElementById('game2');

//pravljenje elementa section sa klasom polje
const polje2 = document.createElement('section');
polje2.setAttribute('class', 'polje');

game2.appendChild(polje2);

//dupliranje niza kartica:
let duplo2 = karticeNiz2.concat(karticeNiz2);

//Mesanje kartica sa svakim novim load
duplo2.sort(() => 0.5 - Math.random());

//za svaku karticu u nizu:
duplo2.forEach(item => {
    //Pravimo div u koji smestamo kartice , sa klasama kartica, front i back (prednja i zadnja strana kartice)

    //kartice kojima dajemo ime i slike iz karticeNiz
    const kartica2 = document.createElement('div');
    kartica2.classList.add('kartica2');
    kartica2.dataset.name = item.name;
    kartica2.style.backgroundImage = `url(${item.img})`;

    //front je prednja strana kartice
    const front2 = document.createElement('div');
    front2.classList.add('front2');

    //back je zadnja strana kartice(sa slikama)
    const back2 = document.createElement('div');
    back2.classList.add('back2');

    polje2.appendChild(kartica2);
    kartica2.appendChild(front2);
    kartica2.appendChild(back2);
});
    
function timer2() {
    interval2 = setInterval(function () {
        vreme2.innerHTML = `Timer: ${sati2}h : ${minuti2}min : ${sekunde2}sek`;
        sekunde2++;
        if (sekunde2 == 60) {
            minuti2++;
            sekunde2 = 0;
        }
        if (minuti2 == 60) {
            sati2++;
            minuti2 = 0;
        }
    }, 1000);
}
//reset tajmera:
vreme2.innerHTML = "Timer: 0h : 0min : 0sek";
vreme2.style.paddingTop = "10px";
vreme2.style.color = "pink";
clearInterval(interval2);

function restart2(){
    location.reload();
};

//Match funkcija kojom izabranoj kartici dodajemo klasu match
const match2 = () => {
    let izabrano2 = document.querySelectorAll('.selected')
    izabrano2.forEach(kartica2 => {
        kartica2.classList.add('match');
    });
};

//reset pokusaja (moves):
moves2 = 0;
let izabrano2 = document.querySelectorAll('.selected');
izabrano2.innerHTML = moves2;

//resetovanje pokusaja da bi imali vise pokusaja:
const resetPokusaja2 = () => {
    prvi2 = '';
    drugi2 = '';
    moves2 = 0;

    let izabrano2 = document.querySelectorAll('.selected');
    izabrano2.forEach(kartica2 => {
        kartica2.classList.remove('selected');
    });
};

//Otvaranje kartica i stavljanje u niz, pa aktiviranje tajmera klikom na prvu:
function otvaranje2() {
    otvoreneKartice2.push(izabrano2);
    let len2 = otvoreneKartice2.length;
    if (len2 === 1) {
        timer2();
    };
    if (upareneKartice2.length == 12) {
        clearInterval(interval2);
        setTimeout(cestitamo2, 1500);
    };
};

//Brojac pokusaja(moves) igraca:
klik2 = 0;
let brojPokusaja2 = document.getElementById('br_pokusaja2');
brojPokusaja2.innerHTML = "Moves: 0";
brojPokusaja2.style.paddingTop = '10px';
brojPokusaja2.style.color = "pink";

function brojac2() {
    klik2++;
    brojPokusaja2.innerHTML = `Moves: ${klik2}`;
};
   
function dogadjaj_2() {
    //Dodavanje dogadjaja polju
    polje2.addEventListener('click', function (event) {

        //event.target tamo gde kliknemo
        let klik2=event.target;
        //ne dozvoljavamo da se selektuje ceo deo section iza kartica, vec samo kartica moze, i to samo jednom
        if (klik2.nodeName === 'SECTION' || klik2 === prethodniKlik2 || klik2.parentNode.classList.contains('selected')) {
            return;
        };
        if (moves2 < 2) {
            moves2++;
            if (moves2 === 1) {
                //Definisanje prvog pokusaja
                prvi2 = klik2.parentNode.dataset.name;
                console.log(prvi2);
                klik2.parentNode.classList.add('selected');
            } else {
                //Definisanje drugog pokusaja
                drugi2 = klik2.parentNode.dataset.name;
                console.log(drugi2);
                klik2.parentNode.classList.add('selected');

                brojac2();
                console.log(brojPokusaja2)
            };
            //Ako oba pokusaja nisu prazni...
            if (prvi2 !== '' && drugi2 !== '') {
                //i prvi i drugi pokusaj su pogodjeni
                if (prvi2 === drugi2) {
                    //niz u koji ubacujemo uparene kartice
                    upareneKartice2.push(izabrano2);
                    console.log(upareneKartice2);

                    //pozivanje funkcije match1 sa odlaganjem
                    setTimeout(match2, 1200);
                    //pozivanje funkcije resetPokusaja1
                    setTimeout(resetPokusaja2, 1200);
                } else {
                    setTimeout(resetPokusaja2, 1200);
                };
            };
            //Set previous target to clicked (I'll assign the clicked value to prevousTarget after the first click.)
            // prethodniKlik2 = klik2;
        };
        otvaranje2();
    });
};
function cestitamo2(){
    //vreme zavrsetka partije
    finalTime2 = vreme2.innerHTML;
    //prikaz modala za cestitanje
    modal2.classList.add("show");
    modal2.style.display = 'block';

    //declare star rating variable
    //var starRating = document.querySelector(".stars").innerHTML;
    //prikaz konacnog broja pokusaja i konacnog vremena
    document.getElementById("finalMove3").innerHTML = klik2;
    //document.getElementById("starRating3").innerHTML = starRating;
    document.getElementById("totalTime3").innerHTML = finalTime2;
    //pozivanje funkcije za zatvaranje modala
    closeModal2();
};

// zatvaranje modula na x
function closeModal2(){
    ikonica2.addEventListener("click", function(e){
        restart2();
    });
};

// pokretanje igre ponovo na dugme playAgain
function playAgain2(){
    restart2();
}

