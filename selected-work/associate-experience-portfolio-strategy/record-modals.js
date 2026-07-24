(() => {
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-record]").forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        const record = window.touchpointRecords?.[trigger.dataset.record];
        if (!record) return;
        const dialog = document.createElement("dialog");
        dialog.className = "record-modal";
        dialog.innerHTML = `<div class="modal-head"><div><h2>${record.title}</h2><p>${record.subtitle}</p></div><div class="record-meta">${record.tags}</div><button class="modal-close" type="button">Close</button></div><div class="modal-body">${window.renderRecordDetails(record)}</div>`;
        dialog.querySelector(".modal-close").addEventListener("click", () => dialog.close());
        dialog.addEventListener("click", (dialogEvent) => { if (dialogEvent.target === dialog) dialog.close(); });
        dialog.addEventListener("close", () => dialog.remove());
        document.body.append(dialog);
        dialog.showModal();
      });
    });
  });
})();
