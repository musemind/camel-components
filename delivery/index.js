'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationWindow = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimationWindow = function (_React$Component) {
  _inherits(AnimationWindow, _React$Component);

  function AnimationWindow() {
    _classCallCheck(this, AnimationWindow);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AnimationWindow).apply(this, arguments));
  }

  _createClass(AnimationWindow, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var frameSpeed = _props.frameSpeed;
      var frameStart = _props.frameStart;
      var animation = _props.animation;
      var scenes = _props.scenes;


      var framesTotal = 0;
      scenes.forEach(function (scene) {
        framesTotal += scene.frames;
      });

      console.log('frames total', framesTotal);

      this.setState({
        frame: frameStart,
        framesTotal: framesTotal
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.animation) {
        setInterval(function () {
          _this2.nextFrame();
        }, 200);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.state.frame === nextState.frame) return false;
      return true;
    }
  }, {
    key: 'nextFrame',
    value: function nextFrame() {
      var _state = this.state;
      var frame = _state.frame;
      var framesTotal = _state.framesTotal;

      this.setState({
        frame: frame < framesTotal ? frame + 1 : 0
      });
      console.log(frame);
    }
  }, {
    key: 'render',
    value: function render() {
      var frame = this.state.frame;
      var _props2 = this.props;
      var frameSpeed = _props2.frameSpeed;
      var frameStart = _props2.frameStart;
      var animation = _props2.animation;
      var scenes = _props2.scenes;
      var transitionSpeed = _props2.transitionSpeed;
      var windowStyles = _props2.windowStyles;


      var getCurrentScene = function getCurrentScene(frame, scenes) {
        var scene = 0;
        do {
          frame -= scenes[scene].frames;
          if (frame < 0) return scene;
          scene++;
          if (!scenes[scene]) return 0; // fallback preventing endless loop
        } while (true);
      };

      var currentScene = getCurrentScene(frame, scenes);

      var animationElement = function animationElement(element, index) {
        var defaultStyles = {
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundPosition: 'center center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          transition: 'left ' + transitionSpeed + 'ms ease,top ' + transitionSpeed + 'ms ease, height ' + transitionSpeed + 'ms ease, width ' + transitionSpeed + 'ms ease, border ' + transitionSpeed + 'ms ease, border-color ' + transitionSpeed + 'ms ease, background-color ' + transitionSpeed + 'ms ease, background-position ' + transitionSpeed + 'ms ease, opacity ' + transitionSpeed + 'ms ease'
        };
        return _react2.default.createElement(
          'div',
          { key: index, style: _extends({}, defaultStyles, element.style) },
          element.content
        );
      };

      var sameElementOfPreviousScene = function sameElementOfPreviousScene(scenes, currentScene, elementIndex) {
        var element = false;
        do {
          currentScene--;
          element = scenes[currentScene].elements[elementIndex];
          if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object') {
            return element;
          }
        } while (currentScene >= 0);
        return false;
      };

      var animationElements = function animationElements() {
        return scenes[currentScene].elements.map(function (element, index) {
          if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object') {
            return animationElement(element, index);
          } else {
            if (element) {
              return animationElement(sameElementOfPreviousScene(scenes, currentScene, index), index);
            }
            return false;
          }
        });
      };

      return _react2.default.createElement(
        'div',
        { className: 'AnimationWindow scene' + currentScene, style: windowStyles },
        animationElements()
      );
    }
  }]);

  return AnimationWindow;
}(_react2.default.Component);

exports.AnimationWindow = AnimationWindow;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeTyping = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FakeTyping = function (_React$Component) {
  _inherits(FakeTyping, _React$Component);

  function FakeTyping() {
    _classCallCheck(this, FakeTyping);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FakeTyping).apply(this, arguments));
  }

  _createClass(FakeTyping, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        actualLine: 0,
        actualOffset: 0,
        mode: 'wait',
        actualString: this.props.lines[0],
        actualWaitingTime: 0
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.continueFakeTyping();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.continueFakeTyping();
    }
  }, {
    key: 'continueFakeTyping',
    value: function continueFakeTyping() {
      var _this2 = this;

      var _props = this.props;
      var lines = _props.lines;
      var timeAfterCharacter = _props.timeAfterCharacter;
      var timeAfterWord = _props.timeAfterWord;

      var waitingIterations = Math.ceil(timeAfterWord / timeAfterCharacter);
      var _state = this.state;
      var actualLine = _state.actualLine;
      var actualString = _state.actualString;
      var actualOffset = _state.actualOffset;
      var mode = _state.mode;
      var actualWaitingTime = _state.actualWaitingTime;


      setTimeout(function () {

        switch (mode) {
          case 'deleteActualLine':
            actualOffset++;

            // end of mode
            if (actualOffset > lines[actualLine].length) {
              actualLine++;
              if (actualLine >= lines.length) {
                actualLine = 0;
              }
              actualOffset = 0;

              actualOffset = lines[actualLine].length;
              mode = 'typeActualLine';
            }
            break;
          case 'typeActualLine':
            actualOffset--;

            // end of mode
            if (actualOffset === 0) {
              mode = 'wait';
            }
            break;
          case 'wait':
            actualWaitingTime++;

            // end of mode
            if (actualWaitingTime >= waitingIterations) {
              actualWaitingTime = 0;
              mode = 'deleteActualLine';
            }
            break;
        }

        var line = lines[actualLine];
        actualString = line.substr(0, line.length - actualOffset);

        _this2.setState({
          actualString: actualString,
          actualOffset: actualOffset,
          actualLine: actualLine,
          actualWaitingTime: actualWaitingTime,
          mode: mode
        });
      }, timeAfterCharacter);
    }
  }, {
    key: 'render',
    value: function render() {
      var actualString = this.state.actualString;

      return _react2.default.createElement(
        'span',
        null,
        actualString,
        _react2.default.createElement(
          'span',
          { className: 'animate-flicker' },
          '|'
        )
      );
    }
  }]);

  return FakeTyping;
}(_react2.default.Component);

exports.FakeTyping = FakeTyping;
