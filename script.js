const vinyl = document.querySelector('.vinyl');
const about = document.getElementById('text');

const btnLang = document.getElementById('langBtn');
const pt = document.getElementById('about-pt');
const en = document.getElementById('about-en');

let currentLang = 'pt';
let canTranslate = false;
const track = document.querySelector('.fader-track');
const knob = document.querySelector('.fader-knob');

let isDragging = false;

function updateKnobFromScroll() {

    if (isDragging) return;

    const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

    const maxMove =
        track.offsetHeight - knob.offsetHeight;

    const progress =
        maxScroll > 0 ? window.scrollY / maxScroll : 0;

    knob.style.top = `${progress * maxMove}px`;
}

window.addEventListener('scroll', updateKnobFromScroll);

knob.addEventListener('mousedown', (e) => {

    isDragging = true;

    e.preventDefault();
});




window.addEventListener('keydown', (e) => {

    if (e.key === 'ArrowDown') {
        window.scrollBy({
            top: 100,
            behavior: 'smooth'
        });
        updateFader();
    }

    if (e.key === 'ArrowUp') {
        window.scrollBy({
            top: -100,
            behavior: 'smooth'
        });
        updateFader();
    }

});






document.addEventListener('mousemove', (e) => {

    if (!isDragging) return;

    const rect = track.getBoundingClientRect();

    let y =
        e.clientY -
        rect.top -
        (knob.offsetHeight / 2);

    const maxMove =
        track.offsetHeight - knob.offsetHeight;

    y = Math.max(0, Math.min(y, maxMove));

    // move o knob
    knob.style.top = `${y}px`;

    // calcula porcentagem
    const progress = y / maxMove;

    // converte para scroll da página
    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

    window.scrollTo({
        top: progress * maxScroll,
        behavior: 'auto'
    });
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

updateKnobFromScroll();



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
        `translateY(-50%) rotate(${-scroll * 0.35}deg)`;

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


const visualizer = document.querySelector('.visualizer');

for(let i = 0; i < 126; i++){

    const bar = document.createElement('div');

    bar.className = 'bar';

    visualizer.appendChild(bar);
}

const bars = document.querySelectorAll('.bar');
const audios = document.querySelectorAll('audio');
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let analyser = null;

audios.forEach(audio => {

    let connected = false;

    audio.addEventListener('play', async () => {

    console.log('TOCOU');

    visualizer.classList.add('active');

    await audioContext.resume();

    if (!connected) {

        const source =
            audioContext.createMediaElementSource(audio);

        analyser =
            audioContext.createAnalyser();

        analyser.fftSize = 256;

        source.connect(analyser);
        analyser.connect(audioContext.destination);

        connected = true;
    }
});

audio.addEventListener('pause', () => {
    visualizer.classList.remove('active');
});

audio.addEventListener('ended', () => {
    visualizer.classList.remove('active');
});

});
function animateBars() {

    requestAnimationFrame(animateBars);

    if (!analyser) return;

    const data =
        new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteFrequencyData(data);

    bars.forEach((bar, i) => {

        const value = data[i] || 0;

        const height = 5 + value * 1.8;

bar.style.height = `${height}px`;

bar.style.opacity = 0.3 + (value / 255);

bar.style.filter =
`drop-shadow(0 0 ${value/10}px #ff0088)`;

    });

}

animateBars();


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