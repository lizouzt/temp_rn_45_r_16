import React, {Component} from 'react';

import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

export default class Notice extends Component {
    render() {
        if (this.props.need) {
	        return (
	            <View style={styles.id_notice}>
	                <Text style={{
	                	color: '#f9930f',
						flex: 1,
						height: 22,
						textAlign: 'center'
	                }}>咕咚商城 品质承诺</Text>
	                <View style={{
						flex: 1,
						flexDirection: 'row',
						height: 22,
						marginTop: 6
	                }}>
	                	<Text style={styles.id_tip}>正品保证</Text>
	                	<Text style={styles.id_tip}>极速发货</Text>
	                	<Text style={styles.id_tip}>七天包退</Text>
	                	<Text style={styles.id_tip}>电话客服</Text>
	                </View>
	            </View>
	        );
	    } else {
	    	return (
	    		<View></View>
	    	)
	    }
    }
}

const styles = StyleSheet.create({
	id_notice: {
		backgroundColor: '#f0f0f0',
		borderColor: '#e0e0e0',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		padding: 12
	},
	id_tip: {
		color: '#aaa',
		flex: 1,
		alignItems: 'center',
	}
})