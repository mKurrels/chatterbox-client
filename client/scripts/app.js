// YOUR CODE HERE:
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  friends: {},
  messages: undefined,
  rooms: {},
  init: function(){
    app.clearMessages();
    for (var i = 0; i <app.messages.length; i++){
      //if messages.room isnt in options list
      //if($("#roomSelect option:selected" ).text() === messages[i].roomname)
        //add room to options
      var roomname = unescapeHtml(escapeHtml(app.messages[i].roomname));
      if(!app.rooms.hasOwnProperty(roomname)){
        app.rooms[roomname] = roomname;
        var $newOption = $('<option></option>').text(roomname);
        $("#roomSelect").append($newOption);
      }
      //if message is in currently selected room
      if($("#roomSelect option:selected" ).text() === roomname){
        app.addMessage(app.messages[i])
      }
    }
  },
  send: function(message){
    $.ajax({
      url: app.server, 
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
          console.log('chatterbox: Message sent');
          app.init();
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }      
    });
  },
  fetch: function(){
    console.log('hi');
    $.ajax({
      url: app.server, 
      type: 'GET',
      contentType: 'application/json',
      success: function(data){
        console.log('bob')
        app.messages = data.results;
        app.init();
      }  
    });
  },
  clearMessages: function(){
    $('#chats').children().remove();
  },
  addMessage: function(message){
    var $message = $('<div></div>');
    var username = escapeHtml(message.username);
    var text = escapeHtml(message.text);
    var $username = $('<h3 class="username"></h3>').text(unescapeHtml(username));
    var $text = $('<p></p>').text(unescapeHtml(text));
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
    var username = window.location.search.split('=')[1];
    var message = {
      username: username,
      text: $('#message').val(),
      roomname: $("#roomSelect option:selected" ).text()
    };
    app.send(message);
  }
};

$('document').ready(function(){
  app.fetch();
  $('#main').on('click', '.username', function(){app.addFriend($(this).text())});
  $('#send').submit(function(){app.handleSubmit()});
  $('#roomSelect').change(app.init);
  $('#refresh').on('click', function(){app.fetch();});

});

var escapeHtml = function(str){
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

var unescapeHtml = function(escapedStr){
  var div = document.createElement('div');
  div.innerHTML = escapedStr;
  var child = div.childNodes[0];
  return child ? child.nodeValue : '';
}

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

