import StartGameScreen from '@/screens/StartGameScreen'
import { StyleSheet, ImageBackground } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import GameScreen from '@/screens/GameScreen';
import GameOverScreen from '@/screens/GameOverScreen';
const Index = () => {
  
  const [userNumber, setUserNumber] = useState<number>()
  const [gameIsOver, setGameIsOver] = useState<boolean>(false)

  function handleGameOver() { 
    setGameIsOver(true)
  }

  function pickNumberHandler(pickedNumber:number){ 
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }

  function startNewGameHandler() { 
    setUserNumber(undefined)
    setGameIsOver(false)
  }
  
  
  let screen = <StartGameScreen onPickNumber={pickNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={handleGameOver} />;
  }

  if (gameIsOver) {
    screen = <GameOverScreen  onStartNewGame={startNewGameHandler} />;
  }

  return (
    <LinearGradient
      colors={["#b44242ff", "#e9b576ff"]}
      style={styles.rootContainer}
    >
      <ImageBackground
        style={styles.rootContainer}
        source={require('../assets/background.png')}
        resizeMode="cover"
        imageStyle={styles.imageStyle}
      >
        <SafeAreaView style={styles.rootContainer}>
            { screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex:1
  },
  imageStyle: {
    opacity:0.2
  }
})


export default Index