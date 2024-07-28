import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const App = () => {
  const initial = Array(9).fill(null);
  const [squares, setSquares] = useState(initial);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handlePress = (index: number) => {
    if (squares[index] || winner) return; // Prevent moves on occupied squares or if the game is over
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
    checkWinner(newSquares);
  };

  const checkWinner = (newSquares: any) => {
    const winningPatterns = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal from top-left to bottom-right
      [2, 4, 6], // diagonal from top-right to bottom-left
    ];

    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (
        newSquares[a] &&
        newSquares[a] === newSquares[b] &&
        newSquares[a] === newSquares[c]
      ) {
        setWinner(newSquares[a]);
        return;
      }
    }
  };

  const resetGame = () => {
    setSquares(initial);
    setWinner(null);
    setIsXNext(true);
  };

  return (
    <View style={styles.root}>
      {Array.from({length: 3}, (_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {Array.from({length: 3}, (_, colIndex) => {
            const index = rowIndex * 3 + colIndex;
            return (
              <Pressable
                key={index}
                style={styles.square}
                onPress={() => handlePress(index)}>
                <Text style={styles.iconText}>{squares[index]}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}
      {winner && <Text style={styles.winnerText}>Win {winner}!</Text>}
      <Pressable onPress={resetGame} style={styles.button}>
        <Text style={{color: 'white', fontSize: 25}}>Reset</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#ea710e',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  square: {
    borderWidth: 3,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  winnerText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginVertical: 20,
  },
  button: {
    marginTop: 10,
    padding: 10,
    marginHorizontal: 40,
    alignItems: 'center',
    backgroundColor: '#34cd16',
  },
});

export default App;
