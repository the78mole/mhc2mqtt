
var fs = require("fs");
var Promise = require('promise');
var mhcRC = require("./mhcRestClient.js");

var configFile = "config.json";

//var bodyParser = require('body-parser');
//var jsonParser = bodyParser.json();

console.log("Started mhc2mqtt connector.")

// Reading config
console.log("Reading config from file " + configFile);
var config = JSON.parse(fs.readFileSync(configFile));
console.log("Config read.");

var mhcRCconf = config.mhcRestClient;

// Creating mhcRestClient Connector Instance
var mhc0 = mhcRC(mhcRCconf[0]);

var loginPromise = mhc0.login();

loginPromise.then(function(body) {
	console.log("Promise fulfilled. Body was: " + JSON.stringify(body, null, '\t'));
})

console.log("Finished mhc2mqtt connector (should not happen).");


/*
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
*/