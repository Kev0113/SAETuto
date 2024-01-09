function show() {
    messages.classList.toggle('hide');
}

document.getElementById('btnLeave').addEventListener('click', show);
document.getElementById('btnJoin').addEventListener('click', show);

let connected = document.querySelector('#connected p')
let inputName = document.querySelector('#name')
let btnName = document.querySelector('#confirmName')
let divHiddenIfNotLogin = document.querySelector('#hiddenIfNotLogin')
let divBases = document.querySelector('#bases')
let name = ""

btnName.addEventListener('click', () => {
    name = inputName.value
    divHiddenIfNotLogin.style.display = "block"
    divBases.style.display = "none"
    connected.innerHTML = "Vous êtes connecté en tant que " + name
})

const socket = io({
    auth: {
        serverOffset: 0
    }
});
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const btnJoin = document.getElementById('btnJoin')
const btnLeave = document.getElementById('btnLeave')
const title = document.getElementById('rooms')

btnJoin.addEventListener('click', () => {
    const roomName = 'Salle 1';
    socket.emit('rooms', {rooms : roomName, action: 'join'});
})

btnLeave.addEventListener('click', () => {
    const roomName = 'Salle 1';
    socket.emit('rooms', {rooms : roomName, action: 'leave'});
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        let message = ""+name +" : " + "" + input.value
        socket.emit('chat message', message);
        input.value = '';
    }
});

socket.on('changeTitleRooms', (rooms) => {
    if(rooms !== null){
        title.innerHTML = "Vous êtes dans la " + rooms
    }else{
        title.innerHTML = "Vous n'êtes dans aucune salle"
    }
})

socket.on('chat message', (msg, serverOffset) => {
    const item = document.createElement('li');
    //last message
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    socket.auth.serverOffset = serverOffset;
});
