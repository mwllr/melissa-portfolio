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
      '    <h2 id="footer-contact-title">Let’s Talk</h2>',
      '    <p>Hiring for an experienced UX design role, or looking for a clearer way to improve product quality?</p>',
      '    <p>I&rsquo;d be glad to connect.</p>',
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

  function setupImageModal() {
    var figures = document.querySelectorAll(".case-study-visual");

    if (!figures.length) {
      return;
    }

    var modal = document.createElement("div");
    var titleId = "image-modal-title";
    var captionId = "image-modal-caption";
    var previousFocus = null;

    modal.className = "image-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", titleId);
    modal.setAttribute("aria-describedby", captionId);
    modal.setAttribute("hidden", "");
    modal.innerHTML = [
      '<div class="image-modal-panel" role="document">',
      '  <h2 class="sr-only" id="' + titleId + '">Enlarged image</h2>',
      '  <button class="image-modal-close" type="button" aria-label="Collapse enlarged image">',
      '    <i class="ph ph-corners-in" aria-hidden="true"></i>',
      '  </button>',
      '  <img class="image-modal-image" alt="">',
      '  <p class="image-modal-caption" id="' + captionId + '"></p>',
      '</div>'
    ].join("");

    document.body.appendChild(modal);

    var closeButton = modal.querySelector(".image-modal-close");
    var modalImage = modal.querySelector(".image-modal-image");
    var modalCaption = modal.querySelector(".image-modal-caption");

    function getCaptionText(figure) {
      var caption = figure.querySelector("figcaption");
      return caption ? caption.textContent.trim() : "";
    }

    function openModal(image, caption) {
      previousFocus = document.activeElement;
      var mobileSrc = image.getAttribute("data-mobile-src");
      modalImage.src = mobileSrc && window.matchMedia("(max-width: 640px)").matches
        ? mobileSrc
        : image.currentSrc || image.src;
      modalImage.alt = image.alt || "";
      modalCaption.textContent = caption || image.alt || "";
      modal.removeAttribute("hidden");
      document.body.classList.add("image-modal-open");
      closeButton.focus();
    }

    function closeModal() {
      modal.setAttribute("hidden", "");
      document.body.classList.remove("image-modal-open");
      modalImage.removeAttribute("src");

      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
      }
    }

    figures.forEach(function (figure) {
      var image = figure.querySelector("img");

      if (!image || image.closest(".image-zoom-button")) {
        return;
      }

      var button = document.createElement("button");
      var caption = getCaptionText(figure);
      var label = caption || image.alt || "Expand image";

      button.className = "image-zoom-button";
      button.type = "button";
      button.setAttribute("aria-label", "Expand image: " + label);

      image.parentNode.insertBefore(button, image);
      button.appendChild(image);
      button.insertAdjacentHTML(
        "beforeend",
        '<span class="image-zoom-icon" aria-hidden="true"><i class="ph ph-corners-out"></i></span>'
      );

      button.addEventListener("click", function () {
        openModal(image, caption);
      });
    });

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (modal.hasAttribute("hidden")) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        closeButton.focus();
      }
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
  setupImageModal();

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
