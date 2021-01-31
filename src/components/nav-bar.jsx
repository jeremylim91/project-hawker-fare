import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoginModal from './login-modal.jsx';

export default function NavBar({ categoryIdState, changeCategoryId }) {
  const [listOfCategories, setListOfCategories] = useState([]);

  useEffect(() => {
    axios.get('/getCategories')
      .then(({ data }) => {
        console.log('List of all cuisines:');
        console.log(data);
        setListOfCategories(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // category (below) is an object
  const handleChoosingOfCategory = (category) => {
    const clickedCategoryId = category.id;
    let newCategoryIdState = {};

    // if categoryIdState is null, create a dict where keys are elements in listOfCategories, and value is false
    if (categoryIdState === null) {
      listOfCategories.forEach((element) => {
        newCategoryIdState[`${element.id}`] = false;
      });

      //  for the key corresponding to the category that was clicked, toggle the value to true
      newCategoryIdState[`${clickedCategoryId}`] = true;
    } else {
      newCategoryIdState = { ...categoryIdState };
      // at this point, can assume categoryIdState is alr an obj
      // Toggle true/false depending on current state:

      // if false, set the value to true
      if (categoryIdState[`${clickedCategoryId}`] === false) {
        newCategoryIdState[`${clickedCategoryId}`] = true;
      } else if (categoryIdState[`${clickedCategoryId}`] === true) {
        newCategoryIdState[`${clickedCategoryId}`] = false;
      }
    }
    // update the state
    changeCategoryId(newCategoryIdState);
  };

  // use .map to surround each array el in a div tag
  const MakeDivsForCategories = () => listOfCategories.map((eachCategory) => {
    console.log('Inside MakeDivsForCategories');
    return (
      <button
        type="button"
        className="CategoriesDivs"
        key={eachCategory.id}
        value="hi"
        onClick={() => {
          handleChoosingOfCategory(eachCategory);
        }}
      >
        {eachCategory.name}

      </button>
    );
  });

  return (
    <div className="navBar-container">
      This is NavBar Div Element
      <MakeDivsForCategories />
      <LoginModal />
    </div>
  );
}
