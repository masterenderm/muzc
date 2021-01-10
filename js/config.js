var firebase;

var firebaseConfig = {
    apiKey: "AIzaSyCPVl-mGke_ZG7HmW8_CK6iqjex0qD1FxQ",
    authDomain: "tsmusic-c82bd.firebaseapp.com",
    projectId: "tsmusic-c82bd",
    storageBucket: "tsmusic-c82bd.appspot.com",
    messagingSenderId: "453401966890",
    appId: "1:453401966890:web:10d7e2b32128107c140653",
    measurementId: "G-B87CPCRKC0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const fileRef = firebase.storage().ref('日文歌');

let array = [];
let file = fileRef.listAll().then(function(res) {
    res.items.forEach(function(itemRef) {
        itemRef.getDownloadURL().then(url => {
            let obj = {
                name: itemRef.name,
                url: url
            };
            array.push(obj);
        })
    });
    return array;
}).catch(function(err) {
    console.log(err) 
});

var uploader = document.getElementById('uploader');
var fileButton = document.getElementById("fileButton");

fileButton.addEventListener("change", function(e) {
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref("日文歌/" + file.name);
    var task = storageRef.put(file);
    task.on('state_changed', function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
    }, function error(err) {
    }, function complete() {
    });
});

$(function () {
    function timeout() {
        file.then(result => {
            const aplayer = new APlayer({
                container: document.getElementById('aplayer'),
                audio: result
            });
        })
    }
    setTimeout(timeout, 2000);
})