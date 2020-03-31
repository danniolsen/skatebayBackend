"use-strict";

/*template
const query = {
  name: "",
  text: ``,
  values: []
}
return query;
*/

const CheckSavedStatus = (user, spot) => {
  const query = {
    name: "",
    text: `SELECT COUNT(*) FROM saved WHERE spot_fk = $1 AND user_fk = $2`,
    values: [spot.spot_id, user.user_id]
  };
  return query;
};

const SaveSpot = (user, spot) => {
  const query = {
    name: "save-spot",
    text: `INSERT INTO saved
           (spot_fk, user_fk)
           VALUES ($1, $2)`,
    values: [spot.spot_id, user.user_id]
  };
  return query;
};

// get saved spots
const GetSavedList = user => {
  const query = {
    name: "get-saved-spots",
    text: `select *
           from saved
           left join spots on spots.spot_id = saved.spot_fk
           where saved.user_fk = $1
           order by saved.created_at desc;`,
    values: [user.user_id]
  };
  return query;
};

const UnsaveSpot = (user, spot) => {
  const query = {
    name: "unsave-spot",
    text: "DELETE FROM saved WHERE spot_fk = $1 AND user_fk = $2",
    values: [spot.spot_id, user.user_id]
  };
  return query;
};

const GetSaveCount = spot_id => {
  const query = {
    name: "get-save-count",
    text: `SELECT COUNT(*) FROM saved WHERE spot_fk = $1`,
    values: [spot_id]
  };
  return query;
};

module.exports = {
  CheckSavedStatus,
  SaveSpot,
  GetSavedList,
  UnsaveSpot,
  GetSaveCount
};
