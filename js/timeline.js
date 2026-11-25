const daySlider = document.getElementById('map-day');
const dateField = document.getElementById('map-date');
const dayMs = 86400000;
const firstDay = Date.parse(dateField.min);
const dateFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
});

daySlider.max = (Date.parse(dateField.max) - firstDay) / dayMs;
daySlider.value = (Date.parse(dateField.defaultValue) - firstDay) / dayMs;

function displayDate() {
    dateField.valueAsNumber = firstDay + daySlider.valueAsNumber * dayMs;
    daySlider.setAttribute('aria-valuetext', dateFormat.format(dateField.valueAsNumber));
}

daySlider.addEventListener('input', displayDate);
dateField.addEventListener('focus', pauseTimeline);
dateField.addEventListener('input', () => {
    if (dateField.value && dateField.validity.valid) {
        daySlider.value = (dateField.valueAsNumber - firstDay) / dayMs;
        displayDate();
    }
});
dateField.addEventListener('blur', displayDate);
window.addEventListener('pageshow', displayDate);

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

function advanceDay() {
    daySlider.stepUp();
    daySlider.dispatchEvent(new Event('input', { bubbles: true }));
    if (daySlider.value === daySlider.max) pauseTimeline();
}

playButton.addEventListener('click', () => {
    if (playTimer !== undefined) {
        pauseTimeline();
        return;
    }
    if (daySlider.value === daySlider.max) {
        daySlider.value = daySlider.min;
        daySlider.dispatchEvent(new Event('input', { bubbles: true }));
    }
    playButton.textContent = 'Ⅱ';
    playButton.title = 'Pause timeline';
    playButton.setAttribute('aria-label', playButton.title);
    playTimer = setInterval(advanceDay, 500);
});

daySlider.addEventListener('pointerdown', pauseTimeline);
daySlider.addEventListener('keydown', pauseTimeline);
window.addEventListener('pagehide', pauseTimeline);
