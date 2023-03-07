import { rows } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import dateFormat from "dateformat";
import StarRating from "react-native-star-rating";
import { getMovie } from "../services/services";
import PlayButton from "../components/PlayButton";

const dimensions = Dimensions.get("screen").height;

const Detail = ({ route, navigation }) => {
  const { movieDetail } = route.params;

  const [movieDetails, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const placeHolderImage = require("../assets/placeholder.jpg");

  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    getMovie(movieDetail.id).then((movieData) => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieDetail.id]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <View>
              <Image
                style={styles.image}
                source={
                  movieDetails.poster_path
                    ? {
                        uri:
                          "https://image.tmdb.org/t/p/w500" +
                          movieDetails.poster_path,
                      }
                    : placeHolderImage
                }
              />
              {/* <Text>{movieDetails.original_title}</Text> */}
            </View>
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>
                {movieDetails.original_title}
              </Text>
              {movieDetails.genres && (
                <View style={styles.genreContainer}>
                  {movieDetails.genres.map((genre) => {
                    return (
                      <Text style={styles.genreText} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                maxStars={5}
                disabled={true}
                fullStarColor={"gold"}
                starSize={30}
                rating={movieDetails && movieDetails.vote_average / 2}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {"Release Date: " +
                  dateFormat(movieDetail.release_date, "dddd, mmmm dS, yyyy")}
              </Text>
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.videoModal}></View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator />}
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: dimensions / 2,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  genreContainer: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  genreText: {
    marginRight: 10,
    marginTop: 10,
  },
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: "bold",
  },
  playButton: {
    position: "absolute",
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    color: "green",
  },
});

export default Detail;
