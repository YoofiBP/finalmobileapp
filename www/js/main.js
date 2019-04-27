document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  firebase.auth().onAuthStateChanged(function(user){
    if(user){
    console.log(
      "name "+ user.displayName +"\n" + "email: " + user.email +"\n" + "photoURL: " + user.photoURL +"\n" + "emailVerified: " + user.emailVerified +"\n" + "ID: " + user.uid +"\n" + "Provider Data: " + user.providerData
    );
    $('.entries').empty();
    $('#settingsUsername').text(user.displayName);
    db.collection("entries").where("userdisplayName", "==", user.displayName).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            $(".entries").append('<h2>'+doc.data().title+'</h2>');
            $(".entries").append(doc.data().content + '<hr>');
        });
    })
  }else{
    window.location.href = '#login';
    console.log("Signed Out second");
  }
});

$('#username').hide();
$('#usernameButton').hide();
$('#profileComplete').hide();
}

function showAlert(){
  navigator.notification.alert(
    "You win!",
    function(){},
    "Title");
}

function takePicture(){
  navigator.camera.getPicture(onSuccess,onFail,{
  quality: 50,
  destinationType: Camera.DestinationType.FILE_URI,
  sourceType: Camera.PictureSourceType.CAMERA,
  encodingType: Camera.EncodingType.JPEG
});}

function pickPicture(){
  navigator.camera.getPicture(onSuccess,onFail,{
  quality: 50,
  destinationType: Camera.DestinationType.FILE_URI,
  sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
  encodingType: Camera.EncodingType.JPEG
});}

function onSuccess(imageURI){
  $('#imageAttachments').attr('src',imageURI);
  console.log(imageURI);
}

function onFail(message){
  console.log(message);
}

function checkAvailable(){
  window.plugins.speechRecognition.isRecognitionAvailable(
  function(){
    console.log("Success");
  }, function(){
    console.log("Failed");
  });
}

function pageTwo(){
  $('#sign_email').hide();
  $('#sign_password').hide();
  $('#confirm_password').hide();
  $('#signUpButton').hide();
  $('#username').show();
  $('#usernameButton').show();
}

function pageThree(){
  $('#username').hide();
  $('#usernameButton').hide();
  $('#cameraButton').show();
  $('#galleryButton').show();
  $('#profileComplete').show();
}

$("#cameraButton").click(takePicture);
$("#galleryButton").click(pickPicture);
$("#speech_to_text").click(checkAvailable);
