import React from "react";
import { TouchableOpacity, StyleSheet, Image, View, Text } from "react-native";

class Card extends React.PureComponent {
  render() {
    const placeHolderImage = require("../assets/placeholder.jpg");
    const { navigation, item } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("Detail", { movieDetail: item })}
      >
        <Image
          style={styles.image}
          source={
            item.poster_path
              ? { uri: "https://image.tmdb.org/t/p/w500" + item.poster_path }
              : placeHolderImage
          }
        />

        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: "relative",
    alignItems: "center",
    height: 200,
    marginBottom: 8,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    position: "absolute",
    width: 100,
    textAlign: "center",
    top: 10,
  },
});
export default Card;
