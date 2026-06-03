import NumberContainer from '@/components/Game/NumberContainer';
import PrimaryButton from '@/components/PrimaryButton';
import Title from '@/components/Title'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'

let minBoundary = 1;
let maxBoundary = 100;

function generateRandomBetween(
  min: number,
  max: number,
  exclude: number,
): number {
  if (max - min <= 1) {
    return min;
  }

  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }

  return rndNum;
}

const GameScreen = ({ userNumber , onGameOver}: { userNumber: number; onGameOver: () => void }) => {


   minBoundary = 1;
   maxBoundary = 100;

   const initialGuess = generateRandomBetween(
     minBoundary,
     maxBoundary,
     userNumber,
   );

   const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
       onGameOver()

     }
   }, [currentGuess, userNumber, onGameOver]);

   function nextGuessHandler(direction: "lower" | "greater") {
     // User is lying
     if (
       (direction === "lower" && currentGuess < userNumber) ||
       (direction === "greater" && currentGuess > userNumber)
     ) {
       Alert.alert("Don't lie!", "You know that this is wrong...", [
         { text: "Sorry!", style: "cancel" },
       ]);
       return;
     }

     // Already guessed correctly
     if (currentGuess === userNumber) {
       return;
     }

     if (direction === "lower") {
       maxBoundary = currentGuess;
     } else {
       minBoundary = currentGuess + 1;
     }

     const newRndNumber = generateRandomBetween(
       minBoundary,
       maxBoundary,
       currentGuess,
     );

     setCurrentGuess(newRndNumber);
   }


  return (
    <View style={styles.container}>
      <Title title="Oponent Guess" />
      <NumberContainer number={currentGuess} />
      <View style={styles.mainContainer}>
        <Text style={styles.text}>Higher or Lower?</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              btnText="Lower"
              onPress={nextGuessHandler.bind(this, "lower")}
              
            />
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              btnText="Higher"
              onPress={nextGuessHandler.bind(this, "greater")}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:24
  },
  mainContainer: {
    padding: 16,
    marginTop: 24,
    backgroundColor: "#f3eeeeff",
    borderRadius: 8,
    alignItems: 'center',
    elevation: 30,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
    
  },
  buttonContainer: {
    flex: 1,
  },
  text: {
      color: '#131010ff',
      fontSize: 18,
      fontWeight: 'bold'
  }
  
})

export default GameScreen