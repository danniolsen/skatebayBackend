"use-strict";
const { GetSpotList, GetUploads } = require("../requests/Spots.get");
const client = require("../../../server/db/dbConnection");

const SpotList = (app, admin) => {
  // get list of spots based on users location
  app.post("/spotlist", async (req, res) => {
    const { user } = req.body; // user = user_id, latitude, longitude, idToken

    try {
      let query = await GetSpotList(user);
      client().query(query, (err, result) => {
        let queryResponse = result ? result.rows : [];
        console.log("spotlist ", queryResponse);
        res.status(200).json(queryResponse);
      });
    } catch (err) {
      console.log("in spotlist error");
      res.status(400).json([]);
    }
  });

  // get spots upoaded by user, by user id
  app.post("/getuploads", async (req, res) => {
    const { user } = req.body;
    console.log("getting uploads");
    try {
      let query = await GetUploads(user);
      client().query(query, (err, result) => {
        console.log(result);
        let queryResponse = result ? result.rows : [];
        //console.log("uploads ", queryResponse);
        res.status(200).json(queryResponse);
      });
    } catch (err) {
      console.log("in upload error");
      res.status(400).json([]);
    }
  });
};

module.exports = SpotList;
