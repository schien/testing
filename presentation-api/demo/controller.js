(function() {

var scope = {};

scope.picList = [
  'dog.png',
  'cat.png',
  'fox.png',
];

scope.currentIndex = 0;

function createSession() {
  console.log('create session');
//  var receiverWindow = window.open('receiver.html');

  var request = new PresentationRequest('receiver.html');

  return request.start().then(function(connection) {
    function sendCommand(command) {
      console.log('send command: ' + JSON.stringify(command));
//      receiverWindow.onCommand(command);
      connection.send(JSON.stringify(command));
    }

    var session = {
      goPrev: function() {
        console.log('session goPrev');
        if (scope.currentIndex === 0) {
          return;
        }

        sendCommand({
          imgSrc: scope.picList[--scope.currentIndex]
        });
      },

      goNext: function() {
        console.log('session goNext');
        if (scope.currentIndex === scope.picList.length - 1)  {
          return;
        }

        sendCommand({
          imgSrc: scope.picList[++scope.currentIndex]
        });
      },
    };

    return new Promise(function(resolve) {
      connection.addEventListener('connect', function() {
        sendCommand({
          imgSrc: scope.picList[scope.currentIndex]
        });

        resolve(session);
      });
    });
  });
}

function launchPresentation() {
  var session = createSession();
  return Promise.resolve(session);
}

window.addEventListener('load', function() {
  var launchBtn = document.querySelector('#launch-btn');
  launchBtn.addEventListener('click', function() {
    launchPresentation().then(function(session) {
      var prevBtn = document.querySelector('#prev-btn');
      prevBtn.addEventListener('click', function() {
        session.goPrev();
      });

      var nextBtn = document.querySelector('#next-btn');
      nextBtn.addEventListener('click', function() {
        session.goNext();
      });
    });
  });
});

})();
