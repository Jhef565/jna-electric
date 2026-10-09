(function () {
  document.querySelectorAll('.slideshow').forEach(function (root) {
    var slides = root.querySelectorAll('.slide');
    var dotsBox = root.querySelector('.ss-dots');
    var i = 0, timer = null, INTERVAL = 5000;
    if (slides.length < 2) { root.querySelectorAll('.ss-btn, .ss-dots').forEach(function (el) { el.style.display = 'none'; }); return; }

    var dots = Array.prototype.map.call(slides, function (_, n) {
      var b = document.createElement('button');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Photo ' + (n + 1));
      b.addEventListener('click', function () { show(n); restart(); });
      dotsBox.appendChild(b);
      return b;
    });

    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); s.setAttribute('aria-hidden', k !== i); });
      dots.forEach(function (d, k) { d.setAttribute('aria-selected', k === i); });
    }
    function start() { if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(function () { show(i + 1); }, INTERVAL); }
    function stop() { clearInterval(timer); }
    function restart() { stop(); start(); }

    root.querySelector('.ss-prev').addEventListener('click', function () { show(i - 1); restart(); });
    root.querySelector('.ss-next').addEventListener('click', function () { show(i + 1); restart(); });
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { show(i - 1); restart(); }
      if (e.key === 'ArrowRight') { show(i + 1); restart(); }
    });

    // swipe on touch screens
    var x0 = null;
    root.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; stop(); }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (x0 !== null) { var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1)); }
      x0 = null; start();
    });

    show(0); start();
  });
})();
