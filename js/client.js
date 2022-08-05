const socket = io('http://localhost:8000',{ transports: ['websocket'] })

const form =document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('tone.mp3');

const append=(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    //console.log(messageElement);
    // if(position=='count'){
    //     const countContainer = document.querySelector('.count');
    //     messageElement.classList.add(position);
    //     countContainer.append(messageElement);
    //     console.log(messageElement);
    // }
    // else{
        messageElement.classList.add('message');
        messageElement.classList.add(position);
        
        messageContainer.append(messageElement);
    // }
    if(position=='left')
        audio.play();
}

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
})

const name =prompt("Enter your name to join");

socket.emit('new-user-joined', name);

socket.on('user-joined',data => {
    append(`${data.name} joined the chat`,'left');
  //  append(`${data.count} users are now connected`, 'count')
})

socket.on('receive',data => {
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('leave', name=>{
    append(`${name} left the chat`,'left');
})