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

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

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
      var frameStart = _props.frameStart;
      var scenes = _props.scenes;
      var transitionSpeed = _props.transitionSpeed;


      var framesTotal = 0;
      var elementIds = {};
      scenes.forEach(function (scene) {
        if (typeof frameStart === 'string' && frameStart === scene.name) {
          frameStart = framesTotal;
        }
        Object.keys(scene.elements).forEach(function (key) {
          elementIds[key] = true;
        });
        framesTotal += scene.frames;
      });
      elementIds = Object.keys(elementIds);

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

      this.setState({
        frame: frameStart,
        framesTotal: framesTotal,
        defaultStyles: defaultStyles,
        elementIds: elementIds
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.animation) {
        this.setState({
          timer: setInterval(function () {
            _this2.nextFrame();
          }, 200)
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextState) {
      if (this.state.frame === nextState.frame) return false;
      return true;
    }
  }, {
    key: 'nextFrame',
    value: function nextFrame() {
      var stopOnEnd = this.props.stopOnEnd;
      var _state = this.state;
      var frame = _state.frame;
      var framesTotal = _state.framesTotal;
      var timer = _state.timer;

      var newFrame = frame < framesTotal - 1 ? frame + 1 : 0;
      if (stopOnEnd && newFrame === 0) {
        clearInterval(timer);
      } else {
        this.setState({
          frame: newFrame
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state;
      var frame = _state2.frame;
      var defaultStyles = _state2.defaultStyles;
      var elementIds = _state2.elementIds;
      var _props2 = this.props;
      var scenes = _props2.scenes;
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

      var animationElement = function animationElement(element, elementId) {
        if (element) {
          var content = element.content;

          return _react2.default.createElement(
            'div',
            { key: elementId, style: _extends({}, defaultStyles, element.style) },
            content ? content : null
          );
        }
      };

      var aggregateElement = function aggregateElement(scenes, currentScene, elementId) {
        var style = {};
        var searchScene = currentScene;
        do {
          var element = _ramda2.default.clone(scenes[searchScene].elements[elementId]);
          if (typeof element === 'undefined') element = true;
          if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object') {
            if (element.removeAfterScene && searchScene !== currentScene) {
              return false;
            }
            if (element.styleUpdate) {
              style = _extends({}, element.styleUpdate, style);
            } else {
              style = _extends({}, element.style, style);
            }
            if (style.transition === 'default') {
              style.transition = defaultStyles.transition;
            }
            if (!element.styleUpdate) {
              element.style = style;
              return element;
            }
          } else {
            if (!element) {
              return false;
            }
          }
          searchScene--;
        } while (searchScene >= 0);
        return false;
      };

      var animationElements = function animationElements() {
        return elementIds.map(function (elementId) {
          return animationElement(aggregateElement(scenes, currentScene, elementId), elementId);
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
