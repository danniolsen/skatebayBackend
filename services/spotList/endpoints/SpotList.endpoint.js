"use-strict";
const { GetSpotList, GetUploads } = require("../requests/Spots.get");
const client = require("../../../server/db/dbConnection");

const SpotList = (app, admin) => {
  // get list of spots based on users location
  app.post("/spotlist", async (req, res) => {
    const { user } = req.body; // user = user_id, latitude, longitude, idToken

    let query = await GetSpotList(user);
    client()
      .query(query)
      .then(result => {
        let queryResponse = result ? result.rows : [];
        res.status(200).json(queryResponse);
      })
      .catch(e => {
        res.status(400).json([]);
      });
  });

  // get spots upoaded by user, by user id
  app.post("/getuploads", async (req, res) => {
    const { user } = req.body;
    let query = await GetUploads(user);

    return client()
      .query(query)
      .then(result => {
        let queryResponse = result ? result.rows : [];
        res.status(200).json(queryResponse);
      })
      .catch(e => {
        res.status(400).json([]);
      });
  });
};

module.exports = SpotList;
