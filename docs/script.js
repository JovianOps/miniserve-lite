(function () {
  'use strict';

  var RESET_DELAY = 1800;

  function textWithoutPrompt(element) {
    var clone = element.cloneNode(true);
    clone.querySelectorAll('[aria-hidden="true"], .select-none').forEach(function (node) {
      node.remove();
    });
    return clone.textContent.trim();
  }

  function getCommandText(button) {
    var figure = button.closest('figure');
    if (figure) {
      var lines = figure.querySelectorAll('pre code > span');
      return Array.prototype.map.call(lines, textWithoutPrompt).join('\n');
    }
    var row = button.closest('dd');
    var code = row && row.querySelector('code');
    return code ? textWithoutPrompt(code) : '';
  }

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    var ok = document.execCommand('copy');
    textarea.remove();
    return ok ? Promise.resolve() : Promise.reject(new Error('Copy failed'));
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        return fallbackCopy(text);
      });
    }
    return fallbackCopy(text);
  }

  document.querySelectorAll('button[aria-label^="Copy"]').forEach(function (button) {
    var status = button.querySelector('[aria-live]') || button;
    var timer = null;

    button.addEventListener('click', function () {
      copyText(getCommandText(button))
        .then(function () {
          status.textContent = 'Copied';
        })
        .catch(function () {
          status.textContent = 'Failed';
        })
        .then(function () {
          clearTimeout(timer);
          timer = setTimeout(function () {
            status.textContent = 'Copy';
          }, RESET_DELAY);
        });
    });
  });
})();
