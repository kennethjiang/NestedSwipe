/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Platform,
  UIManager,
  LayoutAnimation,
  View,
  Text,
  PanResponder,
  Dimensions,
  Image,
  Easing,
  StyleSheet
} from 'react-native';
import Swiper from 'react-native-swiper'
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width, height } = Dimensions.get('window')

const App = () => {
  const [stage, setStage] = useState(0);
  const [topHeight, setTopHeight] = useState(height * 0.5);
  const [bottomHeight, setBottomHeight] = useState(height * 0.5);

  const panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) =>
      true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
      true,

    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      // gestureState.d{x,y} will be set to zero now
    },
    onPanResponderMove: (evt, gestureState) => {
      let newTopHeight = topHeight + gestureState.dy
      let newBottomHeight = bottomHeight - gestureState.dy
      setTopHeight(newTopHeight)
      setBottomHeight(newBottomHeight)
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
    },
    onPanResponderTerminationRequest: (evt, gestureState) =>
      true,
    onPanResponderRelease: (evt, gestureState) => {
      //console.log('[topHeight]: ', topHeight)
      console.log('[RELEASE]: ', gestureState)
      let dif
      if (bottomHeight > topHeight) {
        dif = gestureState.moveY - bottomHeight
      } else {
        dif = topHeight - gestureState.moveY
      }
      if (gestureState.dy != 0) {
        if (gestureState.dy < 0) {
          goTop()
        } else {
          goBottom()
        }
      } else {
        if (dif < 0) {
          goTop()
        } else {
          goBottom()
        }
      }
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
    },
    onPanResponderTerminate: (evt, gestureState) => {
      console.log('[onPanResponderTerminate]: ', gestureState)
      // Another component has become the responder, so this gesture
      // should be cancelled
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    }
})

const [pan, setPan] = useState(panResponder);

  const goTop = () => {
    let customLayoutLinear = {
      duration: 100,
      create: {
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.scaleXY
      },
      update: {
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.scaleXY
      },
      delete: {
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.scaleXY
      }
    }
    LayoutAnimation.configureNext(customLayoutLinear);
    if (bottomHeight > topHeight) {
      setTopHeight(height * 0.2)
      setBottomHeight(height * 0.8)
    } else {
      setTopHeight(height * 0.5)
      setBottomHeight(height * 0.5)
    }
  }

  const goBottom = () => {
    let customLayoutLinear = {
      duration: 100,
      create: {
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.scaleXY
      },
      update: {
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.scaleXY
      },
      delete: {
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.scaleXY
      }
    }
    LayoutAnimation.configureNext(customLayoutLinear);
    if (bottomHeight < topHeight) {
      setTopHeight(height * 0.8)
      setBottomHeight(height * 0.2)
    } else {
      setTopHeight(height * 0.5)
      setBottomHeight(height * 0.5)
    }
  }

  useEffect(() => {
    setPan(panResponder);
  }, [topHeight])

  return <View style={{
    flex: 1,
  }}>
    <View
      style={{
        width: '100%',
        height: topHeight,
        backgroundColor: 'red'
      }}
    >
      <Tabs 
        renderTabBar={()=> <ScrollableTab />}
      >
        <Tab heading='Image One'>
          <Image 
            source={{uri: 'https://www.imagesource.com/wp-content/uploads/2019/06/Rio.jpg'}}
            resizeMode='cover'
            style={{
              width: width,
              height: '100%'
            }}
          />
        </Tab>
        <Tab heading='Image Two'>
          <Image 
            source={{uri: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg'}}
            resizeMode='cover'
            style={{
              width: width,
              height: '100%'
            }}
          />
        </Tab>
      </Tabs>
    </View>
    <View
      style={{
        height: bottomHeight,
        width: '100%',
        backgroundColor: 'blue',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
      }}
    >
      <View
        {...pan.panHandlers}
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          padding: 10
        }}
      >
        <Text>Pan Handler</Text>
      </View>
    </View>
  </View>;
};

export default App;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
