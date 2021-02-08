import React from 'react';
import Button from 'react-bootstrap/Button';

// use .map to surround each array el in a div tag
export default function MakeDivsForCategories({
  listOfCategories, updateCategoriesToHighlight, resetAllCategoriesToHighlight, updateMode,
}) {
  // category (below) is an object
  const handleChoosingOfCategory = (category) => {
    const clickedCategoryId = category.id;
    // execute the function that updates the state
    updateCategoriesToHighlight(clickedCategoryId, false);
  };

  const allCategories = listOfCategories.map((eachCategory) => (
    <Button
      type="button"
      className="CategoriesDivs removeButtonStyle"
      key={eachCategory.id}
      onClick={() => {
        updateMode('hawkerDisplay');
        handleChoosingOfCategory(eachCategory);
      }}
    >
      {eachCategory.name}
    </Button>
  ));

  return (
    <div>
      <div className="cuisines-header">CUISINES</div>
      {allCategories}
      <Button
        variant="primary"
        onClick={() => {
          updateMode('hawkerDisplay');
          resetAllCategoriesToHighlight(); }}
        className="navBarButtons reset-filter-btn"
      >
        Reset filters
      </Button>
    </div>
  );
}
