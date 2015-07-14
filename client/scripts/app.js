// YOUR CODE HERE:
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  friends: {},
  init: function(){},
  send: function(message){
    $.ajax({
      url: app.server, 
      type: 'POST',
      data: JSON.stringify(message)      
    });
  },
  fetch: function(){
    return $.ajax({
      url: app.server, 
      type: 'GET',
      success: function(data){
        console.log(data)
      }  
    });
  },
  clearMessages: function(){
    $('#chats').children().remove();
  },
  addMessage: function(message){
    var $message = $('<div></div>');
    var username = message.username;
    var text = message.text;
    var roomname = message.roomname;
    var $username = $('<h3 class="username"></h3>').text(username);
    var $text = $('<p></p>').text(text);
    $username.appendTo($message);
    $text.appendTo($message);
    $('#chats').append($message);
  },
  addRoom: function(){
    var $room = $('<option></option>');
    $('#roomSelect').append($room);    
  },
  addFriend: function(username){
    app.friends[username] = username;
    console.log(username);
  },
  handleSubmit: function(){
    console.log('Hello I have submitted yo');
  }
};

$('document').ready(function(){
  $('#main').on('click', '.username', function(){app.addFriend($(this).text())});
  $('#send').submit(function(){app.handleSubmit()});
});

// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message');
//   }
// });

