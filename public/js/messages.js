var socket = io();
    socket.username = localStorage.getItem('ephy-nn');

// Send to the Server
$('#ephy-msg-send-btn').click((e) => {
    e.preventDefault();

    var messageElement = $('#ephy-msg-box'), 
        message = messageElement.val();
        data = {
            id: socket.id,
            user: socket.username,
            message: message,
        };

    if(message === '\\logout') {
        logoutUser();
    }
    
    else if(message.substring(0, 2) === '\\i') {
        socket.emit('chat_window', data);
        messageElement.val('');
    }

    else if(message.length > 0) {
        socket.emit('chat_window', data);
        messageElement.val('');
    } 
});

// Display to the client
socket.on('chat_window', function(data) {
    // console.log(username != data.user);
    console.log(data.message);
    var user = socket.id === data.id ? 'You' : data.user;
    var d = new Date();
    var hrs = d.getHours();
    var min = d.getMinutes();
    var period = hrs < 12 ? 'AM' : 'PM';
    hrs =  hrs < 10 ? ('0' + hrs) : hrs;
    min = min < 10 ? ('0'+ min) : min;
    // $('#msg-wrapper').append($(`<div class="siimple-card" id="msg-card-${counter}">`));
    // $(`#msg-card-${counter}`).append($('<div class="profile-pic"><img src="/images/ryan.jpg" alt=""></div>'));
    // $(`#msg-card-${counter}`).append($(`<span class="siimple-small msg-sender">${data.username}</span>`));
    // $(`#msg-card-${counter}`).append($(`<span class="msg-txt">${data.message}</span>`));
    // $(`#msg-card-${counter}`).append($(`<span class="siimple-small msg-sent-time">${hrs % 12} : ${min} ${period}</span>`));
    // $('.msg-card').append($('<li>').text(data.message));

    $('#msg-wrapper').append($(`<li><div class="siimple-card"> \
    <div class="profile-pic"><img src="/images/ryan.jpg" alt=""></div> \
    <span class="siimple-small msg-sender">${user}</span> \
    <span class="msg-txt">${data.message}</span>`));
    // <span class="siimple-small msg-sent-time">${hrs % 12} : ${min} ${period}</span>`));
});

logoutUser = () => {
    localStorage.clear();
    location.replace('http://localhost:8080/');
};


var msg_txt_field = $('#ephy-msg-box');
msg_txt_field.on('keydown', (e) => {
    socket.emit('userTyping', socket.username);
});

msg_txt_field.on('keyup', (e) => {
    socket.emit('userNotTyping');
});

var typing_status = $('#ephy-typing-status-txt');
socket.on('userTyping', (user) => {
    if(socket.username !== user) typing_status.css('visibility', 'visible');
});

socket.on('userNotTyping', () => {
    typing_status.css('visibility', 'hidden');
})