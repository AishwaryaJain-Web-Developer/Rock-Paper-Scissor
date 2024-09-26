// src/components/Score.js
import React from 'react';

const Score = ({ userScore, computerScore }) => {
  return (
    <div>
      <h3>Your Score: {userScore}</h3>
      <h3>Computer Score: {computerScore}</h3>
    </div>
  );
};

export default Score;
