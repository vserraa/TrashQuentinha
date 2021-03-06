function depositar_quentinha() {
    var user = firebase.auth().currentUser;
    var api = new ApiHTTP();
    var start = new Date().getTime();
    var final = start + 10000;

    console.log(start);

    var timer = setInterval(function() {
        var now = new Date().getTime();
        var t = final-now;
        if (t >= 0) {
            var secs = Math.floor(t/1000);
            document.getElementById("timer-secs").innerHTML = "Deposite sua quentinha na nossa lixeira nos próximos " + secs + " segundos.";
        }
    }, 1000);

    setTimeout(function() {
        api.get_ultima_quentinha(function(res) {
            var val = new Date(res['ans']);
            if(val < start) {
                window.alert("Nenhuma quentinha foi depositada. Tente novamente.");
                window.location.reload();
            }
            else {
                api.post_quentinha(user.uid, function() {
                    //window.alert("Sua quentinha foi confirmada com sucesso.");
                    window.location.reload();
                });
            }
        })
    }, 10005); 
}

function coletar_recompensa() {
    var user = firebase.auth().currentUser;
    var api = new ApiHTTP();
    var uid = user.uid;
    api.get_total_quentinhas(uid, function(res) {
        var valor = res['ans'];
        if(valor < 3) {
            window.alert("Você só pode coletar recompensa após ter depositado 3 ou mais quentinhas!");
        }
        else {
            api.post_coletar_recompensa(uid, function() {
                window.alert("Enviamos um email automatico para o fornecedor da quentinha indicando seu desconto na proxima compra.");
                window.location.reload();
            });
        }
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
