(function () {
  var form = document.getElementById('quote-form');
  if (!form) return;

  var ENDPOINT = 'https://api.web3forms.com/submit';
  var success = document.querySelector('.form-success');
  var errorBox = document.getElementById('form-error');
  var btn = form.querySelector('button[type="submit"]');
  var btnText = btn.textContent;

  function showError(msg) {
    errorBox.innerHTML = msg;
    errorBox.style.display = 'block';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorBox.style.display = 'none';

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });

    // Put urgency in the subject so emergencies stand out in your inbox
    var urgency = data.urgency || 'planned';
    data.subject = (urgency === 'emergency' ? '[EMERGENCY] ' : urgency === 'urgent' ? '[URGENT] ' : '') +
      'Quote request: ' + (data['job-type'] || 'New job') + ' - ' + data.name;
    data.replyto = data.email;

    btn.disabled = true;
    btn.textContent = 'Sending...';

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res.success) throw new Error(res.message || 'Submission failed');

        // Google Ads / GA4 conversion
        if (typeof gtag === 'function') {
          gtag('event', 'generate_lead', { event_category: 'quote_form', value: 1 });
          // After you create a "Submit lead form" conversion in Google Ads, uncomment and fill in:
          // gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXX/XXXXXXXXXXXX' });
        }

        form.style.display = 'none';
        success.style.display = 'block';
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = btnText;
        showError('Something went wrong sending your request. Please call <a href="tel:+16264537523" style="text-decoration:underline;">(626) 453-7523</a> or email <a href="mailto:info@jna-electric.com" style="text-decoration:underline;">info@jna-electric.com</a>.');
      });
  });
})();
