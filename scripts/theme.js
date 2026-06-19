(function () {
  var navToggles = document.querySelectorAll("[data-nav-toggle]");

  function renderSharedFooter() {
    var footers = document.querySelectorAll("[data-site-footer]");

    if (!footers.length) {
      return;
    }

    var footerMarkup = [
      '<div class="footer-inner">',
      '  <div class="footer-meta">',
      '    <p>&copy; 2026 Melissa Waller</p>',
      '  </div>',
      '  <section id="contact" class="footer-contact" aria-labelledby="footer-contact-title">',
      '    <h2 id="footer-contact-title">Contact</h2>',
      '    <p>Interested in discussing accessibility leadership, organizational enablement, design operations, or future opportunities?</p>',
      '    <p>I&rsquo;d love to connect.</p>',
      '    <ul>',
      '      <li>',
      '        <span class="contact-inline">',
      '          <i class="ph ph-envelope-simple contact-inline-icon" aria-hidden="true"></i>',
      '          <span class="copy-email-group">',
      '            <span class="copy-email-address">mwallerbiz@gmail.com</span>',
      '            <button class="copy-email" type="button" data-copy-value="mwallerbiz@gmail.com" aria-label="Copy email address">',
      '              <i class="ph ph-copy" aria-hidden="true" data-copy-icon></i>',
      '              <span class="copy-email-label" data-copy-label>Copy</span>',
      '            </button>',
      '            <span class="sr-only" role="status" aria-live="polite" aria-atomic="true" data-copy-status></span>',
      '          </span>',
      '        </span>',
      '      </li>',
      '      <li>',
      '        <span class="contact-inline">',
      '          <i class="ph ph-linkedin-logo contact-inline-icon" aria-hidden="true"></i>',
      '          <a class="contact-link" href="https://www.linkedin.com/in/melissa-waller-61b48827" aria-label="LinkedIn, external site">',
      '            <span class="contact-link-text">LinkedIn</span>',
      '            <i class="ph ph-arrow-up-right contact-link-icon" aria-hidden="true"></i>',
      '          </a>',
      '        </span>',
      '      </li>',
      '    </ul>',
      '  </section>',
      '</div>'
    ].join("");

    footers.forEach(function (footer) {
      footer.innerHTML = footerMarkup;
    });
  }

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

  renderSharedFooter();

  var copyButtons = document.querySelectorAll("[data-copy-value]");

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
    var label = button.querySelector("[data-copy-label]");
    var icon = button.querySelector("[data-copy-icon]");
    var copyGroup = button.closest(".copy-email-group");
    var status = copyGroup ? copyGroup.querySelector("[data-copy-status]") : null;
    var defaultText = label ? label.textContent : "";
    var defaultIconClass = icon ? icon.className : "";
    var resetTimer = null;

    function announce(message) {
      if (!status) {
        return;
      }

      status.textContent = "";
      window.requestAnimationFrame(function () {
        status.textContent = message;
      });
    }

    button.addEventListener("click", function () {
      copyText(button.dataset.copyValue).then(function () {
        button.dataset.copied = "true";
        button.setAttribute("aria-label", "Copied email address");
        if (resetTimer) {
          window.clearTimeout(resetTimer);
        }
        if (label) {
          label.textContent = "Copied";
        }
        if (icon) {
          icon.className = "ph ph-check";
        }
        announce("Email address copied.");

        resetTimer = window.setTimeout(function () {
          delete button.dataset.copied;
          button.setAttribute("aria-label", defaultLabel);
          if (label) {
            label.textContent = defaultText;
          }
          if (icon) {
            icon.className = defaultIconClass;
          }
          if (status) {
            status.textContent = "";
          }
        }, 2000);
      });
    });
  });
})();
