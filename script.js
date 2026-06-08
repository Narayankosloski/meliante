const vinyl = document.querySelector('.vinyl');
const about = document.getElementById('text');

const pt = document.getElementById('about-pt');
const en = document.getElementById('about-en');

let currentLang = 'pt';
let canTranslate = false;
let lastState = false;

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

function toggleLanguage() {

    if (currentLang === 'pt') {

        pt.style.display = 'none';
        en.style.display = 'block';

        currentLang = 'en';

    } else {

        pt.style.display = 'block';
        en.style.display = 'none';

        currentLang = 'pt';
    }

    updateVinyl();
}

window.addEventListener('scroll', () => {

    const scroll = window.scrollY;

    vinyl.style.transform =
        `translateY(-50%) rotate(${scroll * 0.35}deg)`;

    const rect = about.getBoundingClientRect();
    const center = window.innerHeight / 2;

    const insideAbout =
        rect.top < center &&
        rect.bottom > center;

    if (insideAbout !== lastState) {

        lastState = insideAbout;
        canTranslate = insideAbout;

        vinyl.style.zIndex =
            insideAbout ? '10' : '1';

        vinyl.style.cursor =
            insideAbout ? 'pointer' : 'default';

        updateVinyl();
    }
});

vinyl.addEventListener('click', () => {

    if (!canTranslate) return;

    toggleLanguage();
});

updateVinyl();