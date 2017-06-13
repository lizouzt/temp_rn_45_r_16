import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

export default class Supplier extends Component {
    render() {
        const {spData} = this.props;
        return (
            <View style={styles.id_spl}>
                <Icon.Button 
                    name="twitter"
                    backgroundColor="#3b5998" 
                    size={22}
                    onPress={()=> console.log('xasdasd')}>
                </Icon.Button>
                <View style={styles.spl_n}>
                    <Text>{spData.sp_name}</Text>
                </View>
                <View style={styles.spl_c}>
                	<Text>联系卖家</Text>
                	<Text>进店逛逛</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    id_spl: {

    },
    spl_n: {

    },
    spl_c: {

    }
});