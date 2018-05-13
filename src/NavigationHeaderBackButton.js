/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * 
 */
'use strict';

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var ReactNative = require('react-native-web');
var I18nManager = ReactNative.I18nManager,
    Image = ReactNative.Image,
    Platform = ReactNative.Platform,
    StyleSheet = ReactNative.StyleSheet,
    TouchableOpacity = ReactNative.TouchableOpacity;


var NavigationHeaderBackButton = function NavigationHeaderBackButton(props) {
  return React.createElement(
    TouchableOpacity,
    { style: [styles.buttonContainer, props.style], onPress: props.onPress },
    React.createElement(Image, { style: [styles.button, props.imageStyle], source: require('./assets/back-icon.png') })
  );
};

NavigationHeaderBackButton.propTypes = {
  onPress: _propTypes2.default.func.isRequired
};

var styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 24,
    width: 24,
    margin: Platform.OS === 'ios' ? 10 : 16,
    resizeMode: 'contain',
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  }
});

module.exports = NavigationHeaderBackButton;