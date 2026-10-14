// v2 behaviour: hero mosaic, scroll-driven robot build-up, fade-ins, demo form.
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hero mosaic: a robot head assembled from tiles.
  var mosaic = document.querySelector(".mosaic");
  if (mosaic) {
    var rows = [
      "....s....",
      "....k....",
      ".ccCcCcc.",
      ".cwwcwwc.",
      ".cwscwsc.",
      ".CccccCc.",
      ".cckkkcc.",
      ".cCccccC.",
      "...ooo...",
    ];
    var colors = { c: "var(--clay)", C: "var(--clay-deep)", s: "var(--ink)", k: "var(--kraft)", w: "var(--oat)", o: "var(--olive)" };
    var tiles = [];
    rows.join("").split("").forEach(function (ch) {
      var i = document.createElement("i");
      if (colors[ch]) { i.style.background = colors[ch]; tiles.push(i); }
      mosaic.appendChild(i);
    });
    tiles.sort(function () { return Math.random() - 0.5; });
    tiles.forEach(function (t, n) {
      if (reduce) t.classList.add("on");
      else setTimeout(function () { t.classList.add("on"); }, 300 + n * 28);
    });
  }

  // Scrollytelling: each step turns on its layer (and every layer before it).
  var robot = document.getElementById("robot");
  var steps = document.querySelectorAll(".step");
  if (robot && steps.length) {
    var layers = robot.querySelectorAll("[data-layer]");
    var legend = document.querySelectorAll(".fig-legend [data-layer]");
    function setStep(n) {
      steps.forEach(function (s) { s.classList.toggle("active", +s.dataset.step === n); });
      layers.forEach(function (l) { l.classList.toggle("on", +l.dataset.layer <= n); });
      legend.forEach(function (l) { l.classList.toggle("on", +l.dataset.layer <= n); });
      robot.classList.toggle("walking", n >= 5);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) setStep(+e.target.dataset.step); });
    }, {
      // On phones the diagram is pinned to the top half, so read steps from the lower part of the screen.
      rootMargin: window.matchMedia("(max-width: 860px)").matches ? "-72% 0px -20% 0px" : "-45% 0px -45% 0px"
    });
    steps.forEach(function (s) { io.observe(s); });
  }

  // Fade-ins
  var fades = document.querySelectorAll(".fade");
  if ("IntersectionObserver" in window && !reduce) {
    var fo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); fo.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -10% 0px" });
    fades.forEach(function (f) { fo.observe(f); });
  } else {
    fades.forEach(function (f) { f.classList.add("in"); });
  }

  // Application form → Formspree (same endpoint and fields as the previous site)
  var form = document.getElementById("apply-form");
  if (form) {
    var btn = document.getElementById("apply-submit"), status = document.getElementById("apply-status");
    var sending = false;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (sending || !form.reportValidity()) return;
      sending = true; btn.disabled = true; btn.textContent = "Sending…"; status.textContent = "";
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.classList.add("sent");
          document.getElementById("apply-done").focus();
        })
        .catch(function () {
          status.textContent = "Sorry, your application was not sent. Please try again, or email hello@genboo.com.";
          sending = false; btn.disabled = false; btn.textContent = "Submit application";
        });
    });
  }
})();
