import { Navigation } from 'react-native-navigation';

import Home from '../components/appHome/Home';
import ItemDetail from '../components/itemDetail/ItemDetailApp';

export const registerScreens = () => {
	Navigation.registerComponent('rnapp.ItemDetail', () => ItemDetail);
	Navigation.registerComponent('rnapp.Home', () => Home);
}