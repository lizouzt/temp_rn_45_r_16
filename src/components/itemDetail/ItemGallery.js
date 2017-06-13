import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';

var Gallery = React.createClass({
    getInitialState: function () {
        return {
            width: Dimensions.get('window').width,
            height: (Dimensions.get('window').width / 320) * 300,
            inited: false
        }
    },

    componentDidMount: function () {
        
    },

    componentDidUpdate: function () {
        
    },

    render: function () {
        return (
            <View style={{
                backgroundColor: '#f5f5f5',
                height: this.state.height,
                width: this.state.width
            }}>
                <Image style={{
                    height: this.state.height,
                    width: this.state.width
                }} source={{uri: "https://img.alicdn.com/tfs/TB1Zl57RFXXXXaPXpXXXXXXXXXX-520-280.jpg"}}/>
            </View>
        );
    }
})

module.exports = Gallery;