"use-strict";
const { UploadSpot, FinishSpot } = require("../requests/Create.post.js");
const client = require("../../../server/db/dbConnection");

const { Storage } = require("@google-cloud/storage");

const CreateSpot = (app, admin, multer, fs) => {
  let multerstorage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./server/tempImages");
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  let upload = multer({ storage: multerstorage });
  let max = 4; // maximum images

  // endpoint for uploading images
  app.post("/uploadSpotImages", upload.array("spotimage", max), (req, res) => {
    const bucket = admin.storage().bucket(process.env.BUCKET);
    const { spot_id } = req.body;

    //fs.unlink(req.file.path, (err) =>
    const uploadFile = file => {
      return bucket.upload(file.path, {
        destination: `${spot_id}/${file.originalname}`,
        gzip: true,
        metadata: {
          cacheControl: "public, max-age=31536000"
        }
      });
    };

    const removeFile = file => {
      fs.unlink(file.path, err => {});
    };

    const uploadMultipleFiles = (fileList, spot_id) => {
      const uploads = fileList.map(uploadFile);
      //const removes = fileList.map(removeFile);  , removes
      Promise.all(uploads)
        .then(results => {
          console.log(results);
          return activateSpot(spot_id);
        })
        .catch(err => {
          return null;
        })
        .finally(fin => {
          fileList.map(removeFile);
        });
    };

    // running upload
    uploadMultipleFiles(req.files, spot_id);

    const activateSpot = async spot_id => {
      const spotActivation = await FinishSpot(spot_id);
      client()
        .query(spotActivation)
        .then(result => {
          let responseSuccess = {
            msg: "Spot added successfully",
            status: 1
          };
          res.status(200).json(responseSuccess);
        })
        .catch(e => {
          let responseError = {
            msg: "Spot could not be created",
            status: 0
          };
          res.status(400).json(responseError);
        });
    };
  }); // endpoint ends

  // creating db record
  app.post("/newspot", async (req, res) => {
    const { spot, user } = req.body;
    const query = await UploadSpot(spot, user);
    let response = {
      spot_id: null,
      status: false,
      msg: null,
      images: []
    };

    client()
      .query(query)
      .then(result => {
        let responseSuccess = Object.assign({}, response);
        responseSuccess.spot_id = result.rows[0].spot_id;
        responseSuccess.status = true;
        responseSuccess.msg = "Spot has been uploaded successfully";
        responseSuccess.images = result.rows[0].spot_images;
        res.status(200).json(responseSuccess);
      })
      .catch(e => {
        let responseError = Object.assign({}, response);
        console.log(e);
        responseError.msg = "An error has occured! try again later";
        res.status(400).json(responseError);
      });
  });
};

module.exports = CreateSpot;
