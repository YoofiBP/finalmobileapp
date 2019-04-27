var db = firebase.firestore();
//$('#topicButton').click(listVideos($('#anotherSelect :selected').val()));
$('#anotherSelect').change(function(){
  $('.videos').empty();
  var topic  = $('#anotherSelect :selected').text();
  db.collection("videos").where("title", "==", topic).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          $(".videos").append(doc.data().link);
          $(".videos").append(doc.data().title);
      });
  })
})

$('#add_entry').click(function(){
  var title = $('#journal_title').val();
  var content = $('#journal_post').val();
  var user = firebase.auth().currentUser;
  var imageData = $('#imageAttachments').attr('src');
  if(imageData!=undefined){
  var imagebaseName = baseName(imageData);
  console.log(imagebaseName);
  var getFileBlob = function(url, cb) {
         var xhr = new XMLHttpRequest();
         xhr.open("GET", url);
         xhr.responseType = "blob";
         xhr.addEventListener('load', function() {
             cb(xhr.response);
         });
         xhr.send();
     };

     var blobToFile = function(blob, name) {
         blob.lastModifiedDate = new Date();
         blob.name = name;
         return blob;
     };

     var getFileObject = function(filePathOrUrl, cb) {
          getFileBlob(filePathOrUrl, function(blob) {
              cb(blobToFile(blob, 'test.jpg'));
          });
      };

      getFileObject(imageData, function(fileObject) {
          var uploadTask = storageRef.child('images/'+imagebaseName).put(fileObject).then(function(snapshot){console.log("Uploaded Blob");});
          console.log("Got here");
          uploadTask.on('state_changed', function(snapshot) {
              console.log(snapshot);
          }, function(error) {
              console.log(error);
          }, function() {
              var downloadURL = uploadTask.snapshot.downloadURL;
              console.log("downloadURL" + downloadURL);
              // handle image here
          });
      });
    }
  db.collection('entries').add({
    title: $('#journal_title').val(),
    content: $('#journal_post').val(),
    userdisplayName: user.displayName
  }).then(function(docRef){
    window.location.hash = '#journal';
    window.location.reload(true);
  }).catch(function(error){
    console.log(error);
  });
})
