"use-strict";
const spotData = require("../../../dummyData/SpotDataDummy.json");
const SpotList = (app, admin) => {
  app.post("/spotlist", async (req, res) => {
    const { latitude, longitude, idToken } = req.body;
    try {
      res.status(200).json(spotData);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  });
};

module.exports = SpotList;
