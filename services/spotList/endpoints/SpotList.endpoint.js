"use-strict";
const { GetSpotList } = require("../requests/Spots.get");
const client = require("../../../server/db/dbConnection");

const SpotList = (app, admin) => {
  app.post("/spotlist", async (req, res) => {
    const { user } = req.body; // user = user_id, latitude, longitude, idToken

    try {
      let query = await GetSpotList(user);
      client().query(query, (err, result) => {
        let queryResponse = result ? result.rows : err;
        res.status(200).json(queryResponse);
      });
    } catch (err) {
      res.status(400).json([]);
    }
  });
};

module.exports = SpotList;
