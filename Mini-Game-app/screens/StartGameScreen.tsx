import PrimaryButton from "@/components/PrimaryButton"
import { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native"

type propsType = { 
    onPickNumber:(num:number)=>void
}

const StartGameScreen = ({ onPickNumber}:propsType) => {
    const [enteredNumber, setEnteredNumber] = useState<string>('')
    
    function OnChangeHandler(enteredText : string) { 
        setEnteredNumber(enteredText)
    }

    function handleConfirm() { 
        const chosenNum = parseInt(enteredNumber)

        if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
            Alert.alert(
                'Invalid Number',
                'Number has to between 1 to 99',
                [{text:"Okay",style:"default",onPress:handleReset}]
            )
            return
        }
        onPickNumber(chosenNum)
    }

    function handleReset() {
      setEnteredNumber('')
    }

  return (
    <View style={styles.inputContainer}>
      <TextInput
              style={styles.input}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={OnChangeHandler}
              value={enteredNumber}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={handleReset} btnText="Reset" />
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={handleConfirm} btnText="Confirm" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
    marginTop: 100,
    backgroundColor: "#f3eeeeff",
    marginHorizontal: 24,
    borderRadius: 10,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 30,
  },
  input: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#4334e6ff",
    width: 50,
    alignItems: "center",
    color: "#131010ff",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
  },
  alertButton: {
    backgroundColor: "#4334e6ff",
  },
});

export default StartGameScreen