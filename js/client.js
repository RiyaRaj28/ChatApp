const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('ting.mp3');

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement); 
    if(position == 'left'){
    audio.play();
    }
}

const userName = prompt("Enter your name to join chat");
socket.emit('new-user-joined', userName); 

socket.on('user-joined', userName => {
    append(`${userName} joined the chat!`, 'right');
})

socket.on('receive', data=> {
    append(`${data.userName} : ${data.message}`, 'left');
})

socket.on('left', name => {
    append(`${name} left the chat`, 'left') 
})


