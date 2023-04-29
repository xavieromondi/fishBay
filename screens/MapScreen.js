import React, { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { db } from "../firebase";
import { authentication } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const MapScreen = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Retrieve the user's location data from Firestore
    const uid = authentication.currentUser.uid;
    const userRef = doc(db, "users", uid);

    const unsubscribe = onSnapshot(userRef, (doc) => {
      setUserLocation(doc.data());
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Display a marker at the user's location */}
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
            description="This is your current location"
          />

          {/* Display a marker at the restaurant's location */}
          <Marker
            coordinate={{
              latitude: -1.30675,
              longitude: 36.80155,
            }}
            title="Restaurant Location"
            description="This is the restaurant's location"
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
