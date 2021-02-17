import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import MakeDivsForCategories from './make-divs-for-categories.jsx';
import LoginCredentialsDisplay from './login-logout/login-credentials-display.jsx';
import SuggestAmendments from './create-amendments/suggest-amendments.jsx';
import getCookie from '../../helperFns/get-cookie-value-by-key.mjs';

export default function NavBar({
  categoriesToHighlight, updateCategoriesToHighlight,
  listOfCategories, updateListOfCategories, resetAllCategoriesToHighlight, updateMode,
}) {
  const [userEmail, setUserEmail] = useState(null);
  // State on whether  user is an admin user
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  const changeUserEmail = (value) => setUserEmail(value);
  const updateUserIsAdmin = (value) => { setUserIsAdmin(value); };

  // check client's browser to see if he has cookies indicating that he is an admin
  const userStatusFromCookie = decodeURIComponent(getCookie('isAdmin'));
  // update state based on user's cookies: affects whether user sees e "view amendment" btn (below)
  useEffect(() => {
    if (userStatusFromCookie === 'true') {
      setUserIsAdmin(true);
    } else {
      setUserIsAdmin(false);
    }
  }, [userIsAdmin]);

  // query db to get a list all categories
  useEffect(() => {
    axios.get('/getCategories')
      .then(({ data }) => {
        // set update the listOfCategories state with the data
        updateListOfCategories(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClickOnViewAmendments = () => {
    updateMode('reviewSuggestedAmendments');
  };

  return (
    <div className="navBar-container">
      <button
        type="button"
        className="navbar-header removeButtonStyle"
        onClick={() => {
          updateMode('hawkerDisplay');
        }}
      >
        SERANGOON GARDEN MARKET
        {' '}

      </button>

      <MakeDivsForCategories
        listOfCategories={listOfCategories}
        categoriesToHighlight={categoriesToHighlight}
        updateCategoriesToHighlight={updateCategoriesToHighlight}
        resetAllCategoriesToHighlight={resetAllCategoriesToHighlight}
        updateMode={updateMode}
      />

      <SuggestAmendments updateMode={updateMode} />

      {userIsAdmin === true && (
        <Button
          className=" removeButtonStyle view-amendments-btn"
          onClick={handleClickOnViewAmendments}
        >
          View Amendments
        </Button>
      )}
      <LoginCredentialsDisplay
        changeUserEmail={changeUserEmail}
        userEmail={userEmail}
        updateUserIsAdmin={updateUserIsAdmin}
      />
    </div>
  );
}
