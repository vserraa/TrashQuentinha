function post_new_user(email, uid, callback) {
  var http = new XMLHttpRequest();
  const url = "http://127.0.0.1:3000/registrarUsuario?uid=" + uid + "&email = " + email;
  http.open("POST", url);
  http.send();
  console.log("aqui caralho" + email + uid);
  http.onreadystatechange = function() { 
    console.log(this.readyState);
    console.log(this.status);
    if(this.readyState == 4 && this.status == 200)
      callback(http.responseText);
  } 
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user = firebase.auth().currentUser;
    if(user != null) {
      console.log(user.email);
      post_new_user(user.email, user.uid, function() {
        console.log("in callback");
        window.location.href = "index.html";
      });
    }
  }
});

function register() {
	
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
}