// src/utils/toastManager.js

export function showToast(message, type = "info") {
  const event = new CustomEvent("toast", {
    detail: { message, type },
  });
  window.dispatchEvent(event);
}
