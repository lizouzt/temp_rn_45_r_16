import { Navigation } from 'react-native-navigation';

import CShopApp from './App/components/CShopApp';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('rnapp.shop', () => CShopApp, store, Provider);
}