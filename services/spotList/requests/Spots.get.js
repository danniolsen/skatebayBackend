/*const query = {
  name: "",
  text: ``,
  values: []
  return query
}*/

const GetSpotList = async user => {
  const query = {
    name: "get-spotlist",
    text: `SELECT spot_id, spot_title, spot_images, distance, latitude, tags, longitude, spot_created_at, spots_user_fk, saved_id as saved
    FROM (
        SELECT *,
            (6371 * acos( cos( radians($1) ) * cos( radians( spots.latitude ) )
            * cos( radians( spots.longitude ) - radians($2) )
            + sin( radians($1) ) * sin( radians( spots.latitude ) ) ) ) AS distance
        FROM (
          SELECT *
          FROM spots
          left join saved on saved.spot_fk = spots.spot_id and saved.user_fk = $4
          left join removed on spots.spot_id = removed.spot_fk and removed.user_fk = $4
            ) AS spots
        ) sub
    WHERE distance <= $3 and removed_id IS NULL and pending = false
    ORDER BY distance asc LIMIT 20`,
    values: [user.latitude, user.longitude, user.distance, user.user_id]
  };
  return query;
};

const GetUploads = async user => {
  const query = {
    name: "get-uploaded-spots",
    text: `select * from spots where spots_user_fk = $1 order by spot_created_at DESC`,
    values: [user.user_id]
  };
  return query;
};

module.exports = {
  GetSpotList,
  GetUploads
};
