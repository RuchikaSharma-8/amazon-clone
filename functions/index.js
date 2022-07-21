/* eslint-disable max-len */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51LNdY9SCqr5jNIbPZ55KuJWFzjrnlh1v2lWoy7siH0cVWjndUwPbWwLMOCUKwYfTutWyUlB0apQU3dOMwPbj45x7000zIAV0tO"
);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", function(request, response) {
  const total = request.query.total;

  console.log("Payment Request Recieved", total);

  const paymentIntent = stripe.paymentIntents.create({amount: total, currency: "inr"});

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// - Listen
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-2a2ee/us-central1/api
// async
