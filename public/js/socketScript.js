const socket = io();
let name = ""
let chat_box = document.querySelector('#chat-box')
let login_box = document.querySelector('#login-box')

let btnConfirm = document.getElementById('confirm_login');
let inputName = document.getElementById('login');
btnConfirm.addEventListener('click', () => {
    name = inputName.value
    login_box.style.display = "none"
    chat_box.style.display = "block"
})

let btnSalle1 = document.querySelector('#btnSalle1')
let title = document.querySelector('#title')
btnSalle1.addEventListener('click', (btn) => {
    let rooms = btn.target.attributes['data-rooms'].value
    let action = btn.target.attributes['data-action'].value
    action === "join" ? title.innerHTML = "Vous êtes dans Salle 1" : title.innerHTML = "Vous êtes dans aucune salle"
    action === "join" ? btn.target.attributes['data-action'].value = "leave" : btn.target.attributes['data-action'].value = "join"
    action === "join" ? btn.target.innerHTML = "Quitter la salle 1" : btn.target.innerHTML = "Rejoindre la salle 1"
    show()

    let msg = name + " a " + action + " la salle 1"
    socket.emit('chat message', msg);

    socket.emit('change rooms', {actions : action, rooms: rooms})
})

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        let msg = name + " : " + input.value
        socket.emit('chat message', msg);
        input.value = '';
    }
});

socket.on('chat message', (msg, serverOffset) => {
    const item = document.createElement('li');
    //last message
    item.textContent = msg;
    messages.appendChild(item);
    messages.scrollTo(0, messages.scrollHeight);
    // socket.auth.serverOffset = serverOffset;
});

function show() {
    messages.classList.toggle('hide');
}

// document.getElementById('btnLeave').addEventListener('click', show);
// document.getElementById('btnJoin').addEventListener('click', show);
