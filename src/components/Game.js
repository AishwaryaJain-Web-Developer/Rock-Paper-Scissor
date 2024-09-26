import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Fade, Grow, TextField, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

const GameContainer = styled(Box)({
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWeskYq2rWpBoINeLcmVlIvGiS1uOPzsYwtw&s")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  padding: '20px',
});

const ContentWrapper = styled(Box)({
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  padding: '40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '800px',
  width: '100%',
});

const FrontPage = styled(Paper)({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  padding: '40px',
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '500px',
  width: '100%',
});

const ScoreBox = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  padding: '20px 40px',
  borderRadius: '15px',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '20px 0',
});

const ChoicesContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '30px',
});

const CircleButton = styled(motion.button)(({ color }) => ({
  width: 150,
  height: 150,
  borderRadius: '50%',
  margin: '0 20px',
  backgroundColor: color,
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '64px',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
  },
}));

const ResultContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '30px',
});

const StyledTextField = styled(TextField)({
  margin: '10px 0',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ffa943',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
});

const choices = [
  { name: 'Rock', icon: '✊', color: '#dc0a2d' },
  { name: 'Paper', icon: '✋', color: '#ffa943' },
  { name: 'Scissors', icon: '✌️', color: '#5671f5' },
];

const Game = () => {
  const [gameMode, setGameMode] = useState(null);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  useEffect(() => {
    if (player1Choice && player2Choice) {
      const outcome = determineWinner(player1Choice, player2Choice);
      if (outcome === 'player1') {
        setScore(prevScore => ({ ...prevScore, player1: prevScore.player1 + 1 }));
        setResult(`${player1Name} wins!`);
      } else if (outcome === 'player2') {
        setScore(prevScore => ({ ...prevScore, player2: prevScore.player2 + 1 }));
        setResult(gameMode === 'computer' ? 'Computer wins!' : `${player2Name} wins!`);
      } else {
        setResult('It\'s a draw!');
      }
      setShowResult(true);
    }
  }, [player1Choice, player2Choice, gameMode, player1Name, player2Name]);

  const handleChoice = (choice) => {
    if (currentPlayer === 1) {
      setPlayer1Choice(choice);
      if (gameMode === 'computer') {
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        setPlayer2Choice(computerChoice);
      } else {
        setCurrentPlayer(2);
      }
    } else {
      setPlayer2Choice(choice);
    }
  };

  const determineWinner = (player1, player2) => {
    if (player1.name === player2.name) return 'draw';
    if (
      (player1.name === 'Rock' && player2.name === 'Scissors') ||
      (player1.name === 'Paper' && player2.name === 'Rock') ||
      (player1.name === 'Scissors' && player2.name === 'Paper')
    ) {
      return 'player1';
    }
    return 'player2';
  };

  const resetGame = () => {
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setShowResult(false);
    setCurrentPlayer(1);
  };

  const startNewGame = () => {
    setScore({ player1: 0, player2: 0 });
    resetGame();
    setGameMode(null);
    setPlayer1Name('');
    setPlayer2Name('');
  };

  if (!gameMode) {
    return (
      <GameContainer>
        <FrontPage elevation={3}>
          <Typography variant="h2" fontWeight="bold" gutterBottom style={{ color: '#ffa943' }}>
            Rock Paper Scissors
          </Typography>
          <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', color: 'rgba(255, 255, 255, 0.7)' }}>
            Choose your game mode
          </Typography>
          <StyledTextField
            label="Player 1 Name"
            variant="outlined"
            fullWidth
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setGameMode('computer')} 
            style={{margin: '20px 0', padding: '10px 20px', fontSize: '18px'}}
            fullWidth
          >
            Play against Computer
          </Button>
          <StyledTextField
            label="Player 2 Name"
            variant="outlined"
            fullWidth
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => setGameMode('player')} 
            style={{margin: '20px 0', padding: '10px 20px', fontSize: '18px'}}
            fullWidth
          >
            Play against Player
          </Button>
        </FrontPage>
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <ContentWrapper>
        <Typography variant="h3" fontWeight="bold" style={{ marginBottom: '20px', color: '#ffa943' }}>
          ROCK PAPER SCISSORS
        </Typography>
        
        <ScoreBox>
          <Typography variant="h4" fontWeight="bold" gutterBottom>SCORE</Typography>
          <Typography variant="h5">{player1Name}: {score.player1}</Typography>
          <Typography variant="h5">{gameMode === 'computer' ? 'Computer' : player2Name}: {score.player2}</Typography>
        </ScoreBox>

        {!showResult ? (
          <ChoicesContainer>
            <Typography variant="h5" gutterBottom style={{ marginBottom: '20px' }}>
              {currentPlayer === 1 ? player1Name : (gameMode === 'computer' ? 'Computer' : player2Name)}, make your choice:
            </Typography>
            <Box display="flex" justifyContent="center">
              {choices.map((choice) => (
                <CircleButton
                  key={choice.name}
                  color={choice.color}
                  onClick={() => handleChoice(choice)}
                  whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(255, 255, 255, 0.7)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {choice.icon}
                </CircleButton>
              ))}
            </Box>
          </ChoicesContainer>
        ) : (
          <ResultContainer>
            <Grow in={true} timeout={1000}>
              <Box display="flex" justifyContent="space-around" width="100%" marginBottom="20px">
                <Box textAlign="center">
                  <Typography variant="h6">{player1Name}</Typography>
                  <CircleButton color={player1Choice.color} style={{ cursor: 'default' }}>
                    {player1Choice.icon}
                  </CircleButton>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h6">{gameMode === 'computer' ? 'Computer' : player2Name}</Typography>
                  <CircleButton color={player2Choice.color} style={{ cursor: 'default' }}>
                    {player2Choice.icon}
                  </CircleButton>
                </Box>
              </Box>
            </Grow>
            <Fade in={showResult} timeout={500}>
              <Typography variant="h3" fontWeight="bold" style={{ marginBottom: '20px', color: '#ffa943' }}>
                {result}
              </Typography>
            </Fade>
            <Button variant="contained" color="primary" onClick={resetGame} style={{margin: '10px', padding: '10px 20px'}}>
              Next Round
            </Button>
            <Button variant="outlined" color="secondary" onClick={startNewGame} style={{margin: '10px', padding: '10px 20px'}}>
              New Game
            </Button>
          </ResultContainer>
        )}
      </ContentWrapper>
    </GameContainer>
  );
};

export default Game;