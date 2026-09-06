/* OPTISEC Hub — shared i18n + nav behavior.
   Same data-en/data-ar mechanism as optisec-store, extended to persist
   the chosen language across page navigation (this is a multi-page site,
   unlike the single-page store). */
(function () {
  var STORAGE_KEY = 'optisec-hub-lang';

  function getLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'en';
    } catch (e) {
      return 'en';
    }
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function applyLang(lang) {
    var html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    var btn = document.getElementById('langBtn');
    if (btn) btn.textContent = lang === 'en' ? 'العربية' : 'English';

    document.querySelectorAll('[data-en]').forEach(function (el) {
      var value = el.getAttribute('data-' + lang);
      if (value !== null) el.textContent = value;
    });

    window.optisecCurrentLang = lang;
  }

  function toggleLang() {
    var next = window.optisecCurrentLang === 'en' ? 'ar' : 'en';
    setLang(next);
    applyLang(next);
  }

  function highlightActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getLang());
    highlightActiveNav();

    var btn = document.getElementById('langBtn');
    if (btn) btn.addEventListener('click', toggleLang);
  });
})();
