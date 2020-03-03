/*const query = {
  name: "",
  text: ``,
  values: []
  return query
}*/

const GetSpotList = async user => {
  const query = {
    name: "get-spotlist",
    text: `SELECT spot_id, spot_title, spot_images, spot_type, distance, latitude, longitude
    FROM (
        SELECT *,
            (6371 * acos( cos( radians($1) ) * cos( radians( spots.latitude ) )
            * cos( radians( spots.longitude ) - radians($2) )
            + sin( radians($1) ) * sin( radians( spots.latitude ) ) ) ) AS distance
        FROM (
          SELECT *
          FROM spots
          left join spot_types on spot_types.spot_type_id = spots.spot_id
            ) AS spots
        ) sub
    WHERE distance <= $3
    ORDER BY distance asc`,
    values: [user.latitude, user.longitude, user.distance]
  };
  return query;
};

// IMPORTANT -- add saved as boolean field.

module.exports = {
  GetSpotList
};
