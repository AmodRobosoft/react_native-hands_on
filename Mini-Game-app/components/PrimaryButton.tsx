import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    btnText: string;
    onPress:(param: any)=>void
};

const PrimaryButton = ({ btnText ,onPress}: Props) => {
  return (
    <View style={Styles.buttonOuterContianer}>
      <Pressable
        style={({ pressed }) => [
          Styles.buttonInnerContainer,
          pressed && Styles.pressed,
              ]}
              onPress={onPress}
      >
        <Text style={Styles.text}>{btnText}</Text>
      </Pressable>
    </View>
  );
};

const Styles = StyleSheet.create({
  buttonOuterContianer: {
    margin: 4,
    overflow: "hidden",
    borderRadius: 24,
    elevation:20
  },
  buttonInnerContainer: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#4334e6ff",
  },
  text: {
    color: "#fff",
  },
  pressed: {
    backgroundColor: "#6b0bb5ff",
  },
});

export default PrimaryButton;
