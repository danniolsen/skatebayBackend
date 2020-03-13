"use-strict";
const {
  GetSavedList,
  SaveSpot,
  UnsaveSpot,
  CheckSavedStatus,
  GetSaveCount
} = require("../requests/Saved");
const client = require("../../../server/db/dbConnection");

const Saved = (app, admin) => {
  // save spot
  app.post("/savespot", async (req, res) => {
    const { user, spot } = req.body; // user = user_id, idToken

    let queryCheck = await CheckSavedStatus(user, spot);
    let querySave = await SaveSpot(user, spot);
    let queryUnsafe = await UnsaveSpot(user, spot);
    client()
      .query(queryCheck)
      .then(savedStatus => {
        let status = savedStatus.rows[0].count;
        if (status === "0") {
          client()
            .query(querySave)
            .then(saved => {
              res.status(200).json(saved);
            })
            .catch(err => {
              res.status(400).json({ msg: "Could not save spot" });
            });
        } else {
          client()
            .query(queryUnsafe)
            .then(result => {
              res.status(200).json({ msg: "spot unsaved" });
            })
            .catch(e => {
              res.status(400).json({ msg: "error while unsaving spot" });
            });
        }
      })
      .catch(e => {
        res.status(500).json({ msg: "Error while checkin saved status" });
      });
  });

  // get list of saved spots
  app.post("/savedlist", async (req, res) => {
    const { user } = req.body; // user = user_id, idToken

    let query = await GetSavedList(user);
    client()
      .query(query)
      .then(result => {
        let queryResponse = result ? result.rows : [];
        res.status(200).json(queryResponse);
      })
      .catch(e => {
        res.status(400).json({ msg: "Coulden't get list of saved spots" });
      });
  });

  // get number of times a spot has been savedlist
  app.post("/savecount", async (req, res) => {
    const { spot_id } = req.body;

    let query = await GetSaveCount(spot_id);
    client()
      .query(query)
      .then(result => {
        let queryResponse = result ? result.rows : [];
        res.status(200).json(queryResponse);
      })
      .catch(err => {
        res.status(200).json(err.stack);
      });
  });
}; // endpoint function ends

module.exports = Saved;
