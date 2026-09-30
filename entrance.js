(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { document.documentElement.classList.add('entrance-off'); return; }

  var REVEAL = 'cubic-bezier(0.16, 1, 0.3, 1)';
  var LIFT = 'cubic-bezier(0.22, 1, 0.36, 1)';

  function run() {
    var t = 0;

    // masked headline lines
    document.querySelectorAll('.hl-line').forEach(function (el, i) {
      el.animate(
        [
          { opacity: 0, transform: 'translateY(60%)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        { duration: 700, delay: i * 90, easing: REVEAL, fill: 'forwards' }
      );
    });

    // generic [data-enter] elements: staggered lift
    var enters = document.querySelectorAll('[data-enter]');
    enters.forEach(function (el, i) {
      var delay = parseInt(el.getAttribute('data-delay') || (140 + i * 60), 10);
      el.animate(
        [
          { opacity: 0, transform: 'translateY(12px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        { duration: 550, delay: delay, easing: LIFT, fill: 'forwards' }
      );
    });
  }

  if (document.fonts && document.fonts.ready) {
    var done = false;
    document.fonts.ready.then(function () { if (!done) { done = true; run(); } });
    setTimeout(function () { if (!done) { done = true; run(); } }, 400);
  } else {
    run();
  }
})();
