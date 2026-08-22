/* ============================================================
   PROJECTS — Baltazar González

   Each entry becomes BOTH a pin on the map and a row in the
   list below it.

   FIELDS
   -----------------------------------------------------------
   title    Short project name.
   outcome  ONE plain-language sentence: what changed, or what
            this made possible. No jargon, no acronyms.
   year     Any string: "2024", "2022–24", "ongoing".
   type     "field" | "model" | "applied"  → sets the marker shape
   tools    Comma-separated. Appears under the outcome line.
   coords   [latitude, longitude] — decimal degrees.
   url      Detail page, DOI, or repo. Use "" for no link.
   ============================================================ */

const PROJECTS = [
  {
    title:   "Deep-time climate stability and the world's carnivore regions",
    outcome: "Showed that the boundaries between the world's biogeographic regions were set by 3.3 million years of climate stability — stable refugia hold specialists, unstable edges hold generalists, and as humans destabilize the refugia the generalists inherit the planet.",
    year:    "2026",
    type:    "model",
    tools:   "R, evoregion analysis, phylogenetic turnover, niche modelling",
    coords:  [0, 24.83],
    url:     ""
  },
  {
    title:   "Pollination under climate extremes, California",
    outcome: "Found that bees and the flowers they depend on become vulnerable in different places and at different times of year — so conservation timed to the bees alone misses half the problem.",
    year:    "2024 – present",
    type:    "model",
    tools:   "R, Python, Google Earth Engine, species distribution models",
    coords:  [37.30, -120.48],
    url:     "project-pollination.html"
  },
  {
    title:   "Seed-dispersal networks from the tropics to the temperate zone",
    outcome: "Tracing how the risk of losing seed dispersal shifts with latitude under climate change, to show which forests lose the animals that replant them first.",
    year:    "2025 – present",
    type:    "model",
    tools:   "R, network analysis, climate projections",
    coords:  [-25.43, -49.27],
    url:     ""
  },
  {
    title:   "Range maps for the Handbook of the Mammals of Middle and South America",
    outcome: "Automated publication-grade range maps for more than 2,000 species across ten volumes, replacing hand-drawn cartography with a reproducible pipeline.",
    year:    "2024 – present",
    type:    "applied",
    tools:   "R, GIS automation, Springer Nature",
    coords:  [15.00, -90.00],
    url:     ""
  },
  {
    title:   "Conservation data infrastructure for Argentina's mammals",
    outcome: "Built the web platform and automated reporting a national scientific society uses to assess extinction risk — dozens of specialists now curate one shared dataset instead of trading spreadsheets.",
    year:    "2020 – present",
    type:    "applied",
    tools:   "Shiny, R, SQL, AWS, Google Drive API",
    coords:  [-30.00, -64.00],
    url:     "https://doi.org/10.1016/j.jnc.2024.126759"
  },
  {
    title:   "Where South America's marsupials are — and aren't protected",
    outcome: "Mapped the gap between where marsupials actually occur and where protected areas sit, giving conservation planners a continental picture that did not exist before.",
    year:    "2020 – 2022",
    type:    "model",
    tools:   "R, spatial prioritization, IUCN range data",
    coords:  [-8.13, -60.31],
    url:     "https://doi.org/10.1016/j.biocon.2021.109045"
  }, 
  {
    title:   "A decade of fieldwork experience",
    outcome: "More than fourteen field sites across Colombia, Argentina, and California — camera traps, mist nets, live trapping, and community interviews. Spanning a wide variety of latitudes,  ecosystems, and sampled organisms.",
    year:    "2014 – present",
    type:    "field",
    tools:   "Camera traps, mist nets, Sherman traps, community surveys",
    coords:  [
      /* Colombia */
      [  3.42, -76.52],   // Valle del Cauca — Minas Lili, Cali
      [  4.70, -75.60],   // Central Cordillera — Caenolestes gradient
      [  5.90, -74.60],   // Magdalena Medio
      [  9.24, -74.76],   // Bajo Magdalena
      [  4.15, -72.00],   // Llanos — tapir camera traps
      [  1.10, -77.15],   // Laguna de La Cocha, Pasto (Nariño)
      [  3.89, -77.07],   // Buenaventura (Pacific coast)
      [  5.22, -76.03],   // Pueblo Rico, Risaralda–Chocó
      /* California */
      [ 37.48, -119.97],  // Sierra Nevada, near Mariposa
      /* Argentina */
      [-36.62,  -64.29],  // La Pampa
      [-42.91,  -71.31],  // Esquel, Chubut
      [-42.87,  -71.62],  // South of Lago Futalaufquen, Los Alerces
      [-42.09,  -71.60]   // Lago Puelo
    ],
    url:     ""
  }
];

/* Marker styling per type. Keep in sync with the .swatch
   colours in css/site.css if you change them. */
const MARKER_STYLE = {
  field:   { color: "#16211F", fillColor: "#D6336C", shape: "circle", z: 1000},
  model:   { color: "#16211F", fillColor: "#1F5F5B", shape: "square", z: 0 },
  applied: { color: "#16211F", fillColor: "#FBFCFA", shape: "diamond", z: 0 }
};