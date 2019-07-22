import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";

import { iconsLoaded, iconsMap } from "../../AppIcons";
import { ScreenIds } from "../../screens";

class AppStarter extends Component {
	static displayName = "AppStarter"; // Helps when debugging

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.startApp();
	}

	startApp = async () => {
		await iconsLoaded();

		Navigation.setRoot({
			root: {
				bottomTabs: {
					id: "Main",
					children: [
						{
							component: {
								id: ScreenIds.Player,
								name: ScreenIds.Player,
								options: {
									bottomTab: {
										text: "Player",
										icon: iconsMap.play,
										iconColor: "#009999",
										// fontSize: 18,
										textColor: "#009999",
									},
								},
							},
						},

						{
							component: {
								id: ScreenIds.Record,
								name: ScreenIds.Record,
								options: {
									bottomTab: {
										text: "Record",
										icon: iconsMap.microphone,
										iconColor: "#009999",
										// fontSize: 18,
										textColor: "#009999",
									},
								},
							},
						},

						{
							component: {
								id: ScreenIds.Profile,
								name: ScreenIds.Profile,
								options: {
									bottomTab: {
										text: "Profile",
										icon: iconsMap.user,
										iconColor: "#009999",
										// fontSize: 18,
										textColor: "#009999",
									},
								},
							},
						},
					],
					options: {
						bottomTabs: {
							visible: true,
							currentTabIndex: 0,
							backgroundColor: "white",
						},
					},
				},
			},
		});
	};

	render() {
		return <View style={styles.container} />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default AppStarter;
