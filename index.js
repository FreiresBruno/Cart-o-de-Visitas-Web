const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const menuLinks = Array.from(document.querySelectorAll(".menu-link"));
const trilho = document.getElementById("trilho");
const instagramLink = document.querySelector(".instagram a");

// Media query para diferenciar mobile / desktop
const mq = window.matchMedia("(max-width: 768px)");

// Define tabindex conforme o estado (mobile: quando menu fechado, tab -1; desktop: tab navegável)
function applyTabIndexForViewport() {
  if (mq.matches) {
    // Mobile: se menu estiver fechado, desativa tab nos links
    const closed = !menu || !menu.classList.contains("active");
    menuLinks.forEach((link) => {
      if (closed) link.setAttribute("tabindex", "-1");
      else link.setAttribute("tabindex", "0");
    });
    if (trilho) {
      if (closed) trilho.setAttribute("tabindex", "-1");
      else trilho.setAttribute("tabindex", "0");
    }
  } else {
    // Desktop: garante que links da navbar estejam focáveis (remove atributo para usar comportamento padrão)
    menuLinks.forEach((link) => link.removeAttribute("tabindex"));
    if (trilho) trilho.removeAttribute("tabindex");
  }
}

// Inicial
applyTabIndexForViewport();
// Atualiza quando a largura muda
if (mq.addEventListener) mq.addEventListener("change", applyTabIndexForViewport);
else if (mq.addListener) mq.addListener(applyTabIndexForViewport);

// Função para abrir/fechar menu (mobile)
function toggleMenu(openedViaKeyboard = false) {
  if (!menu || !hamburger) return;
  const isActive = menu.classList.toggle("active");
  hamburger.classList.toggle("active");

  // Ajusta tabindex apenas em mobile (mq.matches)
  if (mq.matches) {
    menuLinks.forEach((link) =>
      link.setAttribute("tabindex", isActive ? "0" : "-1")
    );
    if (trilho) trilho.setAttribute("tabindex", isActive ? "0" : "-1");
  }

  if (isActive && openedViaKeyboard && menuLinks.length > 0) {
    menuLinks[0].focus();
  }
}

// Eventos do hambúrguer (protegidos por existência)
if (hamburger) {
  hamburger.addEventListener("click", () => toggleMenu(false));
  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu(true);
    }
  });
}

// Fecha menu ao clicar em link (mobile)
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!menu || !hamburger) return;
    menu.classList.remove("active");
    hamburger.classList.remove("active");
    // Reaplica tabindex para mobile fechado
    if (mq.matches) {
      menuLinks.forEach((l) => l.setAttribute("tabindex", "-1"));
      if (trilho) trilho.setAttribute("tabindex", "-1");
    }
  });
});

// Loop de foco dentro do menu (aplica somente quando menu ativo em mobile)
if (menu) {
  menu.addEventListener("keydown", (e) => {
    if (!menu.classList.contains("active")) return;
    const focusable = menuLinks.slice(); // links do menu
    if (trilho) focusable.push(trilho);
    if (focusable.length === 0) return;

    const firstEl = focusable[0];
    const lastEl = focusable[focusable.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  });
}

// Loop solicitado: Instagram <-> Primeiro link da navbar
// Só ativa se os elementos existirem
if (instagramLink && menuLinks.length > 0) {
  const firstNav = menuLinks[0];
  // Ao tab no instagram vai para primeiro link
  instagramLink.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      firstNav.focus();
    }
  });
  // Ao Shift+Tab no primeiro link volta para instagram
  firstNav.addEventListener("keydown", (e) => {
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      instagramLink.focus();
    }
  });
}

// Garante que, por padrão, nav anchors sejam focáveis em desktop (não força alteração em mobile)
document.querySelectorAll("nav a").forEach((a) => {
  if (!mq.matches) a.removeAttribute("tabindex");
});
