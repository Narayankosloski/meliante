const vinyl = document.querySelector('.vinyl');
const about = document.getElementById('text');

const btnLang = document.getElementById('langBtn');
const pt = document.getElementById('about-pt');
const en = document.getElementById('about-en');

let currentLang = 'pt';
let canTranslate = false;

/* =========================
   TROCA A IMAGEM DO DISCO
========================= */

function updateVinyl() {

    if (!canTranslate) {

        vinyl.style.backgroundImage =
            "url('./disco.png')";

    } else if (currentLang === 'pt') {

        vinyl.style.backgroundImage =
            "url('./disco_rosa_pt.png')";

    } else {

        vinyl.style.backgroundImage =
            "url('./disco_rosa_en.png')";
    }
}

/* =========================
   SCROLL
========================= */

window.addEventListener('scroll', () => {

    const scroll = window.scrollY;

    vinyl.style.transform =
        `translateY(-50%) rotate(${scroll * 0.35}deg)`;

    const rect = about.getBoundingClientRect();
const center = window.innerHeight / 2;

const insideAbout =
    rect.top < center + 0 &&
    rect.bottom > center - 0;

    if (insideAbout) {

        canTranslate = true;

        vinyl.style.zIndex = '60';
        vinyl.style.cursor = 'pointer';

    } else {

        canTranslate = false;

        vinyl.style.zIndex = '1';
        vinyl.style.cursor = 'default';
    }

    updateVinyl();
});

/* =========================
   CLICK NO DISCO
========================= */

vinyl.addEventListener('click', () => {

    if (!canTranslate) return;

    toggleLanguage();
});

/* =========================
   TROCAR IDIOMA
========================= */

function toggleLanguage() {

    if (currentLang === 'pt') {

        pt.style.display = 'none';
        en.style.display = 'block';

        if (btnLang) {
            btnLang.textContent = 'PORTUGUÊS';
        }

        currentLang = 'en';

    } else {

        pt.style.display = 'block';
        en.style.display = 'none';

        if (btnLang) {
            btnLang.textContent = 'ENGLISH';
        }

        currentLang = 'pt';
    }

    updateVinyl();
}

/* =========================
   INIT
========================= */

updateVinyl();