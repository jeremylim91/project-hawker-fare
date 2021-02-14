import React, { useState } from 'react';
import axios from 'axios';
import getCookie from '../../../helperFns/get-cookie-value-by-key.mjs';
import LoginModal from './login-modal.jsx';

export default function LoginCredentialsDisplay({ changeUserEmail, userEmail, updateUserIsAdmin }) {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  // get the user's login credentials from the cookies:
  const userEmailFromCookies = decodeURIComponent(getCookie('userId'));
  const hashedUserPasswordFromCookies = decodeURIComponent(getCookie('loggedInHash'));

  // perform an axios post to see if user's credentials (stored in cookies) are in the db.
  axios.post('/checkForExistingLogin', { userEmailFromCookies, hashedUserPasswordFromCookies })
    .then(({ data }) => {
      // update the state to show if user is logged in or not (boolean)
      setUserIsLoggedIn(data.outcome);
      // if the user is logged in, update the userEmail State to reflect user's email
      if (data.outcome === true) changeUserEmail(data.userEmail);
    })
    .catch((error) => console.log(error));

  // if the user is logged in, display so. else, display nothing.
  if (userIsLoggedIn === false) {
    return (
      <>
        <LoginModal changeUserEmail={changeUserEmail} updateUserIsAdmin={updateUserIsAdmin} />
      </>
    );
  }
  return (
    <div className="login-credentials-display">
      <div>Logged in as:</div>
      <div>{userEmail}</div>
    </div>
  );
}
