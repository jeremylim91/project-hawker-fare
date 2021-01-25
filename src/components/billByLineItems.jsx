import React, { useState } from 'react';
import LineItemHeader from './lineItemHeader.jsx';
// import PersonDropdown from './personDropdown.jsx';

export default function BillByLineItems({ infoMasterList }) {
  console.log('rendering billBylIneItems.jsx');
  return (
    <div>
      <ol>
        <LineItemHeader infoMasterList={infoMasterList} />
        {/* <PersonDropdown infoMasterList={infoMasterList} /> */}
      </ol>

    </div>

  );
}
