"use-strict";

const VerifyIdToken = (admin, idToken) => {
  let user = {
    displayName: null,
    email: null,
    photo: null,
    uid: null,
    provider: null,
    idToken: idToken
  };

  try {
    return admin
      .auth()
      .verifyIdToken(idToken)
      .then(verifiedToken => {
        // add data to user
        user.displayName = verifiedToken.name;
        user.email = verifiedToken.email ? verifiedToken.email : null;
        user.photo = verifiedToken.picture;
        user.uid = verifiedToken.uid;
        user.provider = verifiedToken.firebase.sign_in_provider;
        return user;
      })
      .catch(error => {
        console.log("in verify catch");
        return { code: error.code, message: error.message };
      });
  } catch (tokenError) {
    console.log(" try catch, catch");
    return { code: tokenError.code, message: tokenError.message };
  }
};

module.exports = { VerifyIdToken };
