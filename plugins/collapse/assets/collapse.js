(function () {
  "use strict";

  function getDirectChild(element, selector) {
    for (var i = 0; i < element.children.length; i += 1) {
      if (element.children[i].matches(selector)) {
        return element.children[i];
      }
    }
    return null;
  }

  function setExpanded(item, expanded) {
    item.classList.toggle("is-expanded", expanded);
    var button = getDirectChild(item, ".honkit-collapse-toggle");
    if (button) {
      button.setAttribute("aria-expanded", expanded ? "true" : "false");
      button.setAttribute("aria-label", expanded ? "收起" : "展开");
    }
  }

  function initialize() {
    var summary = document.querySelector(".book-summary");
    if (!summary) {
      return;
    }

    var items = summary.querySelectorAll("li.chapter");

    Array.prototype.forEach.call(items, function (item) {
      var children = getDirectChild(item, "ul.articles");
      var link = getDirectChild(item, "a");

      if (!children || !link) {
        return;
      }

      if (item.dataset.collapseReady !== "true") {
        item.dataset.collapseReady = "true";
        item.classList.add("has-children");

        var button = document.createElement("button");
        button.type = "button";
        button.className = "honkit-collapse-toggle";
        var articlesId = "honkit-articles-" + Math.random().toString(36).slice(2);
        children.id = articlesId;
        button.setAttribute("aria-controls", articlesId);
        button.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          setExpanded(item, !item.classList.contains("is-expanded"));
        });
        item.insertBefore(button, link);
      }

      var hasActiveChild = !!children.querySelector("li.active");
      var isActiveParent = item.classList.contains("active");
      setExpanded(item, hasActiveChild || isActiveParent);
    });
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
