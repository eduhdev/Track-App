import React from "react";
import { View, Text, Button } from "react-native";

const TrackListScreen = ({ navigation }) => (
  <View>
    <Text>Track List</Text>
    <Button
      title="Go to Track Detail"
      onPress={() => navigation.navigate("TrackDetail")}
    />
    <Button
      title="Return to Login Flow"
      onPress={() => navigation.navigate("loginFlow")}
    />
  </View>
);

export default TrackListScreen;
