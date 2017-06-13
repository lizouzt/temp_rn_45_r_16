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
            <View style={{

            }}>
                <View>{marketInfo.coin_desc}</View>
            </View>
        )
    }
}

function generateShareEntrance () {
    return (
        <View 
            style={styles.idi_share}
            onTouchStart={this._toggleShare}>
            <Icon.Button 
                name="facebook"
                backgroundColor="#fff"
                size={22}
                onPress={()=> console.log('xasdasd')}>
            </Icon.Button>
            <Text>分享</Text>
            <View 
                style={styles.shareTip}
                onTouchStart={this._toggleShare}>
                <Text></Text>
            </View>
        </View>
    )
}

export default class LInfo extends Component {
    state = {
        showShareTip: false
    }

    render() {
        const {info} = this.props;

        let soldTip     = generateSoldTip(info);
        let marketTip   = generateMarketInfo(info.market_info);
        let shareTip    = generateShareEntrance.bind(this)();

        return (
            <View style={styles.container}>
                {shareTip}
                <View style={styles.idi_name}>
                    <Text>{info.goods_title}</Text>
                </View>
                <View style={styles.idi_price}>
                    <Text className="id_pu">¥</Text>
                    <Text>{info.goods_price}</Text>
                    {marketTip}
                </View>
                <View style={styles.idi_mprice}>
                    <Text>市场价 </Text>
                    <Text style={styles.id_pu}>¥</Text>
                    <Text>{info.goods_mprice}</Text>
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
  container: {
    backgroundColor: '#ffffff',
  }
});