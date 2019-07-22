const functions = require("firebase-functions");
const { Nuxt } = require("nuxt");
const express = require("express");
const admin = require("firebase-admin");
const app = express();

const envs = functions.config().environment;

Object.keys(envs).forEach(v => {
  process.env[`${v}`.toUpperCase()] = envs[v];
});

const defaultApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: `https://${envs.projectid}.firebaseio.com`
});

const config = {
  dev: false,
  buildDir: ".nuxt",
  build: {
    publishPath: "/assets"
  }
};
const nuxt = new Nuxt(config);
let isReady = false;
const readyPromise = nuxt
  .ready()
  .then(() => {
    isReady = true;
    return isReady;
  })
  .catch(() => {
    process.exit(1);
  });

async function handleRequest(req, res) {
  if (!isReady) {
    await readyPromise;
  }
  console.log(req);
  res.set("Cache-Control", "public, max-age=120, s-maxage=10");
  await nuxt.render(req, res);
}

app.use(handleRequest);
exports.ssr = functions.https.onRequest(app);
