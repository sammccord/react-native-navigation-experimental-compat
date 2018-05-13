/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Facebook, Inc. ("Facebook") owns all right, title and interest, including
 * all intellectual property and other proprietary rights, in and to the React
 * Native CustomComponents software (the "Software").  Subject to your
 * compliance with these terms, you are hereby granted a non-exclusive,
 * worldwide, royalty-free copyright license to (1) use and copy the Software;
 * and (2) reproduce and distribute the Software as part of your own software
 * ("Your Software").  Facebook reserves all rights not expressly granted to
 * you in this license agreement.
 *
 * THE SOFTWARE AND DOCUMENTATION, IF ANY, ARE PROVIDED "AS IS" AND ANY EXPRESS
 * OR IMPLIED WARRANTIES (INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE) ARE DISCLAIMED.
 * IN NO EVENT SHALL FACEBOOK OR ITS AFFILIATES, OFFICERS, DIRECTORS OR
 * EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * 
 */
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavigationHeaderBackButton = require('./NavigationHeaderBackButton');
var NavigationHeaderStyleInterpolator = require('./NavigationHeaderStyleInterpolator');
var NavigationHeaderTitle = require('./NavigationHeaderTitle');
var NavigationPropTypes = require('./NavigationPropTypes');
var React = require('react');
var ReactNative = require('react-native-web');

var Animated = ReactNative.Animated,
    Platform = ReactNative.Platform,
    StyleSheet = ReactNative.StyleSheet,
    View = ReactNative.View,
    ViewPropTypes = ReactNative.ViewPropTypes;


var APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
var STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

var NavigationHeader = function (_React$PureComponent) {
  _inherits(NavigationHeader, _React$PureComponent);

  function NavigationHeader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NavigationHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NavigationHeader.__proto__ || Object.getPrototypeOf(NavigationHeader)).call.apply(_ref, [this].concat(args))), _this), _this._renderLeft = function (props) {
      return _this._renderSubView(props, 'left', _this.props.renderLeftComponent, NavigationHeaderStyleInterpolator.forLeft);
    }, _this._renderTitle = function (props) {
      return _this._renderSubView(props, 'title', _this.props.renderTitleComponent, NavigationHeaderStyleInterpolator.forCenter);
    }, _this._renderRight = function (props) {
      return _this._renderSubView(props, 'right', _this.props.renderRightComponent, NavigationHeaderStyleInterpolator.forRight);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NavigationHeader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          scenes = _props.scenes,
          style = _props.style,
          viewProps = _props.viewProps;


      var scenesProps = scenes.map(function (scene) {
        var props = NavigationPropTypes.extractSceneRendererProps(_this2.props);
        props.scene = scene;
        return props;
      });

      var barHeight = this.props.statusBarHeight instanceof Animated.Value ? Animated.add(this.props.statusBarHeight, new Animated.Value(APPBAR_HEIGHT)) : APPBAR_HEIGHT + this.props.statusBarHeight;

      return React.createElement(
        Animated.View,
        _extends({ style: [styles.appbar, { height: barHeight }, style] }, viewProps),
        scenesProps.map(this._renderLeft, this),
        scenesProps.map(this._renderTitle, this),
        scenesProps.map(this._renderRight, this)
      );
    }
  }, {
    key: '_renderSubView',
    value: function _renderSubView(props, name, renderer, styleInterpolator) {
      var scene = props.scene,
          navigationState = props.navigationState;
      var index = scene.index,
          isStale = scene.isStale,
          key = scene.key;


      var offset = navigationState.index - index;

      if (Math.abs(offset) > 2) {
        // Scene is far away from the active scene. Hides it to avoid unnecessary
        // rendering.
        return null;
      }

      var subViewProps = _extends({}, props, { onNavigateBack: this.props.onNavigateBack });
      var subView = renderer(subViewProps);
      if (subView === null) {
        return null;
      }

      var pointerEvents = offset !== 0 || isStale ? 'none' : 'box-none';
      return React.createElement(
        Animated.View,
        {
          pointerEvents: pointerEvents,
          key: name + '_' + key,
          style: [styles[name], { marginTop: this.props.statusBarHeight }, styleInterpolator(props)] },
        subView
      );
    }
  }]);

  return NavigationHeader;
}(React.PureComponent);

NavigationHeader.defaultProps = {
  renderTitleComponent: function renderTitleComponent(props) {
    var title = String(props.scene.route.title || '');
    return React.createElement(
      NavigationHeaderTitle,
      null,
      title
    );
  },

  renderLeftComponent: function renderLeftComponent(props) {
    if (props.scene.index === 0 || !props.onNavigateBack) {
      return null;
    }
    return React.createElement(NavigationHeaderBackButton, { onPress: props.onNavigateBack });
  },

  renderRightComponent: function renderRightComponent(props) {
    return null;
  },

  statusBarHeight: STATUSBAR_HEIGHT
};
NavigationHeader.propTypes = _extends({}, NavigationPropTypes.SceneRendererProps, {
  onNavigateBack: _propTypes2.default.func,
  renderLeftComponent: _propTypes2.default.func,
  renderRightComponent: _propTypes2.default.func,
  renderTitleComponent: _propTypes2.default.func,
  statusBarHeight: _propTypes2.default.number,
  viewProps: _propTypes2.default.shape(ViewPropTypes)
});
NavigationHeader.HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;
NavigationHeader.Title = NavigationHeaderTitle;
NavigationHeader.BackButton = NavigationHeaderBackButton;


var styles = StyleSheet.create({
  appbar: {
    alignItems: 'center',
    backgroundColor: Platform.OS === 'ios' ? '#EFEFF2' : '#FFF',
    borderBottomColor: 'rgba(0, 0, 0, .15)',
    borderBottomWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },

  title: {
    bottom: 0,
    left: APPBAR_HEIGHT,
    position: 'absolute',
    right: APPBAR_HEIGHT,
    top: 0
  },

  left: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0
  },

  right: {
    bottom: 0,
    position: 'absolute',
    right: 0,
    top: 0
  }
});

module.exports = NavigationHeader;