# baltazargonzalez.com

Plain HTML, CSS, and JavaScript. No build step, no npm, no framework.
Open `index.html` in a browser and it works.

```
index.html                Home — hero map, work, about, writing, contact
project-pollination.html  Full detail page for the California pollinator work
project.html              Blank template. Duplicate it for new project pages.
css/site.css              All styling. Colours and fonts at the very top.
js/projects.js            ← YOUR PROJECT DATA. The file you edit most.
js/site.js                Builds the map and the project list. Leave alone.
img/                      Portrait, figures, favicon, share image.
```

## Before you publish — three things

1. **Google Scholar ID.** Open your Scholar profile, copy the `user=`
   value from the address bar, and replace `XXXX` in `index.html`
   (three places). This is the only thing I couldn't fill in from the CV.
2. **Images.** The four files in `img/` are grey placeholders. Replace
   `portrait.jpg`, and swap `figure-1.png` for a real figure from the
   pollination paper. `share.jpg` (1200×630) is what shows when someone
   posts your link — a map or figure works better than a portrait.
3. **CV.** Drop your `cv.pdf` in the root folder. The hero links to it.

Compress images before uploading — [Squoosh](https://squoosh.app) is the
easy option. Aim under 300 KB each.

## Editing it

**Adding a project.** Open `js/projects.js`, copy one of the blocks in
the `PROJECTS` list. It appears as a map pin *and* a list row
automatically — you never touch HTML.

Get coordinates by right-clicking a location in Google Maps; it copies
`latitude, longitude` in exactly the format the file wants.

**Adding a project page.** Duplicate `project.html`, rename it
(`project-handbook.html`), edit the content, then change that project's
`url` in `projects.js` to the new filename.

Four of the six projects currently link straight to a DOI. Replacing
those with your own detail pages is the single biggest improvement you
can make to this site — a DOI sends the reader away, a project page
keeps them and lets you show the figures.

**Changing colours or fonts.** Everything is in the `:root` block at the
top of `css/site.css`. If you change a marker colour, change it in both
`css/site.css` (the `.swatch--*` rules) and `js/projects.js`
(`MARKER_STYLE`) so the legend keeps matching the map.

**Figures.** Export as PNG or SVG into `img/`, then use the `.figure`
block shown in `project-pollination.html`. Always write a caption
stating the finding — it's often the only part that gets read.

## Publishing

1. Create a GitHub repository named `baltazargch.github.io` (public).
2. Upload these files — the web uploader is fine, no git needed.
3. Settings → Pages → Source: `main` branch, `/ (root)`. Save.
4. Live at `https://baltazargch.github.io` in about a minute.

For a custom domain: buy it (~$12/yr), then Settings → Pages → Custom
domain, and follow GitHub's DNS instructions at your registrar. Tick
"Enforce HTTPS" once the certificate provisions.

## Notes

- The basemap is CARTO's free tile service. The attribution in
  `js/site.js` is required — leave it in place.
- Scroll-wheel zoom is off until you click the map, so it doesn't trap
  the page scroll on the way past.
- The site respects `prefers-reduced-motion`, has visible keyboard
  focus, and works down to a 320px screen.
