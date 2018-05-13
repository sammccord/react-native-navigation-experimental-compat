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

var NativeAnimatedModule = require('react-native-web').NativeModules.NativeAnimatedModule;
var NavigationCard = require('./NavigationCard');
var NavigationCardStackPanResponder = require('./NavigationCardStackPanResponder');
var NavigationCardStackStyleInterpolator = require('./NavigationCardStackStyleInterpolator');
var NavigationPropTypes = require('./NavigationPropTypes');
var NavigationTransitioner = require('./NavigationTransitioner');
var React = require('react');
var StyleSheet = require('react-native-web').StyleSheet;
var View = require('react-native-web').View;

var Directions = NavigationCardStackPanResponder.Directions;

/**
 * A controlled navigation view that renders a stack of cards.
 *
 * ```html
 *     +------------+
 *   +-|   Header   |
 * +-+ |------------|
 * | | |            |
 * | | |  Focused   |
 * | | |   Card     |
 * | | |            |
 * +-+ |            |
 *   +-+            |
 *     +------------+
 * ```
 *
 * ## Example
 *
 * ```js
 *
 * class App extends React.Component {
 *   constructor(props, context) {
 *     this.state = {
 *       navigation: {
 *         index: 0,
 *         routes: [
 *           {key: 'page 1'},
 *         },
 *       },
 *     };
 *   }
 *
 *   render() {
 *     return (
 *       <NavigationCardStack
 *         navigationState={this.state.navigation}
 *         renderScene={this._renderScene}
 *       />
 *     );
 *   }
 *
 *   _renderScene: (props) => {
 *     return (
 *       <View>
 *         <Text>{props.scene.route.key}</Text>
 *       </View>
 *     );
 *   };
 * ```
 */
var NavigationCardStack = function (_React$Component) {
  _inherits(NavigationCardStack, _React$Component);

  function NavigationCardStack(props, context) {
    _classCallCheck(this, NavigationCardStack);

    var _this = _possibleConstructorReturn(this, (NavigationCardStack.__proto__ || Object.getPrototypeOf(NavigationCardStack)).call(this, props, context));

    _this._configureTransition = function () {
      var isVertical = _this.props.direction === 'vertical';
      var animationConfig = {};
      if (!!NativeAnimatedModule &&
      // Gestures do not work with the current iteration of native animation
      // driving. When gestures are disabled, we can drive natively.
      !_this.props.enableGestures &&
      // Native animation support also depends on the transforms used:
      NavigationCardStackStyleInterpolator.canUseNativeDriver(isVertical)) {
        animationConfig.useNativeDriver = true;
      }
      return animationConfig;
    };

    return _this;
  }

  _createClass(NavigationCardStack, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._render = this._render.bind(this);
      this._renderScene = this._renderScene.bind(this);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(NavigationTransitioner, {
        configureTransition: this._configureTransition,
        navigationState: this.props.navigationState,
        render: this._render,
        style: this.props.style
      });
    }
  }, {
    key: '_render',
    value: function _render(props) {
      var _this2 = this;

      var renderHeader = this.props.renderHeader;


      var header = renderHeader ? React.createElement(
        View,
        null,
        renderHeader(props)
      ) : null;

      var scenes = props.scenes.map(function (scene) {
        return _this2._renderScene(_extends({}, props, {
          scene: scene
        }));
      });

      return React.createElement(
        View,
        { style: styles.container },
        React.createElement(
          View,
          { style: [styles.scenes, this.props.scenesStyle] },
          scenes
        ),
        header
      );
    }
  }, {
    key: '_renderScene',
    value: function _renderScene(props) {
      var isVertical = this.props.direction === 'vertical';

      var interpolator = this.props.cardStyleInterpolator || (isVertical ? NavigationCardStackStyleInterpolator.forVertical : NavigationCardStackStyleInterpolator.forHorizontal);

      var style = interpolator(props);

      var panHandlers = null;

      if (this.props.enableGestures) {
        var panHandlersProps = _extends({}, props, {
          onNavigateBack: this.props.onNavigateBack,
          gestureResponseDistance: this.props.gestureResponseDistance
        });
        panHandlers = isVertical ? NavigationCardStackPanResponder.forVertical(panHandlersProps) : NavigationCardStackPanResponder.forHorizontal(panHandlersProps);
      }

      return React.createElement(NavigationCard, _extends({}, props, {
        key: 'card_' + props.scene.key,
        panHandlers: panHandlers,
        renderScene: this.props.renderScene,
        style: [style, this.props.cardStyle]
      }));
    }
  }]);

  return NavigationCardStack;
}(React.Component);

NavigationCardStack.propTypes = {
  /**
   * Custom style applied to the card.
   */
  cardStyle: _propTypes2.default.any,

  /**
   * Direction of the cards movement. Value could be `horizontal` or
   * `vertical`. Default value is `horizontal`.
   */
  direction: _propTypes2.default.oneOf([Directions.HORIZONTAL, Directions.VERTICAL]),

  /**
   * The distance from the edge of the card which gesture response can start
   * for. Default value is `30`.
   */
  gestureResponseDistance: _propTypes2.default.number,

  /**
   * An interpolator function that is passed an object parameter of type
   * NavigationSceneRendererProps and should return a style object to apply to
   * the transitioning navigation card.
   *
   * Default interpolator transitions translateX, scale, and opacity.
   */
  cardStyleInterpolator: _propTypes2.default.func,

  /**
   * Enable gestures. Default value is true.
   *
   * When disabled, transition animations will be handled natively, which
   * improves performance of the animation. In future iterations, gestures
   * will also work with native-driven animation.
   */
  enableGestures: _propTypes2.default.bool,

  /**
   * The controlled navigation state. Typically, the navigation state
   * look like this:
   *
   * ```js
   * const navigationState = {
   *   index: 0, // the index of the selected route.
   *   routes: [ // A list of routes.
   *     {key: 'page 1'}, // The 1st route.
   *     {key: 'page 2'}, // The second route.
   *   ],
   * };
   * ```
   */
  navigationState: NavigationPropTypes.navigationState.isRequired,

  /**
   * Callback that is called when the "back" action is performed.
   * This happens when the back button is pressed or the back gesture is
   * performed.
   */
  onNavigateBack: _propTypes2.default.func,

  /**
   * Function that renders the header.
   */
  renderHeader: _propTypes2.default.func,

  /**
   * Function that renders the a scene for a route.
   */
  renderScene: _propTypes2.default.func.isRequired
};
NavigationCardStack.defaultProps = {
  direction: Directions.HORIZONTAL,
  enableGestures: true
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    // Header is physically rendered after scenes so that Header won't be
    // covered by the shadows of the scenes.
    // That said, we'd have use `flexDirection: 'column-reverse'` to move
    // Header above the scenes.
    flexDirection: 'column-reverse'
  },
  scenes: {
    flex: 1
  }
});

module.exports = NavigationCardStack;