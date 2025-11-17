const trilho = document.getElementById('trilho');
const body = document.body;

trilho.addEventListener('click', () => {
  trilho.classList.toggle('dark'); // animação do botão
  body.classList.toggle('light'); // alterna o modo claro/escuro
  <body class="light">  </body>//"dark"//

});
