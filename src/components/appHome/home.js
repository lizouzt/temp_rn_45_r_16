import React, {Component} from 'react';
import {Container} from 'flux/utils';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {dispatch} from '../../dispatcher/utilsDispatcher';
import {HomeStore} from '../../stores/HomeStore';
import ActionTypes from '../../constants/ItemDetail';

import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

const getItemDetail = () => {
    fetch('https://xmall.codoon.com/api/mall/webmall/query_goods', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                goods_id: '156616586736897754957263',
                module: 'mall'
            })
        })
        .then((response) => response.json())
        .then((obj) => {
            dispatch({
                type: ActionTypes.ITEM_INFO_END,
                data: obj.data
            });
        })
        .catch((err) => {
            alert(err.message);
        })
}

class ItemInfo extends Component {

    static getStores() {
        return [HomeStore];
    }

    static calculateState() {
        return {
            info: HomeStore.getState(),
        }
    }

    componentWillMount () {
        
    }

    render() {
        const {today_title} = this.state.info;

        return (
            <View style={styles.id_content}>
                <ScrollView style={styles.id_wrapper}>
                    <Text>{today_title}</Text>
                    <Icon
                        style={{
                            padding: 10
                        }}
                        name="shopping-basket"
                        backgroundColor="#fff"
                        color='#123456'
                        size={36}
                        onPress={() => Actions.itemDetail({itemId: '247588891859278660616714'})}>
                    </Icon>
                </ScrollView>
            </View>
        )
    }

    _playIt = () => {
        alert('TODO::Play');
    }
}

const styles = StyleSheet.create({
    id_content: {
        backgroundColor: '#f9f9f9',
        marginTop: 20,
        height: Dimensions.get('window').height - 20
    },
    id_wrapper: {
        marginTop: 44,
        marginBottom: 10,
        height: Dimensions.get('window').height - 44 - 20
    }
})

export default Container.create(ItemInfo);

