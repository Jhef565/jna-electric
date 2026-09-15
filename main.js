// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Urgency note toggle on quote form
  var urgencyRadios = document.querySelectorAll('input[name="urgency"]');
  var note = document.querySelector('.urgency-note');
  if (urgencyRadios.length && note) {
    urgencyRadios.forEach(function (radio) {
      radio.addEventListener('change', function () {
        if (radio.value === 'emergency' && radio.checked) {
          note.classList.add('is-visible');
        } else {
          note.classList.remove('is-visible');
        }
      });
    });
  }

  // Quote form submit (front-end only — wire to a form backend/email service before launch)
  var form = document.querySelector('#quote-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      var success = document.querySelector('.form-success');
      if (success) success.classList.add('is-visible');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});
