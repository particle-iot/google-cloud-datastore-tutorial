/* CONFIGURATION */
var config = {
	gcpProjectId: '[YOUR PROJECT ID HERE]',
	gcpServiceAccountKeyFilePath: './gcp_private_key.json',
	gcpPubSubSubscriptionName: '[YOUR SUBSCRIPTION NAME HERE]'
}
/* END CONFIGURATION */

var colors = require('colors');
var util = require('util');
console.log(colors.magenta('Authenticating with Google Cloud...'))
var gcloud = require('google-cloud')({
    projectId: config.gcpProjectId,
	keyFilename: config.gcpServiceAccountKeyFilePath,
});
console.log(colors.magenta('Authentication successful!'))


var datastore = gcloud.datastore();
var pubsub = gcloud.pubsub();


var subscription = pubsub.subscription(config.gcpPubSubSubscriptionName);


function storeEvent(message) {
    var key = datastore.key('ParticleEvent');

    datastore.save({
        key: key,
        data: _createEventObjectForStorage(message)
    }, function(err) {
		if(err) {
			console.log(colors.red('There was an error storing the event'), err);
		}
		console.log(colors.green('Particle event stored in Datastore!\r\n'), _createEventObjectForStorage(message, true))
    });

};

function _createEventObjectForStorage(message, log) {
	var obj = {
		gc_pub_sub_id: message.id,
		device_id: message.attributes.device_id,
		event: message.attributes.event,
		data: message.data,
		published_at: message.attributes.published_at
	}

	if(log) {
		return colors.grey(util.inspect(obj));
	} else {
		return obj;
	}
};

subscription.on('connection', function() {
	console.log('connected');
});


subscription.on('message', function(message) {
	console.log(colors.cyan('Particle event received from Pub/Sub!\r\n'), _createEventObjectForStorage(message, true));
	// Called every time a message is received.
	// message.id = ID used to acknowledge its receival.
	// message.data = Contents of the message.
	// message.attributes = Attributes of the message.
	storeEvent(message);
	message.ack();
});


