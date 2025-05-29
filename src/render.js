
function button_info() {
  const div = document.querySelector('.text-info');

  if (div.style.display === 'none' || div.style.display === '') {
    div.innerText = "Esse aplicativo é destinado a lembrar o usuario de sempre regar suas plantas!";
    div.style.display = 'block'; // mostra a div
  } else {
    div.style.display = 'none'; // oculta a div
  }
}

function title() {
  window.location.href = "main.html";
}
