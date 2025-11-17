const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("show");
});
// Alternar modo claro/escuro
const body = document.body;

// Botão ou evento para alternar
function toggleModo() {
  body.classList.toggle("light");
}

// Exemplo: se quiser adicionar um botão manualmente
const btnModo = document.createElement("button");
btnModo.textContent = "Alternar Modo";
btnModo.style.position = "fixed";
btnModo.style.bottom = "20px";
btnModo.style.right = "20px";
btnModo.style.padding = "0.5rem 1rem";
btnModo.style.zIndex = "1000";
btnModo.onclick = toggleModo;
document.body.appendChild(btnModo);
