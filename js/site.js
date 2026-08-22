/* ============================================================
   SITE BEHAVIOUR
   You shouldn't need to edit this file. It reads PROJECTS from
   js/projects.js and builds two things: the map pins and the
   project list underneath.
   ============================================================ */

(function () {
  "use strict";

  /* --- 1. THE MAP ------------------------------------------ */

  const mapEl = document.getElementById("hero-map");

  if (mapEl && typeof L !== "undefined" && PROJECTS.length) {

    const map = L.map("hero-map", {
      scrollWheelZoom: false,      // stops the map hijacking page scroll
      zoomControl: true,
      attributionControl: true
    });

    // Made available so the popup-link handler below can close popups.
    window._siteMap = map;

    // Pale basemap that matches the site palette.
    // CARTO's tiles are free to use; the attribution below is required.
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
          '&copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 18
      }
    ).addTo(map);

    const bounds = [];

    // True on mouse/trackpad devices, false on touch-only screens.
    const canHover = window.matchMedia("(hover: hover)").matches;

    PROJECTS.forEach(function (p, i) {
      const style = MARKER_STYLE[p.type] || MARKER_STYLE.field;

      // coords can be a single pair — [lat, lng] — or a list of pairs
      // for projects that span several sites. Normalise to a list.
      const points = Array.isArray(p.coords[0]) ? p.coords : [p.coords];

      // Multi-site projects get smaller pins so a dense cluster doesn't
      // visually outweigh the single-site projects on the map.
      const size = points.length > 6 ? 9 : (points.length > 1 ? 10 : 13);

      points.forEach(function (point) {
        addMarker(point, p, i, style, size);
      });

      points.forEach(function (point) { bounds.push(point); });
    });


    /* Creates one pin. Called once per coordinate pair. */
    function addMarker(point, p, i, style, size) {

      const marker = L.marker(point, {
        icon: L.divIcon({
          className: "",
          html:
            '<span style="' +
            "display:block;width:" + size + "px;height:" + size + "px;" +
            "background:" + style.fillColor + ";" +
            "border:1.5px solid " + style.color + ";" +
            "box-shadow:0 2px 6px -1px rgba(22,33,31,.45);" +
            (style.shape === "circle"  ? "border-radius:50%;" : "") +
            (style.shape === "diamond" ? "transform:rotate(45deg);" : "") +
            '"></span>',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2]
        }),
        keyboard: true,
        zIndexOffset: style.z || 0,
        riseOnHover: true,
        title: p.title
      }).addTo(map);

      // Popup includes a link, so touch users (who have no hover)
      // still get a way through to the project.
      marker.bindPopup(
        "<strong>" + escapeHtml(p.title) + "</strong>" +
        escapeHtml(p.outcome) +
        '<a class="popup-link" href="#project-' + i + '">View project &darr;</a>',
        { closeButton: false, offset: [0, -4] }
      );

      // Desktop: hovering a pin reveals the popup. It stays open until
      // you hover another pin or click the map, so you can read it and
      // reach the link inside without it vanishing.
      marker.on("mouseover", function () { this.openPopup(); });

      // Keyboard: focusing a pin does the same thing hovering does.
      const el = marker.getElement();
      if (el) {
        el.addEventListener("focus", function () { marker.openPopup(); });
      }

      // Clicking a pin scrolls to that project in the list — but only on
      // devices that can hover, where you've already had a chance to read
      // the popup. On touch, the tap just opens the popup instead.
      marker.on("click", function () {
        if (!canHover) return;
        marker.closePopup();
        scrollToProject(i);
      });
    }

    // Frame all the pins, with room for the legend card.
    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [70, 70], maxZoom: 6 });
    } else {
      map.setView(bounds[0], 6);
    }

    // Let people zoom with the wheel once they've clicked in.
    map.on("focus", function () { map.scrollWheelZoom.enable(); });
    map.on("blur",  function () { map.scrollWheelZoom.disable(); });
  }


  /* --- 2. THE PROJECT LIST --------------------------------- */

  const listEl = document.getElementById("project-list");

  if (listEl && PROJECTS.length) {
    listEl.innerHTML = PROJECTS.map(function (p, i) {
      const tag = p.url ? "a" : "div";
      const href = p.url ? ' href="' + p.url + '"' : "";

      return (
        "<" + tag + ' class="project" id="project-' + i + '"' + href + ">" +
          '<div class="project__mark">' +
            '<span class="swatch swatch--' + p.type + '"></span>' +
          "</div>" +
          "<div>" +
            '<h3 class="project__title">' + escapeHtml(p.title) + "</h3>" +
            '<p class="project__outcome">' + escapeHtml(p.outcome) + "</p>" +
            '<p class="project__tools">' + escapeHtml(p.tools) + "</p>" +
          "</div>" +
          '<div class="project__year">' + escapeHtml(p.year) + "</div>" +
        "</" + tag + ">"
      );
    }).join("");
  }


  /* --- 3. FOOTER YEAR -------------------------------------- */

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* --- helper ---------------------------------------------- */

  // Scrolls the page to a project row and briefly highlights it, so it's
  // obvious which one you landed on.
  function scrollToProject(i) {
    const row = document.getElementById("project-" + i);
    if (!row) return;
    row.scrollIntoView({ behavior: "smooth", block: "center" });
    row.classList.add("is-target");
    setTimeout(function () { row.classList.remove("is-target"); }, 1600);
  }

  // "View project ↓" inside a popup: close the popup, then scroll.
  document.addEventListener("click", function (e) {
    const link = e.target.closest ? e.target.closest(".popup-link") : null;
    if (!link) return;
    e.preventDefault();
    const i = link.getAttribute("href").replace("#project-", "");
    if (window._siteMap) window._siteMap.closePopup();
    scrollToProject(i);
  });

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

})();