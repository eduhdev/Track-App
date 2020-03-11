import React from "react";
import Spacer from "./Spacer";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { withNavigation } from "react-navigation";

const NavLink = ({ text, routeName, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
    <Spacer>
      <Text style={styles.link}>{text}</Text>
    </Spacer>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  link: {
    color: "blue"
  }
});

export default withNavigation(NavLink);
