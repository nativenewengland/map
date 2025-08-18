const markersData = [
  {
    name: "New York",
    lat: 40.7128,
    lng: -74.006,
    description: "New York City.",
    icon: "default.webp",
  },
  {
    name: "London",
    lat: 51.5074,
    lng: -0.1278,
    description: "Capital of the UK.",
    icon: "default.webp",
  },
  {
    name: "Tokyo",
    lat: 35.6895,
    lng: 139.6917,
    description: "Capital of Japan.",
    icon: "default.webp",
  },
];

// Expose markers for non-module scripts
if (typeof window !== 'undefined') {
  window.markersData = markersData;
}
