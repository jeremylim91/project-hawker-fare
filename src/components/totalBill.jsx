import React, { useEffect, useState } from 'react';

export default function TotalBill({ infoMasterList }) {
  console.log('executed TotalBill');

  console.log('infoMasterList inside TotalBill is:');
  console.log(infoMasterList);

  const localCopyOfItemDetails = [...infoMasterList.itemDetails];

  const calculateTotal = () => {
    // base case
    if (localCopyOfItemDetails.length === 0) {
      return 0;
    }
    // recursive relation
    return Number(localCopyOfItemDetails[0].price) + calculateTotal(localCopyOfItemDetails.shift());
  };

  return (
    <div>
      <h2>Total</h2>
      <p>{ infoMasterList.itemDetails.length > 0 ? calculateTotal() : ''}</p>

    </div>
  );
}
