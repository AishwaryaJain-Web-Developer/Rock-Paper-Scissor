// src/components/Result.js
import React from 'react';

const Result = ({ userChoice, computerChoice, result }) => {
  return (
    <div>
      <h2>Your Choice: {userChoice}</h2>
      <h2>Computer's Choice: {computerChoice}</h2>
      <h2>Result: {result}</h2>
    </div>
  );
};

export default Result;
