import React, { Component } from "react";
import {
	View, StyleSheet, Text, ScrollView, TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";

class Profile extends Component {
	static displayName = "Profile"; // Helps when debugging

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>Profile</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		flex: 0.25,
		alignItems: "center",
		justifyContent: "center",
	},
	titleText: {
		fontSize: 42,
		fontWeight: "bold",
		color: "#000066",
	},
});

export default Profile;
