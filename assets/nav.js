// Phone menu: toggle, close on link / outside click / Escape.
(function () {
  var b = document.querySelector(".menu-toggle"), m = document.getElementById("mmenu");
  if (!b || !m) return;
  function set(open) {
    m.hidden = !open;
    b.setAttribute("aria-expanded", open);
    b.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  b.addEventListener("click", function (e) { e.stopPropagation(); set(m.hidden); });
  m.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
  document.addEventListener("click", function (e) { if (!m.hidden && !m.contains(e.target)) set(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !m.hidden) { set(false); b.focus(); } });
  matchMedia("(min-width: 721px)").addEventListener("change", function (e) { if (e.matches) set(false); });
})();
