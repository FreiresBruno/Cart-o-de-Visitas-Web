const trilho = document.getElementById('trilho');
const body = document.body;

trilho.addEventListener('click', () => {
  trilho.classList.toggle('dark'); // animação do botão
  body.classList.toggle('light'); // alterna o modo claro/escuro
});
const trilho = document.getElementById('trilho');
const body = document.body;

// Verifica se existe tema salvo no localStorage
const temaSalvo = localStorage.getItem('tema');

// Define o tema inicial
if (temaSalvo) {
  body.className = temaSalvo;
  trilho.classList.toggle('dark', temaSalvo === 'light'); // ajusta visual do trilho
} else {
  body.classList.add('dark'); // padrão dark
  trilho.classList.remove('dark'); 
}

// Alterna tema quando o usuário clica
trilho.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    body.classList.add('light');
    trilho.classList.add('dark'); // muda o indicador
    localStorage.setItem('tema', 'light');
  } else {
    body.classList.remove('light');
    body.classList.add('dark');
    trilho.classList.remove('dark'); // muda o indicador
    localStorage.setItem('tema', 'dark');
  }
});
