const vinyl = document.querySelector('.vinyl');
const about = document.getElementById('text');

const pt = document.getElementById('about-pt');
const en = document.getElementById('about-en');

let currentLang = 'pt';
let canTranslate = false;

function updateVinyl(){

    if(!canTranslate){

        vinyl.style.backgroundImage =
        "url('./disco.png')";

    }else if(currentLang === 'pt'){

        vinyl.style.backgroundImage =
        "url('./disco_rosa_pt.png')";

    }else{

        vinyl.style.backgroundImage =
        "url('./disco_rosa_en.png')";
    }
}

function toggleLanguage(){

    if(currentLang === 'pt'){

        pt.style.display = 'none';
        en.style.display = 'block';

        currentLang = 'en';

    }else{

        pt.style.display = 'block';
        en.style.display = 'none';

        currentLang = 'pt';
    }

    updateVinyl();
}

function updateScrollState(){

    const scroll = window.scrollY;

    vinyl.style.transform =
    `translateY(-50%) rotate(${scroll * 0.35}deg)`;

    const rect = about.getBoundingClientRect();

    const insideAbout =
        rect.top < window.innerHeight / 2 &&
        rect.bottom > window.innerHeight / 2;

    canTranslate = insideAbout;

    vinyl.style.cursor =
        insideAbout ? 'pointer' : 'default';

    vinyl.style.zIndex =
        insideAbout ? '10' : '1';

    updateVinyl();
}

window.addEventListener('scroll', updateScrollState);

vinyl.addEventListener('click', toggleLanguage);

pt.style.display = 'block';
en.style.display = 'none';

updateScrollState();