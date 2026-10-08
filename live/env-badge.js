(function () {
  if (location.pathname.indexOf('/staging/') === -1) return;
  document.title = '[Staging] ' + document.title;
  function addBadge() {
    var badge = document.createElement('div');
    badge.textContent = 'STAGING — not the live site';
    badge.setAttribute('style',
      'position:fixed;right:12px;bottom:12px;z-index:2147483647;' +
      'background:#b45309;color:#fff;font:600 12px/1 system-ui,sans-serif;' +
      'padding:8px 12px;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.3);' +
      'pointer-events:none');
    document.body.appendChild(badge);
  }
  if (document.body) addBadge();
  else document.addEventListener('DOMContentLoaded', addBadge);
})();
