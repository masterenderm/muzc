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