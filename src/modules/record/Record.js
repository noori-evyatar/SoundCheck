import React, { Component } from "react";
import {
	StyleSheet, Text, View, TouchableOpacity, Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import AudioRecorderPlayer from "react-native-audio-recorder-player";

const BUTTON_SIZE = 200;

class Record extends Component {
	static displayName = "Record"; // Helps when debugging

	constructor(props) {
		super(props);

		this.audioRecorderPlayer = new AudioRecorderPlayer();

		this.state = {
			recording: false,
			recordSecs: 0,
			recordTime: "00:00:00",
			currentPositionSec: 0,
			currentDurationSec: 0,
			playTime: "00:00:00",
			duration: "00:00:00",
			animate: new Animated.Value(0),
		};
	}

	_onPressIn = () => {
		Animated.timing(this.state.animate, {
			toValue: 2,
			duration: 300,
			useNativeDriver: true,
		}).start(() => {});
	};

	_onPressOut = () => {
		Animated.timing(this.state.animate, {
			toValue: 0,
			duration: 400,
			useNativeDriver: true,
		}).start();
	};

	_onPressRecordButton = () => {
		this.setState(
			prevState => ({
				recording: true,
			}),
			async () => {
				const result = await this.audioRecorderPlayer.startRecorder();
				this.audioRecorderPlayer.addRecordBackListener(e => {
					this.setState({
						recordSecs: e.current_position,
						recordTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
					});
				});
				console.log(result);
			}
		);
	};

	_onPressStopButton = async () => {
		const result = await this.audioRecorderPlayer.stopRecorder();
		this.audioRecorderPlayer.removeRecordBackListener();
		this.setState({
			recordSecs: 0,
			recording: false,
		});
		console.log(result);
	};

	render() {
		const scale = this.state.animate.interpolate({
			inputRange: [0, 1, 2],
			outputRange: [1, 0.75, 1.25],
		});

		return (
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>Record!</Text>
				</View>
				<View style={{ flex: 1.75, alignItems: "center", justifyContent: "center" }}>
					<TouchableOpacity
						activeOpacity={0.5}
						style={[styles.recordButton, { transform: [{ scale }], backgroundColor: this.state.recording ? "red" : "#009999" }]}
						onPressIn={this._onPressIn}
						onPressOut={this._onPressOut}
						onPress={this._onPressRecordButton}>
						<Icon name="microphone" color="#000066" size={100} />
					</TouchableOpacity>
				</View>
				<View style={styles.infoTextContainer}>
					{this.state.recording ? <Text style={styles.infoText}>Recording...</Text> : <Text style={styles.infoText}>Tap to Record</Text>}
					<Text>{this.state.recordSecs !== 0 ? this.state.recordSecs : ""}</Text>
					<Text>{this.state.recordTime}</Text>
				</View>

				<View style={styles.stopContainer}>
					{this.state.recording ? (
						<TouchableOpacity style={styles.stopButton} onPress={this._onPressStopButton}>
							<Icon name="stop" color="#000066" size={35} />
						</TouchableOpacity>
					) : null}
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
		flex: 0.75,
		alignItems: "center",
		justifyContent: "center",
	},
	titleText: {
		fontSize: 42,
		fontWeight: "bold",
		color: "#000066",
	},
	recordButton: {
		height: BUTTON_SIZE,
		width: BUTTON_SIZE,
		backgroundColor: "#009999",
		borderRadius: BUTTON_SIZE / 2,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000066",
		shadowRadius: 12,
		shadowOffset: { height: 80, width: 80 },
		shadowOpacity: 10,
		elevation: 20,
	},

	infoTextContainer: {
		flex: 0.5,
		justifyContent: "center",
		alignItems: "center",
	},

	infoText: {
		fontSize: 30,
		color: "#000066",
	},

	stopContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	stopButton: {
		height: 100,
		width: 100,
		backgroundColor: "#009999",
		borderRadius: 100 / 2,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "black",
		shadowRadius: 6,
		shadowOffset: { height: 20, width: 20 },
		shadowOpacity: 1,
		elevation: 100,
		marginBottom: 30,
	},
});

export default Record;
