var storage = firebase.storage();
var storageRef = storage.ref();

/*function uploadFile(){
  var prefix = "data:image/jpeg;base64,";
  //var file = $('#imageAttachments').attr('src');
  var file = "file:///storage/emulated/0/Android/data/com.adobe.phonegap.app/cache/1556313319976.jpg"
  console.log(file.substr(0,50));
  storageRef.put(file).then(function(snapshot){
    console.log('Uploaded!');
  })
}*/

function baseName(str)
{
   var base = new String(str).substring(str.lastIndexOf('/') + 1);
   return base;
 }

function uploadFile(){
var imageData = $('#imageAttachments').attr('src');
var imagebaseName = baseName(imageData);
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
        var uploadTask = storageRef.child('images/'+imagebaseName).put(fileObject);

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

//$('#add_entry').click(uploadFile)
