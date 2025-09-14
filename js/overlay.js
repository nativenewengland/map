// Image overlay upload and controls
let overlayLayer = null;
let overlayScale = 1;
const overlayError = document.getElementById('overlay-error');
const overlaySizeSlider = document.getElementById('overlay-size');
const opacityInput = document.getElementById('overlay-opacity');
const uploadInput = document.getElementById('overlay-upload');

function resetOverlayControls() {
  if (overlaySizeSlider) overlaySizeSlider.value = 1;
  if (opacityInput) opacityInput.value = 1;
  overlayScale = 1;
}

function createOverlay(imageSrc, img) {
  if (!L.distortableImageOverlay) {
    const msg = 'Overlay plugin not loaded.';
    console.error(msg);
    overlayError.textContent = msg;
    return;
  }
  if (overlayLayer) {
    map.removeLayer(overlayLayer);
  }
  const mapSize = map.getSize();
  const pixelWidth = mapSize.x / 4;
  const pixelHeight = pixelWidth * (img.height / img.width);
  const centerPoint = map.latLngToLayerPoint(map.getCenter());
  const nwPoint = centerPoint.subtract([pixelWidth / 2, pixelHeight / 2]);
  const nePoint = centerPoint.add([pixelWidth / 2, -pixelHeight / 2]);
  const swPoint = centerPoint.add([-pixelWidth / 2, pixelHeight / 2]);
  const sePoint = centerPoint.add([pixelWidth / 2, pixelHeight / 2]);
  const corners = [
    map.layerPointToLatLng(nwPoint),
    map.layerPointToLatLng(nePoint),
    map.layerPointToLatLng(swPoint),
    map.layerPointToLatLng(sePoint),
  ];
  overlayLayer = L.distortableImageOverlay(imageSrc, {
    corners,
    opacity: parseFloat(opacityInput.value),
    selected: true,
    mode: 'drag',
  }).addTo(map);
  overlayLayer.once('load', () => {
    if (overlayLayer.editing) overlayLayer.editing.enable();
    if (overlayLayer.enableDragging) {
      overlayLayer.enableDragging();
    } else if (overlayLayer.dragging && overlayLayer.dragging.enable) {
      overlayLayer.dragging.enable();
    }
  });
  resetOverlayControls();
}

uploadInput.addEventListener('change', (e) => {
  overlayError.textContent = '';
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = new Image();
    img.onload = () => createOverlay(ev.target.result, img);
    img.onerror = () => {
      const msg = 'The selected file is not a valid image.';
      console.error(msg);
      overlayError.textContent = msg;
      alert(msg);
    };
    img.src = ev.target.result;
  };
  reader.onerror = () => {
    const msg = 'Failed to read file.';
    console.error(msg);
    overlayError.textContent = msg;
  };
  reader.readAsDataURL(file);
});

opacityInput.addEventListener('input', (e) => {
  if (overlayLayer) {
    overlayLayer.setOpacity(parseFloat(e.target.value));
  }
});

if (overlaySizeSlider) {
  overlaySizeSlider.addEventListener('input', (e) => {
    if (overlayLayer) {
      const scale = parseFloat(e.target.value);
      const factor = scale / overlayScale;
      if (overlayLayer.scaleBy) overlayLayer.scaleBy(factor);
      overlayScale = scale;
    }
  });
}
