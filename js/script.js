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
        "url('./disco_rosa_en.png')";

    }else{

        vinyl.style.backgroundImage =
        "url('./disco_rosa_pt.png')";
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

    if(!about) return;

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

    updateVinyl();
}

window.addEventListener('scroll', updateScrollState);

vinyl.addEventListener('click', toggleLanguage);

if(pt && en){

    pt.style.display = 'block';
    en.style.display = 'none';

    updateScrollState();

    window.addEventListener(
        'scroll',
        updateScrollState
    );

    vinyl.addEventListener(
        'click',
        toggleLanguage
    );
}

window.addEventListener('scroll', () => {

    const scroll = window.scrollY;

    vinyl.style.transform =
    `translateY(-50%) rotate(${scroll * 0.35}deg)`;

});



document.querySelectorAll('.highlight-card').forEach(card => {

    const img = card.querySelector('.cover');
    const audio = card.querySelector('audio');

    img.addEventListener('click', () => {

        if(audio.paused){
            audio.play();
        }else{
            audio.pause();
        }

    });

});




const galleriaSection = document.getElementById('galleria');

function updateVinylSide(){

    if(!galleriaSection) return;

    const rect = galleriaSection.getBoundingClientRect();

    const middleScreen = window.innerHeight / 2;

    const galleriaVisible =
        rect.top < middleScreen &&
        rect.bottom > middleScreen;

    if(galleriaVisible){

        vinyl.classList.add('right');

    }else{

        vinyl.classList.remove('right');
    }
}

window.addEventListener('scroll', updateVinylSide);

updateVinylSide();


const galleryItems = document.querySelectorAll('.gallery-item');

function updateGalleryPhysics() {

    const vinylRect = vinyl.getBoundingClientRect();
    const vinylCenterX = vinylRect.left + vinylRect.width / 2;
    const vinylCenterY = vinylRect.top + vinylRect.height / 2;

    galleryItems.forEach(item => {

        const rect = item.getBoundingClientRect();

        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;

        const dx = itemCenterX - vinylCenterX;
        const dy = itemCenterY - vinylCenterY;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const influenceRange = 19900;

        let pushX = 0;
        let pushY = 0;

        if (distance < influenceRange) {

            const force = 1 - (distance / influenceRange);

            // direção do empurrão (para longe do vinil)
            const angle = Math.atan2(dy, dx);

            const strength = force * 120;

            pushX = Math.cos(angle) * strength;
            pushY = Math.sin(angle) * strength;
        }

        item.style.transform = `translate(${pushX}px, ${pushY}px)`;
    });
}

window.addEventListener('scroll', updateGalleryPhysics);
window.addEventListener('resize', updateGalleryPhysics);

updateGalleryPhysics();