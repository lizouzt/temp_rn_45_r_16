/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';
import React, { Component } from 'react';
import {Scene, Router, TabBar} from 'react-native-router-flux';
import ItemDetail from './src/components/itemDetail/ItemDetailApp';
import Home from './src/components/appHome/Home';
import TabView from './src/components/TabView';

import {
    AppRegistry,
    Platform,
    View,
    Text,
} from 'react-native'


class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

export default class Application extends Component {
    render () {
        return <Router>
        			<Scene key="root">
        				<Scene key="home" component={Home} title="Home"/>
        				<Scene key="itemDetail" component={ItemDetail} title="ItemDetail"/>

                        <Scene key="tabbar" tabs={true} >
                            <Scene key="tab1"  title="Tab #1" icon={TabIcon} navigationBarStyle={{backgroundColor:'red'}} titleStyle={{color:'white'}}>
                                <Scene key="tab1_1" component={TabView} title="Tab #1_1" onRight={()=>alert("Right button")} rightTitle="Right" />
                                <Scene key="tab1_2" component={TabView} title="Tab #1_2" titleStyle={{color:'black'}}/>
                            </Scene>
                            <Scene key="tab2" initial={true} title="Tab #2" icon={TabIcon}>
                                <Scene key="tab2_1" component={TabView} title="Tab #2_1" onLeft={()=>alert("Left button!")} leftTitle="Left"/>
                                <Scene key="tab2_2" component={TabView} title="Tab #2_2"/>
                            </Scene>
                            <Scene key="tab3" component={TabView} title="Tab #3" hideTabBar={true} icon={TabIcon}/>
                            <Scene key="tab4" component={TabView} title="Tab #4" hideNavBar={true} icon={TabIcon}/>
                            <Scene key="tab5" component={TabView} title="Tab #5" icon={TabIcon} />
                        </Scene>
        			</Scene>
        		</Router>
    }
};

AppRegistry.registerComponent('rnapp', () => Application)
