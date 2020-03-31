/*
const query = {
  name: "",
  text: ``,
  values: []
}
return query;
*/

const UploadSpot = (spot, user) => {
  const { title, location, tags, images } = spot;
  const { user_id } = user.user;
  const { latitude, longitude } = location;

  let imgNames = [];
  images.map((img, i) => {
    let newName = `skatebay-spot-${i}.jpg`;
    imgNames.push(newName);
  });

  let newTags = [];
  tags.map((tag, i) => {
    let tagid = tag.id;
    newTags.push(tagid);
  });

  const query = {
    name: "upload-spot",
    text: `INSERT INTO spots
    (spot_title, latitude, longitude, user_fk, tags, spot_images)
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING spot_id`,
    values: [title, latitude, longitude, user_id, newTags, imgNames]
  };
  return query;
};

const FinishSpot = spot_id => {
  const query = {
    name: "fisish-spot",
    text: `update spots set pending = 'false' where spot_id = $1`,
    values: [spot_id]
  };
  return query;
};

module.exports = { UploadSpot, FinishSpot };
