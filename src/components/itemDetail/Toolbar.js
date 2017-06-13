import React, {Component} from 'react';

import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

export default class Toolbar extends Component {
	state = {
		active: false
	}

	render() {
		const isActive = this.state.active ? ' active' : '';

		return (
			<View style={styles.id_toolbar}>
				<View className="idt_list">
					<Text>优惠券</Text>
					<Text>订单</Text>
				</View>
				<View 
					style={styles.idt_btn} 
					onPress={this._toggle}>
					<Text>我</Text>
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
		
	}
})