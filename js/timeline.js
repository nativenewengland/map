const yearSlider = document.getElementById('map-year');
const yearOutput = document.getElementById('selected-year');

function displayMapYear() {
    yearOutput.value = yearSlider.value;
}

yearSlider.addEventListener('input', displayMapYear);
window.addEventListener('pageshow', displayMapYear);

const playButton = document.getElementById('timeline-play');
const coordinates = document.getElementById('mouse-coords');
const timeline = document.getElementById('map-timeline');
let playTimer;

new ResizeObserver(() => {
    timeline.style.setProperty('--timeline-left', coordinates.getBoundingClientRect().right + 10 + 'px');
}).observe(coordinates);

function pauseTimeline() {
    clearInterval(playTimer);
    playTimer = undefined;
    playButton.textContent = '▶';
    playButton.title = 'Play timeline';
    playButton.setAttribute('aria-label', playButton.title);
}

function advanceYear() {
    yearSlider.stepUp();
    yearSlider.dispatchEvent(new Event('input', { bubbles: true }));
    if (yearSlider.value === yearSlider.max) pauseTimeline();
}

playButton.addEventListener('click', () => {
    if (playTimer !== undefined) {
        pauseTimeline();
        return;
    }
    if (yearSlider.value === yearSlider.max) {
        yearSlider.value = yearSlider.min;
        yearSlider.dispatchEvent(new Event('input', { bubbles: true }));
    }
    playButton.textContent = 'Ⅱ';
    playButton.title = 'Pause timeline';
    playButton.setAttribute('aria-label', playButton.title);
    playTimer = setInterval(advanceYear, 500);
});

yearSlider.addEventListener('pointerdown', pauseTimeline);
yearSlider.addEventListener('keydown', pauseTimeline);
window.addEventListener('pagehide', pauseTimeline);
