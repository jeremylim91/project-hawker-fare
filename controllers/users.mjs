import authFns from '../src/helperFns/authFns.mjs';

// initialize salt as a global constant
const { SALT } = process.env;

export default function initUsersController(db) {
  console.log('initUsersController');
  const { getHashedString } = authFns;

  const verifyLogin = async (req, res) => {
    console.log('entered verifyLogin');

    // get the userName and password from the client
    try {
      const { fEmail, fPassword } = req.body;
      const userDetailsInstance = await db.User.findOne({
        where: {
          email: fEmail,
          password: getHashedString(fPassword),
        },
      });
      // manage the scenario where login credentials not legit (i.e. DB entry does not exist)
      if (userDetailsInstance === null) {
        res.send('login failed');
        return;
      }
      // At this point, assume login credentials are legit
      // manage scenario where login credentials are legit
      /* step 1: create a hashed string out of the user's Id+SALT
    step 2: set the above as a cookie stored in the client browser
    step 3: set the user's Id as a cookie in the client's browswer */
      // step 1:
      const hashedCookieString = getHashedString(`${userDetailsInstance.id}-${SALT}`);
      // step 2:
      res.cookie('loggedInHash', hashedCookieString);
      // step 3:
      res.cookie('userId', userDetailsInstance.email);
      // step 4: set the isAdmin cookie that will be used to determine user's view
      res.cookie('isAdmin', userDetailsInstance.isAdmin);

      // send the user's email/username back to client
      res.send({ userName: userDetailsInstance.email });
    } catch (error) {
      console.log(error);
    }
  };
  const checkForExistingLogin = async (req, res) => {
    // get the user's credentials from the DOM
    const { userEmailFromCookies, hashedUserPasswordFromCookies } = req.body;
    try {
      const userInstance = await db.User.findOne({
        where: {
          email: userEmailFromCookies,
        },
      });
        // if user instance does not exist, notify the client that the user is not logged in
      if (userInstance === null) {
        res.send({ outcome: false });
        return;
      }
      // userInstance === null ? res.send({ outcome: false }) : '';
      const { id, email, isAdmin } = userInstance.dataValues;

      // if there is such an user existence, check that the hashed form of the id+ salt match
      const hashedIdFromUserInstance = getHashedString(`${id}-${SALT}`);

      if (hashedIdFromUserInstance === hashedUserPasswordFromCookies) {
        res.send({
          outcome: true,
          userEmail: email,
          isAdmin,
        });
      }

      else {
        res.send({ outcome: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    verifyLogin, checkForExistingLogin,
  };
}
