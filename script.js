const vinyl = document.querySelector('.vinyl');

window.addEventListener('scroll', () => {

    const scroll = window.scrollY;

    vinyl.style.transform =
    `translateY(-50%) rotate(${scroll * 0.35}deg)`;

});


const knob = document.querySelector('.fader-knob');

window.addEventListener('scroll', () => {

    const scrollTop = window.scrollY;

    const docHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

    const percent = scrollTop / docHeight;

    const trackHeight = 278;

    knob.style.top =
    `${percent * trackHeight}px`;

});