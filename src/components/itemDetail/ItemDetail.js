import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

function generateSoldTip (info) {
    if (info.show_sold_all && info.sold_all_desc) {
        return (
            <View style={{}}>
                <Text>已售 </Text>
                <Text>{info.sold_all_desc}</Text>
            </View>
        )
    }
}

function generateMarketInfo (marketInfo) {
    if (marketInfo && marketInfo.coin_desc) {
        return (
            <View>
                <Text style={{
                    color: '#aaa',
                    fontSize: 10,
                    marginLeft: 12,
                }}>{marketInfo.coin_desc}</Text>
            </View>
        )
    }
}

export default class LInfo extends Component {
    state = {
        showShareTip: false
    }

    render() {
        const {info} = this.props;

        let soldTip     = generateSoldTip(info);
        let marketTip   = generateMarketInfo(info.market_info);

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.idi_name}>{info.goods_title}</Text>
                </View>
                <View style={styles.idi_price}>
                    <Text style={[styles.col_org, styles.id_pu, {fontSize: 18}]}>¥</Text>
                    <Text style={[styles.col_org, {fontSize: 18}]}>{info.goods_price}</Text>
                    {marketTip}
                </View>
                <View style={styles.idi_price}>
                    <Text style={[styles.col_gray, {fontSize: 12}]}>市场价 </Text>
                    <Text style={[styles.col_gray, styles.id_pu, {fontSize: 14}]}>¥</Text>
                    <Text style={[styles.col_gray, {fontSize: 12}]}>{info.goods_mprice}</Text>
                </View>
                <View className="idi_extra clearfix">
                    <View>
                        <Text>运费 </Text>
                        <Text>{info.goods_mail}</Text>
                    </View>
                    {soldTip}
                </View>
            </View>
        )
    }

    _toggleShare = () => {
        this.setState({
            showShareTip: !this.state.showShareTip
        });
    }
}

const styles = StyleSheet.create({
    col_gray: {
        color: '#aaa',
    },
    col_org: {
        color: '#f9930f'
    },
    container: {
        backgroundColor: '#ffffff',
        paddingTop: 10,
        paddingBottom: 6,
        paddingRight: 14,
        paddingLeft: 14,
    },
    idi_name: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 4,
        overflow: 'hidden',
    },
    idi_price: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 32,
        overflow: 'hidden',
    },
    id_pu: {
        flex: 0,
        lineHeight: 24,
        margin: 4,
        marginLeft: 0
    }
});