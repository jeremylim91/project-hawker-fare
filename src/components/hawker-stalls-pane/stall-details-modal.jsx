import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ListAllMenuItems from './list-all-menu-items.jsx';

export default function StallDetailsModal({
  handleClose, handleShow, show, stallDetails, updateCategoriesToHighlight,
}) {
  const [selectedCategory, setSelectedCategory] = useState(''); // 'selectedCategory' is an obj w/ cat id and name

  // make an axios post to get the category using categoryId
  const { categoryId } = stallDetails;
  useEffect(() => { axios.post('/getCategoryUsingCategoryId', { categoryId })
    .then(({ data }) => {
      console.log('data in getCategoryUsingCategoryId is:');
      console.log(data);
      setSelectedCategory(data);
    })
    .catch((error) => console.log(error));
  }, []);
  // create a component that creates a list of menu items

  // handle the event where user clicks the cuisine from within the stall details modal
  const handleClickOnCuisine = (e) => {
    handleClose();
    console.log('selectedCategory.id is:');
    console.log(selectedCategory.id);
    updateCategoriesToHighlight(selectedCategory.id, true);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{stallDetails.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p>
                  {stallDetails.unitNum}
                </p>
              </div>

            </div>
            <div className="row">
              <div className="col-12">
                Cuisine:
                <button
                  className="removeButtonStyle"
                  type="button"
                  onClick={handleClickOnCuisine}
                >
                  {` ${selectedCategory.name}` }
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <ListAllMenuItems stallDetails={stallDetails} />
              </div>
            </div>
            <div className="row" />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
