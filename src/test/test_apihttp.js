const assert = chai.assert;

describe('Testes de integração : ', function() {
	this.timeout(30000);

	it('Testando se o usuário é inicializado com 0 quentinhas.', function(done) {
		var api = new ApiHTTP();
		var uid = "123456789";
		var email = "teste2@cin.ufpe.br";
		api.post_new_user(email, uid, function() {
			api.get_total_quentinhas(uid, function(res) {
				var valor = res['ans'];
				api.post_delete_user(uid, function() {
					assert.equal(valor, 0);
					done();
				}) 
			})
		})
	});

	it('Testando se o deposito de quentinha funciona corretamente.', function(done) {
		var api = new ApiHTTP();
		var uid = "123456789";
		var email = "teste2@cin.ufpe.br";
		api.post_new_user(email, uid, function() {
			api.post_quentinha(uid, function() {
				api.get_total_quentinhas(uid, function(res) {
					var valor = res['ans'];
					api.post_delete_user(uid, function() {
						assert.equal(valor, 1);
						done();
					}) 
				})
			})
		})		
	});

	it('Testando se a coleta de recompensas funciona corretamente.', function(done) {
		var api = new ApiHTTP();
		var uid = "123456789";
		var email = "teste2@cin.ufpe.br";
		api.post_new_user(email, uid, function() {
			api.post_quentinha(uid, function() {
				api.post_quentinha(uid, function() {
					api.post_quentinha(uid, function() {
						api.post_coletar_recompensa(uid, function() {
							api.get_total_quentinhas(uid, function(res) {
								var valor = res['ans'];
								api.post_delete_user(uid, function() {
									assert.equal(valor, 0);
									done();
								})
							})
						})
					})
				})
			})
		})
	});

	
});
