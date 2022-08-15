require('dotenv').config();

const compression = require('compression');
const express = require('express');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');
const app = express();

initializeApp({
  credential: cert(serviceAccount)
});

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
let yyyy = today.getFullYear();

today = dd + '-' + mm + '-' + yyyy;

const db = getFirestore();
app.use(cors())
app.use(compression());
app.use(express.json());
app.use(express.static('dist'));


//GET health check endpoint localhost:8080/api/health
app.get('/api/health', function(req, res) {
  res.status(200).send("API is okay")
});

// GET req example: {"username": "amyc1"}
app.get('/api/search/user', async function(req, res) {
  const snapshot = await db.collection('users').where("username", '==', req.body.username).get();
  if(snapshot.empty) {
    res.status(404).send({"msg": "no user found"});
  } 
  else {
    try {
      snapshot.forEach((doc) => {
        user = doc.data()
      });
      console.log("success");
      res.status(200).send({"result": user});
    } 
    catch {
      console.log("error: an unknown error has occured");
      res.status(500).send({"error": "an unknown error has occured"})
    }
  }
});

// GET Event Collections localhost:8080/api/search/event-collections
app.get('/api/search/event-collections', async function(req, res) {
  let returnedAlerts = []
  const alerts = await db.collection("event_log_collections").get()

  if(alerts.empty) {
    res.status(404).send({"msg": "no events found"});
  } 
  
  else {
    try {
      alerts.forEach((doc) => {
        returnedAlerts.push(doc.data());
      });
      console.log("success");
      res.status(200).send({"result": returnedAlerts});
    } 
    catch {
      console.log("error: an unknown error has occured");
      res.status(500).send({"error": "an unknown error has occured"})
    }
  }
});


// GET localhost:8080/api/alerting/saved-alerts
app.get('/api/alerting/saved-alerts', async function(req, res) {
  let returnedAlerts = []
  const alerts = await db.collection("alerts").get()

  if(alerts.empty) {
    res.status(404).send({"msg": "no alerts found"});
  } 
  
  else {
    try {
      alerts.forEach((doc) => {
        returnedAlerts.push(doc.data());
      });
      console.log("success");
      res.status(200).send({"result": returnedAlerts});
    } 
    catch {
      console.log("error: an unknown error has occured");
      res.status(500).send({"error": "an unknown error has occured"})
    }
  }
});

// GET localhost:8080/api/alerting/triggered-alerts
app.get('/api/alerting/triggered-alerts', async function(req, res) {
  let returnedAlerts = []
  const alerts = await db.collection("triggered_alerts").get()

  if(alerts.empty) {
    res.status(404).send({"msg": "no triggered alerts found"});
  } 
  
  else {
    try {
      alerts.forEach((doc) => {
        returnedAlerts.push(doc.data());
      });
      console.log("success");
      res.status(200).send({"result": returnedAlerts});
    } 
    catch {
      console.log("error: an unknown error has occured");
      res.status(500).send({"error": "an unknown error has occured"})
    }
  }
});

// GET localhost:8080/api/search/user-events, req example: {"username": "amyc1", "date": "dd-mm-yyyy"}
app.get('/api/search/user-events', async function(req, res) {
  let returnedEvents = []
  const snapshot = await db.collection(req.body.date).where("username", '==', req.body.username).get();
  if(snapshot.empty) {
    res.status(404).send({"msg": "no events found"});
  } 
  else {
    try {
      snapshot.forEach((doc) => {
        returnedEvents.push(doc.data())
      });
      console.log("success");
      res.status(200).send({"result": returnedEvents});
    } 
    catch {
      console.log("not found");
      res.status(500).send({"error": "an unknown error has occured"})
    }
  }
});


app.get('/*', function(req, res) {
  res.sendFile('index.html', { root: './dist' }), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  }
});


app.listen(8080, () => process.env.MODE === "dev" ? console.log("Server listening on port 8080! \nClient running on port 8081!") : console.log("App running on port 8080"))
