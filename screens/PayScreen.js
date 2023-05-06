import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Expo } from "expo-server-sdk";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

import mpesaLogo from "../assets/safaricom-mpesa.jpg";
import { authentication } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function PayScreen({ navigation, route }) {
  const [number, setNumber] = useState("0797211187");
  const [amount, setAmount] = useState(route.params.totalAmount);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get the current user's UID
        const uid = authentication.currentUser.uid;

        // Fetch the user data from Firestore
        const userDoc = await getDoc(doc(db, "users", uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser(userData);
          setIsUserLoaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const handleNumberChange = (number) => {
    setNumber(number);
  };

  const handleAmountChange = (amount) => {
    setAmount(amount);
  };

  const handlePayNowPress = () => {
    setIsLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: number,
        amount: amount,
      }),
    };

    fetch(
      "https://fishbay-daraja-sandbox-production.up.railway.app/stk",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);

        if (user && isUserLoaded) {
          // Send a push notification with the user data
          sendPushNotification(user);
        }

        navigation.navigate("Map");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const sendPushNotification = async (user) => {
    try {
      const expoPushToken = "Gaz3FLD3ib7hq-v88QXrSZ";
      const message = {
        to: expoPushToken,
        sound: "default",
        title: "New Notification",
        body: "You have a new notification!",
        data: { someData: "goes here" },
      };

      const accessToken = await getAccessToken();
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate",
          "Accept-Language": "en-US,en;q=0.9",
          Host: "exp.host",
          Connection: "keep-alive",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.3538.110 Safari/537.36",
          "expo-token": accessToken,
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        const responseJson = await response.json();
        console.log(
          `Push notification sent successfully with ID ${responseJson.data[0].id}`
        );
      } else {
        console.log("Failed to send push notification");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAccessToken = async () => {
    try {
      const expo = new Expo();
      const accessToken = await expo.getAccessTokenAsync(
        "Gaz3FLD3ib7hq-v88QXrSZ"
      );
      console.log(accessToken);
      return accessToken;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={mpesaLogo} style={styles.logo} />

      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter number"
          keyboardType="numeric"
          value={number}
          onChangeText={handleNumberChange}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount.toString()} // convert number to string
          onChangeText={handleAmountChange}
        />
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePayNowPress}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.payButtonText}>Pay Now</Text>
        )}
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: 300,
    fontSize: 18,
  },
  payButton: {
    backgroundColor: "#218838",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  payButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  checkoutButton: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },
});
