import React, { useState } from 'react';
import HawkerDisplay from './components/hawker-stalls-pane/hawker-display.jsx';
import NavBar from './components/navbar-pane/navbar-parent.jsx';
import ReviewSuggestedAmendments from './components/view-existing-amendments-pane/review-suggested-amendments.jsx';
// import getCookie from './helperFns/get-cookie-value-by-key.mjs';

export default function App() {
  // this is the useState responsible for filtering by cuisine
  const [categoriesToHighlight, setCategoriesToHighlight] = useState(null);
  // this useState is responsible for all the cuisines displayed in navBar
  const [listOfCategories, setListOfCategories] = useState([]);

  // useState tt determines wat is in main display (i.e. hawkerDisplay or reviewSuggestedAmendments)
  const [mode, setMode] = useState('hawkerDisplay');

  const updateListOfCategories = (value) => setListOfCategories(value);

  const updateCategoriesToHighlight = (clickedCategoryId, unselectExistingHighlightedStalls) => {
    /*= ========================================
    ^set a function that can:
    1.highlight categories(and their corresponding stalls) when user uses filter
    2. if user filters using e stallDetails modal, clear existing filters bef performing e above
    3. reset all filters
    =========================================== */

    let newCategoriesToHighlight = {};

    // if categoryIdState is null, create a dict where keys are elements in listOfCategories, and value is false
    if (categoriesToHighlight === null) {
      console.log('creating a dict with categoryIds as keys');
      listOfCategories.forEach((element) => {
        newCategoriesToHighlight[`${element.id}`] = false;
      });
      //  for the key corresponding to the category that was clicked, toggle the value to true
      newCategoriesToHighlight[`${clickedCategoryId}`] = true;
    } else {
      // at this point, can assume categoryIdState is alr an obj
      // set a new object that will be used to update the state
      newCategoriesToHighlight = { ...categoriesToHighlight };

      // if e user selected e cuisine from stallDetails modal, only highlight e corrspnding cuisine
      if (unselectExistingHighlightedStalls === true) {
        // remove all highlights
        Object.keys(newCategoriesToHighlight).forEach((element) => {
          newCategoriesToHighlight[`${element}`] = false;
        });
      }

      // Toggle true/false depending on current state:
      // if false, set the value to true
      if (categoriesToHighlight[`${clickedCategoryId}`] === false) {
        newCategoriesToHighlight[`${clickedCategoryId}`] = true;
      } else if (categoriesToHighlight[`${clickedCategoryId}`] === true) {
        newCategoriesToHighlight[`${clickedCategoryId}`] = false;
      }
    }
    setCategoriesToHighlight(newCategoriesToHighlight);
  };

  const updateMode = (value) => setMode(value);

  const resetAllCategoriesToHighlight = () => {
    // ^ Fn that resets all category filters  so that no stalls are highlighted
    const newCategoriesToHighlight = {};
    listOfCategories.forEach((element) => {
      newCategoriesToHighlight[`${element.id}`] = false;
    });
    setCategoriesToHighlight(newCategoriesToHighlight);
  };

  return (
    // <div className="main-container">
    <>
      <NavBar
        updateCategoriesToHighlight={updateCategoriesToHighlight}
        categoriesToHighlight={categoriesToHighlight}
        listOfCategories={listOfCategories}
        updateListOfCategories={updateListOfCategories}
        resetAllCategoriesToHighlight={resetAllCategoriesToHighlight}
        updateMode={updateMode}
        // updateAllAmendmentsFromDb={updateAllAmendmentsFromDb}

      />
      {(() => { switch (mode) {
        case 'hawkerDisplay':
          return (
            <HawkerDisplay
              className="mainDisplay"
              categoriesToHighlight={categoriesToHighlight}
              updateCategoriesToHighlight={updateCategoriesToHighlight}
            />
          );
        case 'reviewSuggestedAmendments':
          return (
            <ReviewSuggestedAmendments
              // allAmendmentsFromDb={allAmendmentsFromDb}
              mode={mode}
            />
          );
        default:
          return (
            null
          );
      }
      })()}
      {/* </div> */}
    </>
  );
}
