const vinyl = document.querySelector('.vinyl');
const about = document.getElementById('text');

const btnLang = document.getElementById('langBtn');
const pt = document.getElementById('about-pt');
const en = document.getElementById('about-en');

let currentLang = 'pt';
let canTranslate = false;

window.addEventListener('scroll', () => {

    const scroll = window.scrollY;

    vinyl.style.transform =
    `translateY(-50%) rotate(${scroll * 0.35}deg)`;

const rect = about.getBoundingClientRect();

const center = window.innerHeight / 2;

const insideAbout =
    rect.top < center &&
    rect.bottom > center;

    if (insideAbout) {

        canTranslate = true;

        vinyl.style.zIndex = '100';
        vinyl.style.cursor = 'pointer';

    } else {

        canTranslate = false;

        vinyl.style.zIndex = '1';
        vinyl.style.cursor = 'default';
    }

});

vinyl.addEventListener('click', () => {

    if (!canTranslate) return;

    toggleLanguage();

});

function toggleLanguage(){

    if(currentLang === 'pt'){

        pt.style.display = 'none';
        en.style.display = 'block';

        if(btnLang){
            btnLang.textContent = 'PORTUGUÊS';
        }

        currentLang = 'en';

    } else {

        pt.style.display = 'block';
        en.style.display = 'none';

        if(btnLang){
            btnLang.textContent = 'ENGLISH';
        }

        currentLang = 'pt';
    }
}