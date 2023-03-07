import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
//import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

class Navbar extends React.PureComponent {
  state = {};
  render() {
    const { navigation, main } = this.props;

    const navigationFunction = () => {
      navigation.goBack();
    };
    return (
      <SafeAreaView style={styles.safeArea}>
        {main ? (
          <View style={styles.mainNav}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Search");
              }}
            >
              <Icon name="search-outline" size={30} color={"#fff"} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity onPress={navigationFunction}>
              <Icon name="chevron-back" size={30} color={"#000"} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  safeArea: {
    top: 30,
  },
  logo: {
    width: 50,
    height: 50,
  },
  mainNav: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
});

export default Navbar;
