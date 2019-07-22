/* import/prefer-default-export */
import { Navigation } from "react-native-navigation";

// Starter
import AppStarter from "./modules/starter/AppStarter";

// Main Screens
import Record from "./modules/record/Record";
import Player from "./modules/player/Player";
import Profile from "./modules/profile/Profile";

const screenPrefix = "soundcheck.app";
export const ScreenIds = {
	Starter: `${screenPrefix}.Starter`,
	Record: `${screenPrefix}.Record`,
	Player: `${screenPrefix}.Player`,
	Profile: `${screenPrefix}.Profile`,
};

export default function registerScreens() {
	Navigation.registerComponent(ScreenIds.Starter, () => AppStarter);
	Navigation.registerComponent(ScreenIds.Record, () => Record);
	Navigation.registerComponent(ScreenIds.Player, () => Player);
	Navigation.registerComponent(ScreenIds.Profile, () => Profile);
}
