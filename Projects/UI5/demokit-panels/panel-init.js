(function () {
  var density = new URLSearchParams(location.search).get('density') || 'cozy';
  if (density === 'compact') {
    document.documentElement.classList.add('ui5-content-density-compact');
  }
})();
