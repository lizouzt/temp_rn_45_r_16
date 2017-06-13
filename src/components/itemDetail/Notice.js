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
	                <Text>咕咚商城 品质承诺</Text>
	                <View className="clearfix">
	                	<Text>正品保证</Text>
	                	<Text>极速发货</Text>
	                	<Text>七天包退</Text>
	                	<Text>电话客服</Text>
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
		backgroundColor: '#fff'
	}
})