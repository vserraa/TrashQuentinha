function depositar_quentinha() {
    var user = firebase.auth().currentUser;
    var api = new ApiHTTP();
    api.post_quentinha(user.uid, function() {
        window.location.reload();
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("logout_div").style.display = "block";
        var user = firebase.auth().currentUser;
        if(user != null) {
            var email_id = user.email;
            document.getElementById("cur_user").innerHTML = "Olá, " + email_id;  
            var uid = user.uid;
            var api = new ApiHTTP();
            api.get_total_quentinhas(uid, function(res) {
                document.getElementById("total_quentinhas").innerHTML = "Você reciclou " + res['ans'] + " quentinhas até o momento.";
            });
        }
    } 
});

function logout() {
    firebase.auth().signOut().then( function() {
        window.location.href = "index.html";
    });
}
