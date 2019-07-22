/* eslint-disable new-cap */
import { PixelRatio } from "react-native";
import FontAwesome5, { FA5Style } from "react-native-vector-icons/FontAwesome5";

const navIconSize = __DEV__ === false && Platform.OS === "android" ? PixelRatio.getPixelSizeForLayoutSize(40) : 40; // eslint-disable-line
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
	microphone: {
		size: 22,
		color: "#000066",
	},
	play: {
		size: 22,
		color: "#000066",
	},
	user: {
		size: 22,
		color: "#000066",
	},
};

const defaultIconProvider = FontAwesome5;

const iconsMap = {};
async function iconsLoaded() {
	return new Promise(async resolve => {
		const sources = await Promise.all(
			Object.keys(icons).map(iconName => {
				// IconName--suffix--other-suffix is just the mapping name in iconsMap
				const Provider = icons[iconName].iconProvider || defaultIconProvider; // FontAwesome5
				return Provider.getImageSource(iconName.replace(replaceSuffixPattern, ""), icons[iconName].size, icons[iconName].color, FA5Style.solid);
			})
		);

		Object.keys(icons).forEach((iconName, idx) => {
			iconsMap[iconName] = sources[idx];
		});

		return resolve();
	});
}

export { iconsMap, iconsLoaded };
