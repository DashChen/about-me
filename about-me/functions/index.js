const functions = require("firebase-functions");
const { Nuxt } = require("nuxt");
const express = require("express");
const admin = require("firebase-admin");
const app = express();

admin.initializeApp();

const envs = functions.config().environment;

Object.entries(envs).forEach((k, v) => {
  process.env[`${k}`.toUpperCase()] = v;
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
  res.set("Cache-Control", "public, max-age=120, s-maxage=10");
  await nuxt.render(req, res);
}
