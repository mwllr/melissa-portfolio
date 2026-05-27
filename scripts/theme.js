(function () {
  var storageKey = "melissa-theme";
  var root = document.documentElement;
  var selects = document.querySelectorAll("[data-theme-select]");
  var statusMessages = document.querySelectorAll("[data-theme-status]");

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

  updateControls();
})();
