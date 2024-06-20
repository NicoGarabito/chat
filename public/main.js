var socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');
var messages = document.getElementById('messages');
var nameInput = document.getElementById('name');
var name = '';
var submitButton = form.querySelector('button');
var userColor;

//Generador de colores aleatorios
function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  const pastelColor = `hsl(${hue}, 100%, 80%)`;
  return pastelColor;
}

//Habilita botón de enviar solo cuando hay un nombre
nameInput.addEventListener('input', function () {
  if (nameInput.value.trim() !== '') {
    name = nameInput.value.trim();
    input.disabled = false;
    submitButton.disabled = false;
  } else {
    input.disabled = true;
    submitButton.disabled = true;
  }
});

//Funcion para enviar el mensaje
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value && name) {
    const message = {
      name: name,
      text: input.value,
      color: userColor
    };
    socket.emit('chat message', message);
    input.value = '';
  }
});

//Escucha cuando un usuario se conecta
socket.on('connect', function () {
  userColor = getRandomPastelColor();
});

//Escucha cuando un mensaje es enviado
socket.on('chat message', function (msg) {
  var item = document.createElement('li');
  item.textContent = `${msg.name}: ${msg.text}`;
  item.style.backgroundColor = msg.color;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
