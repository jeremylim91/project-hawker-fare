import React from 'react';

export default function PersonDropdown({ infoMasterList }) {
  const { people } = infoMasterList;
  let dropDownList = null;
  // if list is not empty, surround each person with html option tags
  if (people.length > 0) {
    dropDownList = people.map((person) => (
      <option>{person}</option>
    ));
  }

  return (
    <div>
      <select>
        {dropDownList}
      </select>
    </div>
  );
}
