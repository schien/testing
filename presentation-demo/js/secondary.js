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
  appendDialog('<session close>', 'local');
});

// For presenter
navigator.presentation.onpresent = function(e) {
  console.log('onpresent: ' + JSON.stringify(e));
  //Presentation.log("This is client presenting");
  //Presentation.log("state:" + e.session.state);
  session = e.session;
  session.onmessage = function(message) {
    appendDialog(message, 'remote');
    console.log(message);
  };

  session.onstatechange = function() {
    if (session && session.state === 'disconnected') {
      appendDialog('<session closed>', 'remote');
    }
  };
};
