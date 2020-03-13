/*const query = {
  name: "",
  text: ``,
  values: []
  return query
}*/

const GetSpotList = async user => {
  const query = {
    name: "get-spotlist",
    text: `SELECT spot_id, spot_title, spot_images, spot_type, distance, latitude, longitude, spot_created_at, saved_id as saved
    FROM (
        SELECT *,
            (6371 * acos( cos( radians($1) ) * cos( radians( spots.latitude ) )
            * cos( radians( spots.longitude ) - radians($2) )
            + sin( radians($1) ) * sin( radians( spots.latitude ) ) ) ) AS distance
        FROM (
          SELECT *
          FROM spots
          left join spot_types on spot_types.spot_type_id = spots.spot_type_fk
          left join saved on saved.spot_fk = spots.spot_id and saved.user_fk = $4
          left join removed on spots.spot_id = removed.spot_fk and removed.user_fk = $4
            ) AS spots
        ) sub
    WHERE distance <= $3 and removed_id IS NULL
    ORDER BY distance asc LIMIT 20`,
    values: [user.latitude, user.longitude, user.distance, user.user_id]
  };
  return query;
};

// IMPORTANT -- add saved as boolean field.

module.exports = {
  GetSpotList
};
