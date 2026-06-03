import { StyleSheet, Text } from "react-native"

type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
    return <Text style={titleStyle.text}>{title}</Text>;
};

const titleStyle = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        borderWidth: 2,
        padding: 10,
        borderColor: '#fff',
        color: '#fff',
        borderRadius: 10,
    }
})

export default Title