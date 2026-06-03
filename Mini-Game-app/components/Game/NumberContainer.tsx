import { View, Text, StyleSheet } from "react-native"

const NumberContainer = ({ number }: { number: number }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{number}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: '#f2c94dff',
        padding: 20,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    numberText: {
        color: '#f2c94dff',
        fontSize: 26    ,
        fontWeight: 'bold'
    }
})

export default NumberContainer