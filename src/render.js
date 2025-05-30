
function button_info() {
  const div = document.querySelector('.text-info');

  if (div.style.display === 'none' || div.style.display === '') {
    div.innerText = "This app is designed to remind the user to always water their plants!";
    div.style.display = 'block'; // mostra a div
  } else {
    div.style.display = 'none'; // oculta a div
  }
}

function button_title() {
  window.location.href = "main.html";
}
