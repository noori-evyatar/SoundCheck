import React, { Component } from "react";
import {
	View, StyleSheet, Text, TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import Sound from "react-native-sound";

class Player extends Component {
	static displayName = "Player"; // Helps when debugging

	constructor(props) {
		super(props);

		this.audioRecorderPlayer = new AudioRecorderPlayer();
		this.state = {
			playing: false,
			currentPositionSec: 0,
			currentDurationSec: 0,
			playTime: "00:00:00",
			duration: "00:00:00",
		};
	}

	_onPressTurtleButton =  () => {
		// Import the react-native-sound module
		var Sound = require('react-native-sound');

		// Enable playback in silence mode
		Sound.setCategory('Playback');

		// Load the sound file 'whoosh.mp3' from the app bundle
		// See notes below about preloading sounds within initialization code below.
		var whoosh = new Sound('sdcard/sound.mp4', Sound.MAIN_BUNDLE, (error) => {
  			if (error) {
    		console.log('failed to load the sound', error);
    		return;
  		}
 		 // loaded successfully
  		console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

  			// Play the sound with an onEnd callback
  			whoosh.play((success) => {
    		if (success) {
      		console.log('successfully finished playing');
			} 
			else 
			{
      		console.log('playback failed due to audio decoding errors');
    		}
  		});
		});
	};

	_onPressPlayButton = async () => {
		this.setState({
			playing: true,
		});
		console.log("onStartPlay");

		if (this.state.playing) {
			this._onPausePlay(
				this.setState({
					playing: false,
				})
			);
		} else {
			const msgPlaying = await this.audioRecorderPlayer.startPlayer();
			console.log(msgPlaying);

			this.audioRecorderPlayer.addPlayBackListener(e => {
				if (e.current_position === e.duration) {
					console.log("finished");
					this.audioRecorderPlayer.stopPlayer();
					this.setState({
						playing: false,
					});
				}

				this.setState({
					currentPositionSec: e.current_position,
					currentDurationSec: e.duration,
					playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
					duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
				});
			});
		}
	};

	_onPausePlay = async () => {
		await this.audioRecorderPlayer.pausePlayer();
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>Player</Text>
				</View>

				<View style={styles.optionButtonContainerView}>
					<TouchableOpacity style={[styles.optionPlayerButton, styles.button1]} onPress={this._onPressTurtleButton}>
						<FontAwesome5Pro name="turtle" color="#000066" size={30} />
					</TouchableOpacity>
					<TouchableOpacity style={[styles.optionPlayerButton, styles.button2]} onPress={this._onPress}>
						<FontAwesome5Pro name="rabbit-fast" color="#000066" size={30} />
					</TouchableOpacity>
				</View>

				<View style={styles.optionButtonContainerView}>
					<TouchableOpacity style={[styles.optionPlayerButton, styles.button3]} onPress={this._onPress}>
						<FontAwesome5Pro name="cow" color="#000066" size={30} />
					</TouchableOpacity>

					<TouchableOpacity style={[styles.optionPlayerButton, styles.button4]} onPress={this._onPressPlayButton}>
						<FontAwesome5Pro name="dove" color={this.state.playing ? "#ecf0f1" : "#000066"} size={30} />
					</TouchableOpacity>
				</View>

				<View style={styles.stopContainer}>
					<Text>{this.state.playTime}</Text>
					<Text>{this.state.duration}</Text>
					<TouchableOpacity style={[styles.stopButton, (color = "#485a96")]} onPress={this._onPressPlayButton}>
						<Icon name={this.state.playing ? "pause" : "play"} color="#000066" size={35} light />
					</TouchableOpacity>
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
		flex: 0.35,
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
		marginTop: 20,
	},

	titleText: {
		fontSize: 45,
		fontWeight: "bold",
		color: "#000066",
	},

	playerContainer: {
		flex: 0.25,
		flexDirection: "row",
		justifyContent: "center",
	},

	playerButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#485a96",
		borderWidth: 0.5,
		borderColor: "#fff",
		height: 50,
		width: 70,
		borderRadius: 10,
		margin: 5,
	},

	titleOptionPlayer: {
		marginTop: 1,
		fontSize: 20,
		alignItems: "center",
		justifyContent: "center",
	},

	optionButtonContainerView: {
		flexDirection: "row",
		flex: 0.25,
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 40,
		margin: 50,
	},

	optionPlayerButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: '#485a96',
		borderWidth: 0.5,
		borderColor: "#fff",
		height: 80,
		width: 80,
		borderRadius: 100 / 2,
		margin: 5,
	},

	button1: {
		backgroundColor: "#33ccff",
	},

	button2: {
		backgroundColor: "#ffcc99",
	},

	button3: {
		backgroundColor: "#00cc66",
	},

	button4: {
		backgroundColor: "#cc3300",
	},

	stopContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	stopButton: {
		height: 120,
		width: 120,
		backgroundColor: "#009999",
		borderRadius: 120 / 2,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "black",
		shadowRadius: 6,
		shadowOffset: { height: 20, width: 20 },
		shadowOpacity: 1,
		elevation: 100,
	},
});

export default Player;
