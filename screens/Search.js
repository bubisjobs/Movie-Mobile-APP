import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Card from "../components/Card";
import Icon from "react-native-vector-icons/Ionicons";
import { searchMovieTv } from "../services/services";

const Search = ({ navigation }) => {
  const [text, onChangeText] = React.useState("");
  const [searchResults, setSearchResult] = useState();
  const [error, setError] = useState(false);

  const onSubmit = (query) => {
    searchMovieTv(query, "movie")
      .then((data) => {
        setSearchResult(data);
      })
      .catch(() => {
        setError(true);
      });
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder={"Search Movie"}
          />
        </View>
        <TouchableOpacity onPress={() => onSubmit(text)}>
          <Icon name="search-outline" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchItems}>
        {/* Searched items results */}
        {searchResults && searchResults.length > 0 && (
          <FlatList
            numColumns={3}
            data={searchResults}
            renderItem={({ item }) => (
              <Card navigation={navigation} item={item} />
            )}
            keyExtractor={(item) => item.id}
          />
        )}

        {/* When searched but no results */}
        {searchResults && searchResults.length == 0 && (
          <View style={styles.noResults}>
            <Text>No results matching your criteria.</Text>
            <Text>Try different keywords.</Text>
          </View>
        )}

        {/* When nothing is searched */}
        {!searchResults && (
          <View style={styles.empty}>
            <Text>Type something to start searching</Text>
          </View>
        )}

        {/* Error */}
        {error && <Error />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 60,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    padding: 10,
    borderRadius: 15,
    borderWidth: 0.9,
    height: 50,
    textAlign: "center",
  },
  form: {
    flexBasis: "auto",
    flexGrow: 1,
    paddingRight: 8,
  },
  searchItems: {
    padding: 5,
  },

  noResults: {
    paddingTop: 20,
  },
});
export default Search;
