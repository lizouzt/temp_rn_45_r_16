import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableHighlight,
} from 'react-native';

export default class Toolbar extends Component {
	state = {
		active: false
	}

	render() {
		const isActive = this.state.active ? ' active' : '';

		let buyItBtnAttr = {};
        let buyItBtnText = "购买";
        if (this.props.state != '已上架') {
            buyItBtnAttr.disabled = "disabled";
            buyItBtnText = this.props.state;
        }

		return (
			<View style={styles.id_toolbar}>
				<TouchableHighlight 
					onPress={() => {}}
					underlayColor="#f2f2f2"
					style={[styles.borderRight, styles.shopCart]}>
					<View>
						<Icon
							style={{
								padding: 10
							}}
		                    name="shopping-cart"
		                    backgroundColor="#fff"
		                    color='gold'
		                    size={22}>
		                </Icon>
					</View>
				</TouchableHighlight>
				<TouchableHighlight 
					onPress={() => {}}
					underlayColor="#f2f2f2"
					style={[styles.idt_btn, styles.borderRight]}>
					<View style={{display: 'flex', flexDirection: 'row'}}>
						<Icon style={{
								padding: 10,
								alignItems: 'center',
								justifyContent: 'center',
							}}
		                    name="user-o"
		                    backgroundColor="#fff"
		                    color='gold'
		                    size={22}>
		                </Icon>
					</View>
				</TouchableHighlight>
				<TouchableHighlight 
					onPress={() => {}}
					underlayColor="#f2f2f2"
					style={styles.id_buy} >
					<View
	                    {...buyItBtnAttr} 
	                    onTap={this.props.buyIt}>
	                    <Text style={{fontSize: 20}}>{buyItBtnText}</Text>
	                </View>
	            </TouchableHighlight>
			</View>
		)
	}

	_toggle = () => {
		this.setState({
			active: !this.state.active
		});
	}
}

const styles = StyleSheet.create({
	id_toolbar: {
		backgroundColor: '#fff',
		borderTopWidth: 0.5,
		borderColor: '#acacac',
		height: 42,
		display: 'flex',
		flexDirection: 'row',
		width: Dimensions.get('window').width,
	},
	borderRight: {
		borderColor: '#acacac',
		borderRightWidth: 0.5
	},
	shopCart: {
		alignItems: 'center',
		flex: 0.5,
		height: 42,
		justifyContent: 'center',
		width: 42,
	},
	idt_btn: {
		alignItems: 'center',
		flex: 1,
		height: 42,
		justifyContent: 'center',
		width: 80,
	},
	id_buy: {
		alignItems: 'center',
		backgroundColor: 'orange',
		flex: 1,
		height: 42,
		justifyContent: 'center',
	}
})