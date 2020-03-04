/*
const query = {
  name: "",
  text: ``,
  values: []
}
return query;
*/
const RemoveSpot = (user, spot) => {
  const query = {
    name: "remove-spot",
    text: `INSERT INTO removed
           (spot_fk, user_fk)
           VALUES ($1, $2)`,
    values: [spot.spot_id, user.user_id]
  };
  return query;
};

module.exports = {
  RemoveSpot
};
