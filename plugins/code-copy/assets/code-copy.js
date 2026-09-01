(function () {
  "use strict";

  var copyIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 9h10v10H9z"></path><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"></path></svg>';
  var checkIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"></path></svg>';

  function fallbackCopy(text) {
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    var copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }
    document.body.removeChild(textarea);
    return copied;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () {
        return true;
      }).catch(function () {
        return fallbackCopy(text);
      });
    }
    return Promise.resolve(fallbackCopy(text));
  }

  function addCopyButton(pre) {
    if (pre.dataset.copyReady === "true") {
      return;
    }

    var code = pre.querySelector("code");
    if (!code) {
      return;
    }

    pre.dataset.copyReady = "true";
    pre.classList.add("has-copy-button");

    var button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy-button";
    button.setAttribute("aria-label", "复制代码");
    button.title = "复制代码";
    button.innerHTML = copyIcon;

    button.addEventListener("click", function () {
      button.disabled = true;

      copyText(code.textContent).then(function (copied) {
        if (copied) {
          button.innerHTML = checkIcon;
          button.setAttribute("aria-label", "已复制");
          button.title = "已复制";
          button.classList.add("is-copied");
        } else {
          button.setAttribute("aria-label", "复制失败");
          button.title = "复制失败";
        }
        window.setTimeout(function () {
          button.innerHTML = copyIcon;
          button.setAttribute("aria-label", "复制代码");
          button.title = "复制代码";
          button.classList.remove("is-copied");
          button.disabled = false;
        }, 1600);
      });
    });

    pre.appendChild(button);
  }

  function initialize() {
    var blocks = document.querySelectorAll(".markdown-section pre");
    Array.prototype.forEach.call(blocks, addCopyButton);
  }

  function start() {
    initialize();

    if (window.gitbook && gitbook.events && gitbook.events.bind) {
      gitbook.events.bind("page.change", initialize);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
