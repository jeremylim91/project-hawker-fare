import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

export default function DropDownComponent({ stallsForDropdown, updateSelectedStall }) {
  const handleStallSelection = (index) => {
    stallsForDropdown[index];
  };

  const dropDownOptions = stallsForDropdown.map((element, index) => (
    <Dropdown.Item onClick={() => {
      updateSelectedStall(stallsForDropdown[index]);
    }}
    >
      { element.name}
    </Dropdown.Item>
  ));
  console.log('dropDownOptions are:');
  console.log(dropDownOptions);
  return (
    <DropdownButton id="dropdown-basic-button" title="Select stall">
      {dropDownOptions}
    </DropdownButton>
  );
}
