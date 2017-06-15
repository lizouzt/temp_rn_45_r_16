import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    View,
    Text,
    StyleSheet,
    Button,
    Dimensions,
} from 'react-native';

export default class Supplier extends Component {
    render() {
        const {spData} = this.props;
        return (
            <View style={styles.id_spl}>
                <Icon
                    style={{
                        left: 12,
                        position: 'absolute',
                        top: 12,
                    }}
                    name="shopping-bag"
                    backgroundColor="#3b5998" 
                    color="#ccc"
                    size={22}
                    onPress={()=> console.log('xasdasd')}>
                </Icon>
                <Text style={styles.spl_n}>{spData.sp_name}</Text>
                
                <View style={styles.spl_c}>
                	<Button style={[styles.spl_btn]} title="联系卖家" color="#aaa" onPress={this._callSp}/>
                	<Button style={styles.spl_btn} title="进店逛逛" color="#aaa" onPress={this._goStore}/>
                </View>
            </View>
        );
    }

    _callSp () {

    }

    _goStore () {

    }
}

const styles = StyleSheet.create({
    id_spl: {
        backgroundColor: '#fff',
        borderColor: '#e0e0e0',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        marginTop: 12,
        padding: 12,
        position: 'relative'
    },
    spl_n: {
        height: 22,
        lineHeight: 22,
        marginBottom: 6,
        marginLeft: 44
    },
    spl_c: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: (Dimensions.get('window').width - 12 - 12),
    }
});