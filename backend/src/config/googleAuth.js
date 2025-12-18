const { google } = require("googleapis");

if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
  throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is missing");
}
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ["https://www.googleapis.com/auth/indexing"],
});

const indexingClient = google.indexing({
  version: "v3",
  auth,
});

module.exports = { indexingClient };
