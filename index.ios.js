/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';
import React, { Component } from 'react';
import {Scene, Router} from 'react-native-router-flux';
import ItemDetail from './src/components/itemDetail/ItemDetailApp';
import Home from './src/components/appHome/Home';

import {
    AppRegistry,
    Platform,
    View
} from 'react-native'

export default class Application extends Component {
    render () {
        return <Router>
        			<Scene key="root">
        				<Scene key="home" component={Home} title="Home"/>
        				<Scene key="itemDetail" component={ItemDetail} title="ItemDetail"/>
        			</Scene>
        		</Router>
    }
};

AppRegistry.registerComponent('rnapp', () => Application)
