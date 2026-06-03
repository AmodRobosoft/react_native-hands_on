import PrimaryButton from '@/components/PrimaryButton';
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const GameOverScreen = ({ onStartNewGame }: { onStartNewGame: () => void }) => {
  return (
    <View style={styles.container}>
      <View style={styles.Innercontainer}>
        <Text style={styles.text}>Game Over Screen</Text>
        <PrimaryButton btnText="New Game" onPress={onStartNewGame} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  Innercontainer: {
    padding: 20,
    gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#f2c94dff',
         margin: 20,
         borderRadius: 10,
         elevation: 30
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  }
})


export default GameOverScreen