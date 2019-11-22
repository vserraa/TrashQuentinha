const assert = chai.assert;

describe('ApiHTTP', function() {
	this.timeout(10000);

	it('Testando recuperação do numero de qunetinhas de um usuario: ', function(done) {
		var api = new ApiHTTP();
		var uid = "PMFnUVFUKxdqpUjrQxos2TYuyKz2";
		api.get_total_quentinhas(uid, function(res) {
			assert.equal(isNaN(res['ans']), false);
			done();
		})
	});

	it('Testando deposito de quentinha :', function(done) {
		var api = new ApiHTTP();
		var uid = "PMFnUVFUKxdqpUjrQxos2TYuyKz2";
		var valor_inicial = null;
		var valor_final = null;
		api.get_total_quentinhas(uid, function(res) {
			valor_inicial = res['ans'];
			api.post_quentinha(uid, function() {
				api.get_total_quentinhas(uid, function(res2) {
					valor_final = res2['ans'];
					console.log(valor_final);
					console.log(valor_inicial);
					assert.equal(valor_final, valor_inicial+1);
					done();
				});
			});
		});
	});
	
	it('Teste: registrando usuario teste@cin.ufpe.br', function(done) {
		var api = new ApiHTTP();
		var uid = "123456789";
		var email = "teste@cin.ufpe.br";
		api.post_new_user(email, uid, function() {
			api.get_total_quentinhas(uid, function(res) {
				var valor = res['ans'];
				api.post_delete_user(uid, function () {
					assert.equal(isNaN(valor), false);
					done();
				});
			});
		})
	})
});
