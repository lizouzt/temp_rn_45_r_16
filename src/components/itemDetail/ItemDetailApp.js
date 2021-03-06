import React, {Component} from 'react';
import {Container} from 'flux/utils';

import {dispatch} from '../../dispatcher/utilsDispatcher';
import {ItemInfoStore} from '../../stores/ItemDetailStore';
import ActionTypes from '../../constants/ItemDetail';

import Gallery from './ItemGallery';
import Detail from './ItemDetail';
import Notice from './Notice';
import Supplier from './Supplier';
import Toolbar from './Toolbar';

import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

const getItemDetail = (itemId) => {
    fetch('https://xmall.codoon.com/api/mall/webmall/query_goods', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                goods_id: itemId,
                module: 'mall'
            })
        })
        .then((response) => response.json())
        .then((obj) => {
            if (obj.status.state == 0) {
                dispatch({
                    type: ActionTypes.ITEM_INFO_END,
                    data: obj.data
                });
            } else {
                alert(obj.status.msg);
            }
        })
        .catch((err) => {
            alert(err.message);
        })
}

class ItemInfo extends Component {

    static getStores() {
        return [ItemInfoStore];
    }

    static calculateState() {
        return {
            info: ItemInfoStore.getState(),
        };
    }

    componentWillMount () {
        dispatch({
            type: ActionTypes.UPDATE_ID,
            data: this.props.itemId
        });
    }

    componentDidMount () {
        getItemDetail(this.state.info.goods_id);
    }

    render() {
        const {ass_list} = this.state.info;

        return (
            <View style={styles.id_content}>
                <ScrollView style={styles.id_wrapper}>
                    <Gallery pics={this.state.info.pic_urls} itemId={this.state.info.goods_id}/>
                    <Detail info={this.state.info} />
                    <Notice need={this.state.info.quality_assure} />
                    <Supplier spData={this.state.info} />
                </ScrollView>
                <Toolbar buyIt={this._buyIt} state={this.state.info.state} />
            </View>
        )
    }

    _buyIt = () => {
        if (this.state.info.state != '已上架') return false;

        alert('TODO::Jump');
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
        height: Dimensions.get('window').height - 44 - 20 - 42
    }
})

export default Container.create(ItemInfo);

