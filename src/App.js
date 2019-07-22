import { Navigation } from "react-native-navigation";

import registerScreens, { ScreenIds } from "./screens";

console.disableYellowBox = true; //eslint-disable-line

registerScreens();

export default async () => {
	Navigation.events().registerAppLaunchedListener(() => {
		Navigation.setRoot({
			root: {
				stack: {
					id: "Main",
					children: [
						{
							component: {
								id: ScreenIds.Starter,
								name: ScreenIds.Starter,
							},
						},
					],
				},
			},
		});
	});
};
