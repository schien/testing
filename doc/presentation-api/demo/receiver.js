(function() {

window.addEventListener('load', function() {
  console.log('receiver loaded');

  function handleCommand(imgSrc) {
    console.log('receiver handle command: ' + JSON.stringify(imgSrc));
    var picTitle = document.querySelector('#pic-title');
    picTitle.textContent = imgSrc;

    var picContent = document.querySelector('#pic-content');
    picContent.src = imgSrc;
  }

  navigator.presentation.receiver.connectionList.then(function(connectionList) {
    var connection = connectionList.connections[0];
    console.log('connection available: ' + connection.id + '@' + connection.state);

    connection.addEventListener('message', function(e) {
      var command = JSON.parse(e.data);
      console.log('incomming message: ' + e.data);
      handleCommand(command.imgSrc);
    });
  });
/*
  window.onCommand = function(command) {
    handleCommand(command.imgSrc);
  };

  window.opener.dispatchEvent(new CustomEvent('receiver-loaded'));
*/
});

})();
