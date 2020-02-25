"use-strict";
const { VerifyIdToken } = require("../controllers/Auth.controller.Post");

const Auth = (app, admin) => {
  // verify firebase idToeken.
  app.post("/auth", async (req, res) => {
    const { idToken } = req.body;
    try {
      const verifiedToken = await VerifyIdToken(admin, idToken);
      res.status(200).json(verifiedToken);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  });
};

module.exports = Auth;
