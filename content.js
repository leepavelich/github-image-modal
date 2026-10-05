// GitHub navigates between pages without full reloads, so the script runs on
// all of github.com and checks for a pull request page at click time.
(() => {
  const PR_PATH = /^\/[^/]+\/[^/]+\/pull\/\d+/;

  let overlay = null;

  function closeModal() {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
    document.documentElement.classList.remove("gh-img-modal-open");
    document.removeEventListener("keydown", onKeydown, true);
  }

  function onKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    }
  }

  function openModal(src, alt) {
    closeModal();

    overlay = document.createElement("div");
    overlay.className = "gh-img-modal-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    const img = document.createElement("img");
    img.className = "gh-img-modal-image";
    img.src = src;
    img.alt = alt || "";

    overlay.appendChild(img);
    // Clicks on the backdrop close the modal; clicks on the image do not.
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeModal();
    });

    document.body.appendChild(overlay);
    document.documentElement.classList.add("gh-img-modal-open");
    document.addEventListener("keydown", onKeydown, true);
  }

  document.addEventListener(
    "click",
    (event) => {
      // Leave ctrl/cmd/shift/middle clicks alone so "open in new tab" still works.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!PR_PATH.test(location.pathname)) return;

      const img = event.target.closest("img");
      if (!img || !img.closest(".markdown-body, .comment-body")) return;
      // Skip avatars and emoji that can appear inside comment bodies.
      if (img.classList.contains("emoji") || img.classList.contains("avatar")) return;

      event.preventDefault();
      event.stopPropagation();
      openModal(img.currentSrc || img.src, img.alt);
    },
    true
  );

  // Close the modal if GitHub navigates to another page.
  document.addEventListener("turbo:visit", closeModal);
  window.addEventListener("popstate", closeModal);
})();
