"use-strict";
const { ReportSpot } = require("../requests/Moderation");
const client = require("../../../server/db/dbConnection");

const Moderation = (app, admin) => {
  // remove spot
  app.post("/reportspot", async (req, res) => {
    const { report } = req.body;

    const queryReport = await ReportSpot(report);

    client()
      .query(queryReport)
      .then(result => {
        res.status(200).json({ msg: "Spot has been reported" });
      })
      .catch(e => {
        res.status(400).json({ msg: "Could not report spot" });
      });
  });
}; // endpoint function ends

module.exports = Moderation;

/*
spot: spot,
user: user,
reason: item.id,
*/
