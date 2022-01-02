

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

const socket = io(); //input output

const messageContainer = document.getElementById("chat_messages");
const messageForm = document.getElementById("send_container");
const messageInput = document.getElementById("msg_from_user");
const welcomeMessage = document.getElementById("welcome-header");

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
});


messageForm.addEventListener('submit', event => {
    event.preventDefault(); // Refresher ikke siden
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
    welcomeMessage.innerText = "";
});

socket.on("user-disconnected", name => {
    appendMessage(`${name} disconnected from chat!`);
});

function appendMessage(message){
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}