(function () {
  "use strict";

  var STORAGE_KEY = "honkit-collapse-state-v1";

  function getDirectChild(element, selector) {
    for (var i = 0; i < element.children.length; i += 1) {
      if (element.children[i].matches(selector)) {
        return element.children[i];
      }
    }
    return null;
  }

  function loadState() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      var state = raw ? JSON.parse(raw) : {};
      return state && typeof state === "object" ? state : {};
    } catch (error) {
      return {};
    }
  }

  function saveState(state) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      // Ignore storage failures; the sidebar remains usable for this page.
    }
  }

  function getItemKey(item) {
    var link = getDirectChild(item, "a");
    if (!link) {
      return null;
    }

    var href = link.getAttribute("href");
    if (href) {
      try {
        return new URL(href, window.location.href).pathname;
      } catch (error) {
        return href;
      }
    }

    return "text:" + link.textContent.trim();
  }

  function setExpanded(item, expanded, persist) {
    item.classList.toggle("is-expanded", expanded);
    var button = getDirectChild(item, ".honkit-collapse-toggle");
    if (button) {
      button.setAttribute("aria-expanded", expanded ? "true" : "false");
      button.setAttribute("aria-label", expanded ? "收起" : "展开");
    }

    if (persist && item.dataset.collapseKey) {
      var state = loadState();
      state[item.dataset.collapseKey] = expanded;
      saveState(state);
    }
  }

  function ensureBrand(summary) {
    if (summary.querySelector(".book-summary-brand")) {
      return;
    }

    var brand = document.createElement("a");
    brand.className = "book-summary-brand";
    brand.href = "https://10000router.com";
    brand.textContent = "https://10000router.com";
    summary.insertBefore(brand, summary.firstElementChild);
  }

  function initialize() {
    var summary = document.querySelector(".book-summary");
    if (!summary) {
      return;
    }

    ensureBrand(summary);

    var items = summary.querySelectorAll("li.chapter");
    var state = loadState();
    var stateChanged = false;

    Array.prototype.forEach.call(items, function (item) {
      var children = getDirectChild(item, "ul.articles");
      var link = getDirectChild(item, "a");

      if (!children || !link) {
        return;
      }

      if (item.dataset.collapseReady !== "true") {
        item.dataset.collapseReady = "true";
        item.classList.add("has-children");
        item.dataset.collapseKey = getItemKey(item) || "text:" + link.textContent.trim();

        var button = document.createElement("button");
        button.type = "button";
        button.className = "honkit-collapse-toggle";
        var articlesId = "honkit-articles-" + Math.random().toString(36).slice(2);
        children.id = articlesId;
        button.setAttribute("aria-controls", articlesId);
        button.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          setExpanded(item, !item.classList.contains("is-expanded"), true);
        });
        item.insertBefore(button, link);

        var hasStoredState = Object.prototype.hasOwnProperty.call(state, item.dataset.collapseKey);
        var hasActiveChild = !!children.querySelector("li.active");
        var isActiveParent = item.classList.contains("active");
        var initiallyExpanded = hasActiveChild || isActiveParent;

        // Restore the user's choice after HonKit replaces the sidebar. When
        // there is no choice yet, open only the active branch; this initial
        // expansion is remembered so navigation never closes it implicitly.
        setExpanded(
          item,
          hasStoredState ? state[item.dataset.collapseKey] === true : initiallyExpanded,
          false
        );

        if (!hasStoredState && initiallyExpanded) {
          state[item.dataset.collapseKey] = true;
          stateChanged = true;
        }
      }
    });

    if (stateChanged) {
      saveState(state);
    }
  }

  function start() {
    initialize();

    // HonKit replaces the sidebar during client-side page navigation.
    var summary = document.querySelector(".book-summary");
    if (summary && window.MutationObserver) {
      new MutationObserver(initialize).observe(summary, {
        childList: true,
        subtree: true
      });
    }

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
