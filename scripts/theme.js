(function () {
  var storageKey = "melissa-theme";
  var root = document.documentElement;
  var selects = document.querySelectorAll("[data-theme-select]");
  var statusMessages = document.querySelectorAll("[data-theme-status]");
  var navToggles = document.querySelectorAll("[data-nav-toggle]");
  var copyButtons = document.querySelectorAll("[data-copy-value]");

  function isDark() {
    return root.dataset.theme === "dark";
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {}
  }

  function updateControls() {
    var dark = isDark();

    selects.forEach(function (select) {
      select.value = dark ? "on" : "off";
    });

    statusMessages.forEach(function (status) {
      status.textContent = dark ? "Dark mode is on." : "Dark mode is off.";
    });
  }

  function setTheme(theme) {
    if (theme === "dark") {
      root.dataset.theme = "dark";
      saveTheme("dark");
    } else {
      delete root.dataset.theme;
      saveTheme("light");
    }

    updateControls();
  }

  selects.forEach(function (select) {
    select.addEventListener("change", function () {
      setTheme(select.value === "on" ? "dark" : "light");
    });
  });

  navToggles.forEach(function (toggle) {
    var headerMenu = toggle.closest(".header-menu");
    var nav = headerMenu ? headerMenu.querySelector(".site-nav") : null;

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", expanded ? "false" : "true");

      if (headerMenu) {
        headerMenu.dataset.navOpen = expanded ? "false" : "true";
      }
    });

    if (nav) {
      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          toggle.setAttribute("aria-expanded", "false");

          if (headerMenu) {
            headerMenu.dataset.navOpen = "false";
          }
        });
      });
    }
  });

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var input = document.createElement("textarea");
      input.value = text;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.top = "-9999px";
      document.body.appendChild(input);
      input.select();

      try {
        document.execCommand("copy") ? resolve() : reject();
      } catch (error) {
        reject(error);
      } finally {
        document.body.removeChild(input);
      }
    });
  }

  copyButtons.forEach(function (button) {
    var defaultLabel = button.getAttribute("aria-label") || "Copy";

    button.addEventListener("click", function () {
      copyText(button.dataset.copyValue).then(function () {
        button.dataset.copied = "true";
        button.setAttribute("aria-label", "Copied email address");

        window.setTimeout(function () {
          delete button.dataset.copied;
          button.setAttribute("aria-label", defaultLabel);
        }, 2000);
      });
    });
  });

  updateControls();
})();
