const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const menuLinks = document.querySelectorAll(".menu-link");
const trilho = document.getElementById("trilho");

// Inicialmente desativa TAB nos links do menu e no trilho
menuLinks.forEach(link => link.setAttribute("tabindex", "-1"));
trilho.setAttribute("tabindex", "-1");

// Função para abrir/fechar menu
function toggleMenu(openedViaKeyboard = false) {
  const isActive = menu.classList.toggle("active");
  hamburger.classList.toggle("active");

  // Ajusta tabindex dos links
  menuLinks.forEach(link => link.setAttribute("tabindex", isActive ? "0" : "-1"));
  trilho.setAttribute("tabindex", isActive ? "0" : "-1");

  // Se abriu pelo teclado, foca no primeiro link
  if (isActive && openedViaKeyboard) {
    menuLinks[0].focus();
  }
}

// Clique no hambúrguer
hamburger.addEventListener("click", () => toggleMenu(false));

// Fechar menu ao clicar em algum link
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    hamburger.classList.remove("active");
    menuLinks.forEach(link => link.setAttribute("tabindex", "-1"));
    trilho.setAttribute("tabindex", "-1");
  });
});

// Acessibilidade: ENTER e ESPAÇO abrem/fecham menu
hamburger.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleMenu(true);
  }
});

// LOOP DE FOCO DENTRO DO MENU
menu.addEventListener("keydown", (e) => {
  if (!menu.classList.contains("active")) return;

  const focusable = [...menuLinks, trilho]; // itens navegáveis
  const firstEl = focusable[0];
  const lastEl = focusable[focusable.length - 1];

  if (e.key === "Tab") {
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      // Tab normal
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  }
});
