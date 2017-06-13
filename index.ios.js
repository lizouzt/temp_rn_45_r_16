/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';
import React, { Component } from 'react';

import ItemDetail from './src/components/itemDetail/ItemDetailApp';

import {
    AppRegistry,
    Platform,
    View
} from 'react-native'

export default class Application extends Component {
    componentWillMount () {

    }

    render () {
        return (
            <ItemDetail/>
        )
    }
};

AppRegistry.registerComponent('rnapp', () => Application)
