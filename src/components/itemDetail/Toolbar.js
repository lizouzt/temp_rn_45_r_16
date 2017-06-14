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

		let buyItBtnAttr = {};
        let buyItBtnText = "购买";
        if (this.props.state != '已上架') {
            buyItBtnAttr.disabled = "disabled";
            buyItBtnText = this.props.state;
        }

		return (
			<View style={styles.id_toolbar}>
				<View 
					style={styles.idt_btn} 
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
		borderTopWidth: 1,
		borderColor: '#acacac',
		bottom: 0,
		display: 'flex',
		flexDirection: 'row',
		left: 0,
		zIndex: 9,
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