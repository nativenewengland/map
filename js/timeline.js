const yearSlider = document.getElementById('map-year');
const yearOutput = document.getElementById('selected-year');

function displayMapYear() {
    yearOutput.value = yearSlider.value;
}

yearSlider.addEventListener('input', displayMapYear);
window.addEventListener('pageshow', displayMapYear);
