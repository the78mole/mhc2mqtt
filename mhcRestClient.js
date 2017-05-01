/**
 * 
 */

var unirest = require('unirest');
var Promise = require('promise');

var mhcRestClient = function(config) {
	
	var $this = {
			baseurl : config.url,
			restpath : config.restpath,
			_sessionId : -1,
			_reqId : Math.floor(Math.random() * (10000 + 1)),
			url : config.url + config.restpath,
			user : config.user,
			pass : config.pass,
			headers : config.headers, 
					
			login : function() {		
				$this._reqid++;
	
				var loginPromise = new Promise(function(fulfill, reject) {
					unirest.post($this.url)
						.headers($this.headers)
						.type("application/json-rpc")
						.send({ "params": [ $this.user, $this.pass ], "method" : "login", "id" : $this._reqid })
						.end(function(response) {
							var rbody = response.body;
							var tid = rbody.id;
							$this._sessionId = rbody.result.SessionId; 
							console.log("Logged in (" + tid +  ") as user " + $this.user);
							fulfill(rbody);
						});
				});
				return loginPromise;
			}
	
	};
	
	return $this;
}

module.exports = exports = mhcRestClient