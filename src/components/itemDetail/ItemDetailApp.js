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
    Text,
    StyleSheet,
} from 'react-native';

const ORDER_CONFIRM_URI =  './order-confirm.html?h_g_id={item}&h_s_id={sku}&h_count={count}';

class ItemInfo extends Component {

    static getStores() {
        return [ItemInfoStore];
    }

    static calculateState() {
        return {
            info: ItemInfoStore.getState(),
        };
    }

    render() {
        let buyItBtnAttr = {};
        let buyItBtnText = "购买";
        if (this.state.info.state != '已上架') {
            buyItBtnAttr.disabled = "disabled";
            buyItBtnText = this.state.info.state;
        }

        const {ass_list} = this.state.info;

        return (
            <View style={styles.id_content}>
                <View style={styles.id_wrapper}>
                    <Gallery pics={this.state.info.pic_urls} itemId={this.state.info.goods_id}/>
                    <Detail info={this.state.info} />
                    <Notice need={this.state.info.quality_assure} />
                    <Supplier spData={this.state.info} />
                    <Toolbar />
                    <View 
                        style={styles.id_buy} 
                        {...buyItBtnAttr} 
                        onClick={this._buyIt} 
                        onTouchMove={this._preventMove}>
                        <Text>{buyItBtnText}</Text>
                    </View>
                </View>
            </View>
        )
    }

    _preventMove = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    _buyIt = () => {
        if (this.state.info.state != '已上架') return false;

        alert('TODO::Jump');
    }
}

const styles = StyleSheet.create({
    id_content: {

    }
})

export default Container.create(ItemInfo);

