/* Block scope allows us to define vars multiple times */
{
  let modalDiv = document.createElement("div");
  modalDiv.innerHTML = "💾 Saved to Net!";
  modalDiv.style.position = "fixed";

  /* bg-indigo-100 */
  modalDiv.style.backgroundColor = "rgba(224, 231, 255, 1)";

  /* right-3, top-3 */
  modalDiv.style.right = "0.75rem";
  modalDiv.style.top = "0.75rem";

  /* p-4, p-6 */
  modalDiv.style.padding = "1rem 1.5rem";

  /* font-medium */
  modalDiv.style.fontWeight = "500";

  /* text-base */
  modalDiv.style.fontSize = "1rem";
  modalDiv.style.lineHeight = "1.5rem";

  /* shadow-lg, ring-2, ring-indigo-200 */
  modalDiv.style.boxShadow =
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 0 0 2px rgba(199, 210, 254, 1)";

  /* rounded-md */
  modalDiv.style.borderRadius = "0.375rem";

  /* font-sans */
  modalDiv.style.fontFamily = `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

  /* bg-indigo-700 */
  modalDiv.style.color = "rgba(67, 56, 202, 1)";

  /* https://www.digitalocean.com/community/tutorials/css-z-index */
  modalDiv.style.zIndex = "2147483647";

  document.getElementsByTagName("body")[0].appendChild(modalDiv);

  let fade = () => {
    let element = modalDiv;
    let op = 1; // initial opacity
    let timer = setInterval(() => {
      if (op <= 0.1) {
        clearInterval(timer);
        document.body.removeChild(modalDiv);
        element.style.display = "none";
      }
      element.style.opacity = op;
      element.style.filter = "alpha(opacity=" + op * 100 + ")";
      op -= op * 0.1;
    }, 25);
  };

  setTimeout(fade, 2000);
}
