import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
	View,
	Text,
	StyleSheet,
	Dimensions,
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
				<View style={[styles.borderRight, styles.shopCart]}>
					<Icon
						style={{
							padding: 10
						}}
	                    name="shopping-cart"
	                    backgroundColor="#fff"
	                    color='#acacac'
	                    size={22}
	                    onPress={()=> console.log('xasdas')}>
	                </Icon>
				</View>
				<View 
					style={[styles.idt_btn, styles.borderRight]} 
					onPress={this._toggle}>
					<Text style={{fontSize: 20}}>我</Text>
				</View>
				<View 
                    style={styles.id_buy} 
                    {...buyItBtnAttr} 
                    onTap={this.props.buyIt}>
                    <Text style={{fontSize: 20}}>{buyItBtnText}</Text>
                </View>
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
		flex: 0,
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