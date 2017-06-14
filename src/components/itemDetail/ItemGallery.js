import React from 'react';

import ImageSlider from './bannerSlider';

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
            height: (Dimensions.get('window').width / 320) * 220,
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
                <ImageSlider style={{
                    backgroundColor: "#f2f2f2"
                }} 
                height={this.state.height}
                width={this.state.width}
                images={this.props.pics}
                onPress={()=>console.log('xxx')}/>
            </View>
        );
    }
})

module.exports = Gallery;