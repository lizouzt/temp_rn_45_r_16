/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Animation from 'lottie-react-native';
import Picker from './Picker';

import ImagePicker from 'react-native-image-picker';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Navigation } from 'react-native-navigation';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  Dimensions,
  Slider
} from 'react-native';

const makeExample = (name, getJson) => ({ name, getJson });
const EXAMPLES = [
  makeExample('Hamburger Arrow', () => require('./animations/HamburgerArrow.json')),
  makeExample('Line Animation', () => require('./animations/LineAnimation.json')),
  makeExample('Lottie Logo 1', () => require('./animations/LottieLogo1.json')),
  makeExample('Lottie Logo 2', () => require('./animations/LottieLogo2.json')),
  makeExample('Lottie Walkthrough', () => require('./animations/LottieWalkthrough.json')),
  makeExample('Pin Jump', () => require('./animations/PinJump.json')),
  makeExample('Twitter Heart', () => require('./animations/TwitterHeart.json')),
  makeExample('Watermelon', () => require('./animations/Watermelon.json')),
  makeExample('Motion Corpse', () => require('./animations/MotionCorpse-Jrcanest.json')),
].reduce((acc, e) => {
  acc[e.name] = e;
  return acc;
}, {});

export default class rnAnimateTest extends Component {
  constructor (props) {
    super(props);
    this.state = {
      example: Object.keys(EXAMPLES)[0],
      progress: new Animated.Value(0),
      config: {
        duration: 3000,
        imperative: false,
      },
    };

    this.reRunAnimate = this.reRunAnimate.bind(this);
    this.setAnim = this.setAnim.bind(this);
    this.randomAnimate = this.randomAnimate.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
  }

  runAnimate () {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: this.state.config.duration
    }).start();
  }

  reRunAnimate () {
    this.state.progress.setValue(1);
    Animated.timing(this.state.progress, {
      toValue: 0,
      duration: this.state.config.duration
    }).start(({finished}) => {
      if (finished) this.forceUpdate();
    });
  }

  componentDidMount () {
    // this.anim.play();
    this.runAnimate.bind(this)();
  }

  randomAnimate () {
    this.setState({
      example: Object.keys(EXAMPLES)[Math.floor(Math.random() * 9)]
    });
    this.reRunAnimate();
  }

  updateProgress (progress) {
    this.state.progress.setValue(progress);
  }

  setAnim (anim) {
    this.anim = anim;
  }

  pickImg () {
    ImagePicker.showImagePicker({
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Library'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }, (response) => {
      console.log('Response = ', response);
    });
  }

  render() {
    return (
      <View>
        <View>
          <NavigationBar
            style={{
              borderColor: '#000',
              borderBottomWidth: 1
            }}
            title={{
              title: '逗',
            }}
            rightButton={{
              title: '我',
              handler: () => alert('hello!'),
            }}
            leftButton={{
              title: 'B',
              handler: () => alert('Back')
            }}/>
        </View>

        <View style={{
          backgroundColor: 'skyblue',
          height: Dimensions.get('window').height - 43 - 20,
        }}>
          <View style={{
            backgroundColor: 140,
            height: 140,
            width: 100,
            marginLeft: (Dimensions.get('window').width - 100) / 2
          }}>
            <Animation 
              ref={this.setAnim}
              style={{
                backgroundColor: 'red',
                width: 100,
                height: 100,
              }}
              source={EXAMPLES[this.state.example].getJson()}
              progress={this.state.progress}/>
            <Slider
              minimumValue={0}
              maximumValue={1}
              style={{
                height: 40,
                width: 100
              }}
              value={this.state.progress.__getValue()}
              onValueChange={this.updateProgress} />
          </View>
          <Picker
            example={this.state.example}
            examples={EXAMPLES}
            onChange={(example) => {this.setState({example});this.reRunAnimate(); }} />
          <Button title="Random" onPress={this.randomAnimate} />
          <Button title="Image Picker" onPress={this.pickImg} />
          <Icon.Button 
            name="bath" 
            backgroundColor="#3b5998" 
            size={30}
            onPress={()=> alert('xasd')}>
            Login with Facebook
          </Icon.Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  }
});

AppRegistry.registerComponent('rnapp', () => rnAnimateTest);
