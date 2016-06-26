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
