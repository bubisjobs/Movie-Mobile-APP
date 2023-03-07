import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  getPopoularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentaryMovies,
} from "../services/services";
import { SliderBox } from "react-native-image-slider-box";
import List from "../components/List";
import Error from "../components/Error";

const dimensions1 = Dimensions.get("screen");
const Home = ({ navigation }) => {
  const [movieImages, setMovieImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [popularFamilyMovies, setPopularFamilyMovies] = useState([]);
  const [documentaryMovies, setDocumentaryMovies] = useState([]);

  useEffect(() => {
    //getPopoularMovies();

    getUpcomingMovies()
      .then((movies) => {
        const moviesImagesArray = [];
        movies.forEach((movie) => {
          moviesImagesArray.push(
            "https://image.tmdb.org/t/p/w500" + movie.poster_path
          );
        });
        setMovieImages(moviesImagesArray);
        setLoaded(true);
      })
      .catch((err) => {
        setError(err);
      });

    getPopoularMovies()
      .then((movies) => {
        setPopularMovies(movies);
        setLoaded(true);
      })
      .catch((err) => {
        setError(err);
      });

    getPopularTv()
      .then((movies) => {
        setPopularTv(movies);
        setLoaded(true);
      })
      .catch((err) => {
        setError(err);
      });

    getFamilyMovies()
      .then((movies) => {
        setPopularFamilyMovies(movies);
        setLoaded(true);
      })
      .catch((err) => {
        setError(err);
      });

    getDocumentaryMovies()
      .then((movies) => {
        setDocumentaryMovies(movies);
        setLoaded(true);
      })
      .catch((err) => {
        setError(err);
      });
    //  console.log(popularFamilyMovies);
  }, []);
  return (
    <React.Fragment>
      {loaded && !error && (
        <ScrollView>
          {movieImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={movieImages}
                autoplay={true}
                dotStyle={styles.sliderStyle}
                circleLoop={true}
                sliderBoxHeight={dimensions1.height / 1.5}
              />
            </View>
          )}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                title="Popular Movies"
                navigation={navigation}
                content={popularMovies}
              />
            </View>
          )}
          {popularTv && (
            <View style={styles.carousel}>
              <List
                title="Popular Tv Shows"
                navigation={navigation}
                content={popularTv}
              />
            </View>
          )}
          {popularFamilyMovies && (
            <View style={styles.carousel}>
              <List
                title="Family Movies"
                navigation={navigation}
                content={popularFamilyMovies}
              />
            </View>
          )}

          {documentaryMovies && (
            <View style={styles.carousel}>
              <List
                title="Documentary Movies"
                navigation={navigation}
                content={documentaryMovies}
              />
            </View>
          )}
        </ScrollView>
      )}

      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Home;
