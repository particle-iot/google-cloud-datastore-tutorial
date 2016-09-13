# Particle > Google Cloud Pub/Sub > Datastore Tutorial

This tutorial code is intended to allow data to flow from Google Cloud
Pub/Sub to Google Cloud Datastore. This is part of a larger tutorial for
sending data from Particle devices into a hosted database.

You can find
the full documentation on the Particle <> Google Cloud integration [on
our
docs](https://docs.particle.io/tutorials/topics/google-cloud-platform/)
.

## Prerequisites
Before this script will become useful to you, please make sure you have
done all of the following:

1) Have Particle device(s) collecting data and [publishing
events](https://docs.particle.io/reference/firmware/photon/#particle-publish-)

2) Set up [Google Cloud Platform
Pub/Sub](https://docs.particle.io/tutorials/topics/google-cloud-platform/#preconfiguration-in-google-cloud-platform)

3) Enabled the [Google Cloud Platform integration on
Particle](https://docs.particle.io/tutorials/topics/google-cloud-platform/#enabling-the-integration)

4) Created a Google Cloud Platform [private key](https://docs.particle.io/tutorials/topics/google-cloud-platform/#creating-a-private-key)

5) Created a Google Cloud Pub/Sub
[subscription](https:///tutorials/topics/google-cloud-platform/#creating-a-pub-sub-subscription)

For all required steps, check out [the full
tutorial](/tutorials/topics/google-cloud-platform/#storing-data-in-a-datastore-database)

## Setup and configuration

#### Clone the repository

`git clone https://github.com/spark/google-cloud-datastore-tutorial.git`

#### Add your Private Key

Create a file in the root of your local repository called `gcp_private_key.json`:

```
touch gcp_private_key.json
```

Next, paste in the contents of your Google Cloud Platform JSON private key. It
should look something like this:

```
{
  "type": "service_account",
  "project_id": "[GOOGLE CLOUD PLATFORM PROJECT ID]",
  "private_key_id": "[PRIVATE_KEY_ID]",
  "private_key": "[PRIVATE_KEY]"
  "client_email": "[CLIENT_EMAIL]",
  "client_id": "[CLIENT_ID]",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "[CERT_URL]",
  "client_x509_cert_url": "[CLIENT_CERT_URL]"
}
```

#### Configure the Script

Open up `tutorial.js` and update the `config` object for your Google
Cloud Platform configuration:

- `gcpProjectId`: Your Google Cloud Platform Project ID
- `gcpPubSubSubscriptionName`: Your Google Cloud Platform Pub/Sub topic's subscription name


## Running the application

- Install dependencies: `npm install`
- Run the script: `node tutorial.js`
