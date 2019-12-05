class ApiHTTP {
	constructor() {
		this.base_url = "http://127.0.0.1:3000/";
	}

	get_total_quentinhas(uid, callback) {
		var http = new XMLHttpRequest();
	  	var url = this.base_url + "totalQuentinhas?uid=" + uid;
	  	http.open("GET", url);
	  	http.send();
	  	http.onreadystatechange = function() { 
	    	if(this.readyState == 4 && this.status == 200)
	      		callback(JSON.parse(http.responseText));
	  	}
	}

	post_quentinha(uid, callback) {
		var http = new XMLHttpRequest();
		const url = this.base_url + "depositarQuentinha?uid=" + uid;
		http.open("POST", url);
		http.send();
		http.onreadystatechange = function() { 
			if(this.readyState == 4 && this.status == 200)
				callback(http.responseText);
		} 
	}

	post_new_user(email, uid, callback) {
		var http = new XMLHttpRequest();
		const url = this.base_url + "registrarUsuario?uid=" + uid + "&email = " + email;
		http.open("POST", url);
		http.send();
		http.onreadystatechange = function() { 
			if(this.readyState == 4 && this.status == 200)
				callback(http.responseText);
		} 
	}

	post_delete_user(uid, callback) {
		var http = new XMLHttpRequest();
		const url = this.base_url + "deletarUsuario?uid=" + uid;
		http.open("POST", url);
		http.send();
		http.onreadystatechange = function() { 
			if(this.readyState == 4 && this.status == 200)
				callback(http.responseText);
		} 
	}

	post_coletar_recompensa(uid, callback) {
		var http = new XMLHttpRequest();
		const url = this.base_url + "coletarRecompensa?uid=" + uid;
		http.open("POST", url);
		http.send();
		http.onreadystatechange = function() { 
			if(this.readyState == 4 && this.status == 200)
				callback(http.responseText);
		} 
	}

	get_ultima_quentinha(callback) {
		var http = new XMLHttpRequest();
	  	var url = this.base_url + "ultimaQuentinha";
	  	http.open("GET", url);
	  	http.send();
	  	http.onreadystatechange = function() { 
	    	if(this.readyState == 4 && this.status == 200)
	      		callback(JSON.parse(http.responseText));
	  	}
	}
}