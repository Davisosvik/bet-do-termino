// src/utils/showToast.js

export default function showToast(message, type = "info") {
  const event = new CustomEvent("toast", {
    detail: { message, type }
  });

  window.dispatchEvent(event);
}
