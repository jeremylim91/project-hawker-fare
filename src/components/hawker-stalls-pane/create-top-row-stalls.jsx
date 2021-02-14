import React, { useState, useEffect } from 'react';
import { ReactComponent as TopRowStallIcon } from '../../icons/Svg-For-Stalls-Top-Row-2.svg';

export default function CreateTopRowStalls({ createStallsInRange }) {
  useEffect(() => {
    createStallsInRange(createStallsInRange(34, 46, <TopRowStallIcon />));
  }, []);
  return (
    <div className="topRowSection1Container stallsContainer">
      {/* Stalls w/ unit 34-46 */}

    </div>

  );
}
