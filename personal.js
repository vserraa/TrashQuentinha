function get_total_quentinhas(uid, callback) {
  var http = new XMLHttpRequest();
  const url = "http://127.0.0.1:3000/totalQuentinhas?uid=" + uid;
  http.open("GET", url);
  http.send();
  http.onreadystatechange = function() { 
    if(this.readyState == 4 && this.status == 200)
      callback(JSON.parse(http.responseText));
  } 
} 

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("logout_div").style.display = "block";

    var user = firebase.auth().currentUser;

    if(user != null) {

      var email_id = user.email;
      document.getElementById("cur_user").innerHTML = "Olá, " + email_id;  
    
      var uid = user.uid;

      get_total_quentinhas(uid, function(res) {
        document.getElementById("total_quentinhas").innerHTML = "Você reciclou " + res['ans'] + " quentinhas até o momento.";
      })
    }
  } 
  else {
    // No user is signed in.
    document.getElementById("logout_div").style.display = "none";
  }
});


function logout() {
  firebase.auth().signOut().then( function() {
    window.location.href = "index.html";
  });
}
