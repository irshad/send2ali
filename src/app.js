AWS.config.region = 'Asia-Pacific'; // 1. Enter your region

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId : 'your-IdentityPoolId' // 2. Enter your identity pool
});

AWS.config.credentials.get(function(err) {
  if (err)
    alert(err);
  console.log(AWS.config.credentials);
});

let bucketName = 'send2ali'; // Enter your bucket name
let bucket = new AWS.S3({params : {Bucket : bucketName}});

let fileChooser = document.getElementById('file-chooser');
let button = document.getElementById('upload-button');
let results = document.getElementById('results');
button.addEventListener('click', function() {
  let file = fileChooser.files[0];

  if (file) {

    results.innerHTML = '';
    let objKey = 'testing/' + file.name;
    let params = {
      Key : objKey,
      ContentType : file.type,
      Body : file,
      ACL : 'public-read'
    };

    bucket.putObject(params, function(err, data) {
      if (err) {
        results.innerHTML = 'ERROR: ' + err;
      } else {
        listObjs();
      }
    });
  } else {
    results.innerHTML = 'Nothing to upload.';
  }
}, false);

function listObjs() {
  let prefix = 'testing';
  bucket.listObjects({Prefix : prefix}, function(err, data) {
    if (err) {
      results.innerHTML = 'ERROR: ' + err;
    } else {
      let objKeys = "";
      data.Contents.forEach(function(obj) { objKeys += obj.Key + "<br>"; });
      results.innerHTML = objKeys;
    }
  });
}