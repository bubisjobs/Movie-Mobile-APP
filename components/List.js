import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Card from "./Card";

class List extends React.PureComponent {
  render() {
    const { navigation, title, content } = this.props;

    return (
      <View>
        <View style={styles.text}>
          <Text>{title}</Text>
        </View>
        <View style={styles.list}>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({ item }) => (
              <Card navigation={navigation} item={item} />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 100,
    fontWeight: "bold",
    padding: 20,
    marginTop: 20,
  },
  list: {
    marginTop: 25,
  },
});

export default List;
