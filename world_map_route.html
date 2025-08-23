<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>World Route & Distance Map</title>
  <style>
    :root {
      --bg: #0f172a;           /* slate-900 */
      --panel: #111827cc;      /* gray-900 w/ alpha */
      --text: #e5e7eb;         /* gray-200 */
      --muted: #9ca3af;        /* gray-400 */
      --accent: #22d3ee;       /* cyan-400 */
      --accent-2: #60a5fa;     /* blue-400 */
      --pin: #ef4444;          /* red-500 */
      --land: #1f2937;         /* gray-800 */
      --water: #0b1220;        /* deep bg */
      --grid: #374151;         /* gray-700 */
      --stroke: #111827;       /* gray-900 */
      /* Route gradient (orange-ish) */
      --route-start: #f59e0b;  /* amber-500 */
      --route-end: #fb923c;    /* orange-400 */
    }

    html, body { height: 100%; margin: 0; background: var(--bg); color: var(--text); font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"; }

    .app {
      display: grid;
      grid-template-rows: auto 1fr;
      height: 100%;
    }

    .toolbar {
      display: flex; gap: 16px; align-items: center; justify-content: space-between;
      padding: 12px 16px; backdrop-filter: blur(8px);
      background: linear-gradient(180deg, #111827f0, #111827b0 60%, transparent);
      border-bottom: 1px solid #1f2937;
      position: sticky; top: 0; z-index: 10;
    }

    .left, .right { display:flex; align-items:center; gap:12px; flex-wrap: wrap; }

    .label { color: var(--muted); font-size: 14px; letter-spacing: .02em; }

    select { 
      background: var(--panel); color: var(--text); border: 1px solid #1f2937; border-radius: 10px;
      padding: 10px 12px; font-size: 14px; outline: none; appearance: none; cursor: pointer;
    }

    .pill { 
      background: var(--panel); border: 1px solid #1f2937; border-radius: 999px; 
      padding: 8px 12px; font-size: 14px; color: var(--text); 
    }

    .hint { font-size: 12px; color: var(--muted); }

    #map { position: relative; height: 100%; width: 100%; overflow: hidden; }

    svg { display: block; width: 100%; height: 100%; background: radial-gradient(1200px 800px at 60% -10%, #0d1b33 0%, var(--water) 60%, var(--bg) 100%); }

    .sphere { fill: none; stroke: #0b2947; stroke-width: 1; opacity: .5; }
    .graticule { fill: none; stroke: var(--grid); stroke-opacity: .35; stroke-width: .5; }
    .country { fill: var(--land); stroke: var(--stroke); stroke-width: .4; transition: fill .25s ease, stroke .25s ease, stroke-width .25s ease, opacity .25s ease; }
    .country.hovered { fill: #2b3a4d; stroke: var(--route-start); stroke-width: 1.25; filter: drop-shadow(0 6px 8px rgba(0,0,0,.45)); }

    .route, .route-shadow { stroke-linecap: round; stroke-linejoin: round; }
    .route { fill: none; stroke: url(#routeGradient); stroke-width: 2.8; pointer-events: none; }
    .route-shadow { fill: none; stroke: #000; stroke-opacity: .35; stroke-width: 4; filter: drop-shadow(0 1px 0 #000); pointer-events: none; }

    .pin { filter: drop-shadow(0 2px 4px rgba(0,0,0,.6)); pointer-events: none; }

    .country-label { font-size: 12px; font-weight: 600; fill: #ffd7a1; paint-order: stroke fill; stroke: rgba(0,0,0,.7); stroke-width: .6px; pointer-events: none; }

    .plane-emoji { font-size: 16px; pointer-events: none; }

    .tooltip { position: absolute; transform: translate(-50%, -120%); pointer-events: none; 
      background: #111827f2; border: 1px solid #1f2937; color: var(--text); padding: 6px 8px; border-radius: 8px; font-size: 12px;
      white-space: nowrap; }

    .footer-note { position:absolute; bottom: 10px; right: 12px; font-size: 12px; color: var(--muted); }
  </style>
</head>
<body>
  <div class="app">
    <div class="toolbar">
      <div class="left">
        <span class="label">Your country</span>
        <select id="countrySelect" title="Select your current country"></select>
        <span class="hint">Hover anywhere on the map to see a flight path & distance.</span>
      </div>
      <div class="right">
        <div class="pill" id="distancePill">Distance: <span id="distanceValue">—</span></div>
      </div>
    </div>
    <div id="map"></div>
  </div>

  <!-- D3 -->
  <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>

  <script>
  (function(){
    // Data source: GeoJSON with country polygons & names
    const WORLD_GEOJSON_URL = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';

    // DOM elements
    const mapEl = document.getElementById('map');
    const selectEl = document.getElementById('countrySelect');
    const distanceValueEl = document.getElementById('distanceValue');

    let svg, gMap, gRoutes, gPins, gLabels, path, projection, graticule, defs;
    let worldFeatures = [];

    // State
    let selectedCountry = null;      // GeoJSON feature
    let selectedCenter = null;       // [lon, lat]
    let lastHoverLonLat = null;      // [lon, lat]

    // Hover state for "levitation"
    let currentHoverPath = null;
    let hoverOffset = { x: 0, y: 0 };
    let hoverTargetOffset = { x: 0, y: 0 };
    let hoverScale = 1.0;
    let scaleTarget = 1.0;
    let hoverRAF = null;
    const HOVER_SOFTNESS = 0.10;   // how strongly the mouse attracts the shape (weaker)
    const HOVER_MAX_OFFSET = 10;   // px cap for translation (smaller)
    const HOVER_EASE = 0.08;       // easing per RAF frame (softer)
    const SCALE_BASE = 1.0;
    const SCALE_HOVER = 1.02;      // tiny scale up

    // Responsive sizing
    function computeSize() {
      const { clientWidth, clientHeight } = mapEl;
      const width = clientWidth;
      const height = Math.max(480, Math.min(900, Math.round(clientHeight)) || Math.round(width * 0.55));
      return { width, height };
    }

    function initSVG() {
      const { width, height } = computeSize();
      svg = d3.select('#map').append('svg')
        .attr('width', width)
        .attr('height', height)
        .on('mousemove', onMouseMove)
        .on('mouseleave', onMouseLeave);

      defs = svg.append('defs');

      // Gradient for the route (orange-ish) aligned to the path in user space
      const css = getComputedStyle(document.documentElement);
      const grad = defs.append('linearGradient')
        .attr('id', 'routeGradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0).attr('y1', 0).attr('x2', 1).attr('y2', 0);
      grad.append('stop').attr('offset', '0%').attr('stop-color', css.getPropertyValue('--route-start').trim());
      grad.append('stop').attr('offset', '100%').attr('stop-color', css.getPropertyValue('--route-end').trim());

      // Arrowhead marker for route end
      const arrow = defs.append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 8)
        .attr('refY', 5)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto')
        .attr('markerUnits', 'userSpaceOnUse');
      arrow.append('path')
        .attr('d', 'M0,0 L10,5 L0,10 Z')
        .attr('fill', css.getPropertyValue('--route-end').trim())
        .attr('opacity', 0.95);

      projection = d3.geoNaturalEarth1();
      path = d3.geoPath(projection);
      graticule = d3.geoGraticule().step([20, 20]);

      gMap = svg.append('g');
      gRoutes = svg.append('g');
      gPins = svg.append('g');
      gLabels = svg.append('g');

      // static layers
      gMap.append('path').attr('class', 'sphere').attr('d', path({ type: 'Sphere' }));
      gMap.append('path').attr('class', 'graticule');

      svg.append('text')
        .attr('class', 'footer-note')
        .attr('x', computeSize().width - 12)
        .attr('y', computeSize().height - 10)
        .attr('text-anchor', 'end')
        .text('Natural Earth • d3-geo');
    }

    function fitProjection() {
      const { width, height } = computeSize();
      svg.attr('width', width).attr('height', height);

      // Fit projection to the world bounds for current size
      if (worldFeatures.length) {
        const world = { type: 'FeatureCollection', features: worldFeatures };
        projection.fitExtent([[12, 12], [width - 12, height - 12]], world);
      } else {
        projection.translate([width/2, height/2]).scale((width / 6.2) * 100);
      }

      // Update graticule and any paths
      gMap.select('.graticule').attr('d', path(graticule()));
      gMap.selectAll('.country').attr('d', path);

      // Reposition pins & route if present
      drawSelectedPin();
      redrawRoute();

      // Reposition label if hovering
      const label = gLabels.select('.country-label');
      if (!label.empty() && currentHoverPath) {
        const d = currentHoverPath.datum();
        const [cx, cy] = path.centroid(d);
        label.attr('x', cx).attr('y', cy - 8);
      }
    }

    function loadWorld() {
      return d3.json(WORLD_GEOJSON_URL).then(geo => {
        worldFeatures = geo.features.filter(f => f.geometry);

        // Draw countries
        gMap.selectAll('.country')
          .data(worldFeatures)
          .enter()
          .append('path')
          .attr('class', 'country')
          .attr('d', path)
          .on('mouseover', countryMouseOver)
          .on('mousemove', countryMouseMove)
          .on('mouseout', countryMouseOut)
          .append('title')
          .text(d => d.properties.name);

        // Populate select
        const names = worldFeatures.map(f => f.properties.name).sort((a,b) => a.localeCompare(b));
        selectEl.innerHTML = '<option value="">— Select —</option>' + names.map(n => `<option>${escapeHtml(n)}</option>`).join('');

        // Try to preselect Netherlands; if available in list
        const preferred = 'Netherlands';
        if (names.includes(preferred)) {
          selectEl.value = preferred;
          onSelectChange();
        }

        fitProjection();
      });
    }

    function escapeHtml(str){
      return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
    }

    function onSelectChange() {
      const name = selectEl.value;
      if (!name) {
        selectedCountry = null; selectedCenter = null; distanceValueEl.textContent = '—';
        clearRoute(); clearPin();
        return;
      }
      selectedCountry = worldFeatures.find(f => f.properties.name === name) || null;
      selectedCenter = selectedCountry ? d3.geoCentroid(selectedCountry) : null; // [lon, lat]
      drawSelectedPin();
      redrawRoute();
    }

    function drawSelectedPin(){
      gPins.selectAll('*').remove();
      if (!selectedCenter) return;
      const [x, y] = projection(selectedCenter);

      const pin = gPins.append('g').attr('class','pin').attr('transform', `translate(${x},${y})`);

      // Simple map pin (circle + pointer)
      pin.append('path')
        .attr('d', 'M0,-1 C12,-1 12,15 0,24 C-12,15 -12,-1 0,-1 Z')
        .attr('transform','translate(0,-8) scale(1)')
        .attr('fill', getComputedStyle(document.documentElement).getPropertyValue('--pin').trim())
        .attr('stroke', '#fff').attr('stroke-width', 1).attr('opacity', .95);
      pin.append('circle').attr('r', 3.2).attr('fill', '#fff').attr('cy', -8);
    }

    function clearPin(){ gPins.selectAll('*').remove(); }

    function onMouseMove(event){
      if (!selectedCenter) return;
      const [mx, my] = d3.pointer(event, svg.node());
      const lonlat = projection.invert([mx, my]);
      if (!lonlat || isNaN(lonlat[0]) || isNaN(lonlat[1])) { return; }
      lastHoverLonLat = lonlat;
      updateDistanceAndRoute(lonlat);
    }

    function onMouseLeave(){
      if (!selectedCenter) return;
      clearRoute();
      distanceValueEl.textContent = '—';
    }

    function updateDistanceAndRoute(targetLonLat){
      const km = haversineKm(selectedCenter, targetLonLat);
      distanceValueEl.textContent = formatKm(km) + ' km';
      drawRoute(selectedCenter, targetLonLat);
    }

    function redrawRoute(){
      if (selectedCenter && lastHoverLonLat) {
        drawRoute(selectedCenter, lastHoverLonLat);
        const km = haversineKm(selectedCenter, lastHoverLonLat);
        distanceValueEl.textContent = formatKm(km) + ' km';
      }
    }

    function drawRoute(aLonLat, bLonLat){
      clearRoute();

      // Sample points along great-circle, then add subtle "windy" wobble in screen space
      const steps = 96;
      const interp = d3.geoInterpolate(aLonLat, bLonLat);
      const geoPts = d3.range(0, steps + 1).map(i => interp(i / steps));
      const pts = geoPts.map(p => projection(p)); // [[x,y], ...]

      // Total length approximation
      let total = 0; for (let i = 1; i < pts.length; i++) { const dx = pts[i][0]-pts[i-1][0], dy = pts[i][1]-pts[i-1][1]; total += Math.hypot(dx,dy); }
      const amp = Math.min(6, total / 50);         // px amplitude (small)
      const freq = 2 * Math.PI;                    // ~one gentle wave

      const wavy = pts.map((p, i, arr) => {
        if (i === 0 || i === arr.length - 1) return p.slice();
        const prev = arr[i-1], next = arr[i+1];
        const tx = next[0] - prev[0], ty = next[1] - prev[1];
        const tmag = Math.hypot(tx, ty) || 1;
        const nx = -ty / tmag, ny = tx / tmag;     // unit normal
        const t = i / (arr.length - 1);
        const wobble = Math.sin(t * freq) * amp * Math.sin(Math.PI * t); // tapered at ends
        return [ p[0] + nx * wobble, p[1] + ny * wobble ];
      });

      const lineGen = d3.line().curve(d3.curveCatmullRom.alpha(0.5));
      const d = lineGen(wavy);

      // Orient the gradient along the path endpoints in screen space
      const [sx, sy] = pts[0];
      const [ex, ey] = pts[pts.length - 1];
      defs.select('#routeGradient').attr('x1', sx).attr('y1', sy).attr('x2', ex).attr('y2', ey);

      // Draw
      gRoutes.append('path').attr('class','route-shadow').attr('d', d);
      const routePath = gRoutes.append('path').attr('class','route').attr('d', d).attr('marker-end', 'url(#arrowhead)');

      // Place a plane emoji at the midpoint, rotated to the path tangent
      const node = routePath.node();
      if (node && node.getTotalLength) {
        const L = node.getTotalLength();
        const m = node.getPointAtLength(L / 2);
        const m2 = node.getPointAtLength(Math.min(L, L / 2 + 2));
        const angle = Math.atan2(m2.y - m.y, m2.x - m.x) * 180 / Math.PI;
        gRoutes.append('text')
          .attr('class', 'plane-emoji')
          .attr('x', m.x)
          .attr('y', m.y)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'central')
          .attr('transform', `rotate(${angle}, ${m.x}, ${m.y})`)
          .text('✈️');
      }
    }

    function clearRoute(){ gRoutes.selectAll('*').remove(); }

    function greatCircleLineString(a, b, steps = 64){
      const interp = d3.geoInterpolate(a, b);
      const coords = d3.range(0, steps + 1).map(i => interp(i / steps));
      return { type: 'LineString', coordinates: coords };
    }

    function haversineKm(a, b){
      const toRad = d => d * Math.PI / 180;
      const [lon1, lat1] = [toRad(a[0]), toRad(a[1])];
      const [lon2, lat2] = [toRad(b[0]), toRad(b[1])];
      const dlat = lat2 - lat1, dlon = lon2 - lon1;
      const h = Math.sin(dlat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dlon/2)**2;
      return 2 * 6371 * Math.asin(Math.sqrt(h));
    }

    function formatKm(km){
      return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(km);
    }

    // ===== Country hover handlers with "magnet" levitation + tiny scale =====
    function countryMouseOver(event, d){
      // Clear other hovers
      gMap.selectAll('.country.hovered').classed('hovered', false).attr('transform', null);

      currentHoverPath = d3.select(this).classed('hovered', true).raise();
      hoverOffset = { x: 0, y: 0 };
      hoverTargetOffset = { x: 0, y: 0 };
      hoverScale = SCALE_BASE;
      scaleTarget = SCALE_HOVER;

      // Label
      gLabels.selectAll('.country-label').interrupt().remove();
      const [cx, cy] = path.centroid(d);
      const label = gLabels.append('text')
        .attr('class', 'country-label')
        .attr('text-anchor', 'middle')
        .attr('x', cx)
        .attr('y', cy)
        .attr('opacity', 0)
        .text(d.properties.name);
      label.transition().duration(220).attr('y', cy - 8).attr('opacity', 1);

      updateHoverTargetToPointer(event, d);
      startHoverLoop();
    }

    function countryMouseMove(event, d){
      // Keep label base at centroid; translation handled in RAF
      const [cx, cy] = path.centroid(d);
      gLabels.selectAll('.country-label').attr('x', cx).attr('y', cy - 8);
      updateHoverTargetToPointer(event, d);
    }

    function countryMouseOut(event, d){
      const self = d3.select(this);
      self.classed('hovered', false);

      // Fade out label
      const [cx, cy] = path.centroid(d);
      const label = gLabels.selectAll('.country-label');
      if (!label.empty()) {
        label.transition().duration(220).attr('opacity', 0).attr('y', cy - 2).remove();
      }

      // Ease the country back to rest & base scale, then clean up
      hoverTargetOffset = { x: 0, y: 0 };
      scaleTarget = SCALE_BASE;
      setTimeout(() => {
        if (currentHoverPath && currentHoverPath.node() === self.node()) {
          currentHoverPath.attr('transform', null);
          gLabels.selectAll('.country-label').attr('transform', null);
          currentHoverPath = null;
        }
      }, 340);
    }

    function updateHoverTargetToPointer(event, d){
      const [mx, my] = d3.pointer(event, svg.node());
      const [cx, cy] = path.centroid(d);
      let dx = mx - cx, dy = my - cy;
      // soften
      dx *= HOVER_SOFTNESS; dy *= HOVER_SOFTNESS;
      // clamp to max offset
      const mag = Math.hypot(dx, dy) || 1;
      const k = Math.min(HOVER_MAX_OFFSET, mag) / mag;
      hoverTargetOffset = { x: dx * k, y: dy * k };
    }

    function startHoverLoop(){
      if (hoverRAF) return;
      const step = () => {
        if (!currentHoverPath) { hoverRAF = null; return; }
        // smooth easing towards targets
        hoverOffset.x += (hoverTargetOffset.x - hoverOffset.x) * HOVER_EASE;
        hoverOffset.y += (hoverTargetOffset.y - hoverOffset.y) * HOVER_EASE;
        hoverScale += (scaleTarget - hoverScale) * (HOVER_EASE * 0.9);

        const d = currentHoverPath.datum();
        const [cx, cy] = path.centroid(d);
        const t = `translate(${hoverOffset.x.toFixed(2)}, ${hoverOffset.y.toFixed(2)}) translate(${cx.toFixed(2)}, ${cy.toFixed(2)}) scale(${hoverScale.toFixed(3)}) translate(${-cx.toFixed(2)}, ${-cy.toFixed(2)})`;
        currentHoverPath.attr('transform', t);
        const label = gLabels.select('.country-label');
        if (!label.empty()) {
          label.attr('transform', `translate(${(hoverOffset.x*1.05).toFixed(2)}, ${(hoverOffset.y*1.05).toFixed(2)})`);
        }
        hoverRAF = requestAnimationFrame(step);
      };
      hoverRAF = requestAnimationFrame(step);
    }

    // Resize handling
    window.addEventListener('resize', fitProjection);
    selectEl.addEventListener('change', onSelectChange);

    // Bootstrap
    initSVG();
    loadWorld();
  })();
  </script>
</body>
</html>
