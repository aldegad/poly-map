export const registerPreventContextMenu = () => {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
};
