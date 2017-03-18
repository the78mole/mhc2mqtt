var unirest = require('unirest');
//var bodyParser = require('body-parser');
//var jsonParser = bodyParser.json();

var mhcURL = 'http://192.168.127.20/webcom';
var mhcUser = "script";
var mhcPass = "script";
var mhcHeaders = {
	"Accept": "*/*",
	"Accept-Encoding": "gzip, deflate",
	"Accept-Language": "de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4",
	"Connection": "keep-alive",
	"X-Requested-With": "XMLHttpRequest",
	"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/55.0.2883.87 Chrome/55.0.2883.87 Safari/537.36"
};

var cid = 1234;

unirest.post(mhcURL)
	.headers(mhcHeaders)
	.type("application/json-rpc")
	.send({ "params": [ mhcUser, mhcPass ], "method" : "login", "id" : ++cid })
	.end(function (response) {
	  var mhcResult = response.body.result;
	  var sessionId = mhcResult.SessionId;
	  console.log("Session ID:" + sessionId);
	  console.log(JSON.stringify(mhcResult));

	  unirest.post(mhcURL)
		.headers(mhcHeaders)
		.type("application/json-rpc")
		.send({ "params": [ sessionId , "ConfigGeneral" ], "method" : "getVariables", "id" : ++cid })
		.end(function (responseCFGGen) {
			var cfgGen = responseCFGGen.body;

	  		console.log("ConfigGeneral (" + cid + "): OK");
			//console.log(JSON.stringify(mvd, null, "\t"));
			console.log(JSON.stringify(cfgGen));

	  unirest.post(mhcURL)
		.headers(mhcHeaders)
		.type("application/json-rpc")
		.send({ "params": [ sessionId , "ConfigMeter" ], "method" : "getVariables", "id" : ++cid })
		.end(function (responseCFG) {
			var cfg = responseCFG.body;

	  		console.log("ConfigMeter (" + cid + "): OK");
			//console.log(JSON.stringify(mvd, null, "\t"));
			console.log(JSON.stringify(cfg));

	  // Get MeterValDesc
	  unirest.post(mhcURL)
		.headers(mhcHeaders)
		.type("application/json-rpc")
		.send({ "params": [ sessionId , "MeterValDesc" ], "method" : "getVariables", "id" : ++cid })
		.end(function (responseMVD) {
			var mvd = responseMVD.body;

	  		console.log("MeterValDesc (" + cid + "): OK");
			//console.log(JSON.stringify(mvd, null, "\t"));
			console.log(JSON.stringify(mvd));

			//console.log(JSON.stringify(response2.body));
			unirest.post(mhcURL)
				.headers(mhcHeaders)
				.type("application/json-rpc")
				.send({ "params": [ sessionId , "Meter" ], "method" : "getVariables", "id" : ++cid })
				.end(function (responseMeter) {
					var meter = responseMeter.body;

					console.log("Meter (" + cid + "):");
					//console.log(JSON.stringify(meter, null, "\t"));
					console.log(JSON.stringify(meter));
					
					unirest.post(mhcURL)
						.headers(mhcHeaders)
						.type("application/json-rpc")
						.send({ "params": [ sessionId , "MeterVal" ], "method" : "getVariables", "id" : ++cid })
						.end(function (responseMVal) {
							var mval = responseMVal.body;

							console.log("MVal (" + cid + "):");
							//console.log(JSON.stringify(mval, null, "\t"));
							console.log(JSON.stringify(mval));

							unirest.post(mhcURL)
								.headers(mhcHeaders)
								.type("application/json-rpc")
								.send({ "params": [ sessionId , "Status" ], "method" : "getVariables", "id" : ++cid })
								.end(function (responseStatus) {
									var stats = responseStatus.body;

									console.log("Stats (" + cid + "):");
									//console.log(JSON.stringify(stats, null, "\t"));
									console.log(JSON.stringify(stats));

									// Logout
									unirest.post(mhcURL)
										.headers(mhcHeaders)
										.type("application/json-rpc")
										.send({ "params": [ sessionId ], "method" : "logout", "id" : ++cid })
										.end(function (responseLogout) {
											console.log("Logout (" + cid + "):");
											console.log(responseLogout.body);
									});
							});
						});
				});

		});
		});
		});

});
