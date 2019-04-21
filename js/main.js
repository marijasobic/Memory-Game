function easy() {
    document.getElementById('medium').style.display = 'none';
    document.getElementById('hard').style.display = 'none';
    document.getElementById('easy').style.display = 'block';
    
    dogadjaj(event);
}

//Brojac, prvi i drugi pokusaj:
let moves = 0;
let prvi = '';
let drugi = '';

//Da se kartica moze samo jednom kliknuti:
let prethodniKlik = null;

//Timer:
let sati = 0;
let minuti = 0;
let sekunde = 0;
let interval;
let vreme = document.getElementById('sat');

//MODAL:
let modal =  document.getElementById("popup1");

//ikonica x koja zatvara modal
let ikonica = document.querySelector(".close");



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
    }
];

// nizovi kada se otvaraju i upare kartice 
let otvoreneKartice = [];
let upareneKartice = [];

const game = document.getElementById('game');

//pravljenje elementa section sa klasom polje
const polje = document.createElement('section');
polje.setAttribute('class', 'polje');

game.appendChild(polje);

//dupliranje niza kartica:
let duplo = karticeNiz.concat(karticeNiz);

//Mesanje kartica sa svakim novim load
duplo.sort(() => 0.5 - Math.random());

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
    
    
function timer() {
    interval = setInterval(function () {
        vreme.innerHTML = `Timer: ${sati}h : ${minuti}min : ${sekunde}sek`;
        sekunde++;
        if (sekunde == 60) {
            minuti++;
            sekunde = 0;
        };
        if (minuti == 60) {
            sati++;
            minuti = 0;
        };
    }, 1000);
};

//reset tajmera:
vreme.innerHTML = "Timer: 0h : 0min : 0sek";
vreme.style.paddingTop = "10px";
vreme.style.color = "pink";
clearInterval(interval);
   
function restart(){
    location.reload();
}

//Match funkcija kojom izabranoj kartici dodajemo klasu match
const match = () => {
    let izabrano = document.querySelectorAll('.selected')
    izabrano.forEach(kartica => {
         kartica.classList.add('match');
    });
};

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

//Otvaranje kartica i stavljanje u niz, pa aktiviranje tajmera klikom na prvu:
function otvaranje() {
    otvoreneKartice.push(izabrano);
    let len = otvoreneKartice.length;
    if (len === 1) {
            timer();
    };
    if (upareneKartice.length == 6) {
        clearInterval(interval);
        setTimeout(cestitamo, 1500);
    };
};

//Brojac pokusaja(moves) igraca:
klik = 0;
let brojPokusaja = document.getElementById('br_pokusaja');
brojPokusaja.style.paddingTop = '10px';
brojPokusaja.style.color = "pink";
brojPokusaja.innerHTML = "Moves: 0";

function brojac() {
    klik++;
    brojPokusaja.innerHTML =`Moves: ${klik}`;
}

function dogadjaj() {
    //Dodavanje dogadjaja polju
    polje.addEventListener('click', function (event) {
        
        //event.target tamo gde kliknemo
        let klik = event.target;
        //ne dozvoljavamo da se selektuje ceo deo section iza kartica, vec samo kartica moze, i to samo jednom
        if (klik.nodeName === 'SECTION' || klik === prethodniKlik || klik.parentNode.classList.contains('selected')) {
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
            //prethodniKlik = klik;
        };
        otvaranje();
    });
};

//MODAl:
//cestitka kad sve kartice upare
function cestitamo(){
    //vreme zavrsetka partije
    finalTime = vreme.innerHTML;
    //prikaz modala za cestitanje
    modal.classList.add("show");
    modal.style.display = 'block';

    //declare star rating variable
    //var starRating = document.querySelector(".stars").innerHTML;
    //prikaz konacnog broja pokusaja i konacnog vremena
    document.getElementById("finalMove").innerHTML = klik;
    //document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    //pozivanje funkcije za zatvaranje modala
    closeModal();
};

// zatvaranje modula na x
function closeModal(){
    ikonica.addEventListener("click", function(e){
        restart();
    });
};

// pokretanje igre ponovo na dugme playAgain
function playAgain(){
    restart();
}

    

    



