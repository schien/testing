var chattxt = document.getElementById('chattxt');
var sendbutton = document.getElementById('sendbutton');
var closebutton = document.getElementById('closebutton');
var dialog = document.getElementById('dialog');
var session = null;

function appendDialog(message, from) {
  var messageLog = document.createElement('div');
  messageLog.textContent = from + ': ' + message;
  messageLog.classList.add(from);
  dialog.appendChild(messageLog);
}

sendbutton.addEventListener('click', function() {
  var message = chattxt.value;
  appendDialog(message, 'local');
  session.postMessage(message);
});

closebutton.addEventListener('click', function() {
  session.close();
  session = null;
  appendDialog('<close session>', 'local');
});

// For guest
navigator.presentation.onavailablechange = function(e) {
  if (!e.available) {
    return;
  }
  navigator.presentation.onavailablechange = null;
  session = navigator.presentation.requestSession('/~schien/presentation-demo/secondary.html');
  session.onmessage = function(message) {
    appendDialog(message, 'remote');
    console.log(message);
  };
  session.onstatechange = function(state) {
    if (session && session.state === 'disconnected') {
      appendDialog('<session closed>', 'remote');
    }
  };
};
