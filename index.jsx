require('./demo-assets/style.less')
require('./demo-assets/codemirror.css')
require('./demo-assets/codemirror-ambiance.css')
require('./node_modules/codemirror/mode/jsx/jsx');

import ReactDOM from 'react-dom';
import React from 'react';

import Codemirror from 'react-codemirror'

import { FakeTyping } from './camelComponents/fakeTyping.jsx'

ReactDOM.render(
  <FakeTyping
    timeAfterCharacter={50}
    timeAfterWord={4000}
    lines={[
    'Lorem Ipsum is simply dummy text..',
    'Sed ut perspiciatis unde omnis iste natus.',
    '1914 translation by H. Rackham'
  ]}
  />,
  document.querySelector("#fakeTyping")
)
const options = {
  lineNumbers: true,
  mode: {
    name: 'application/javascript',
    json: true
  },
  readOnly: true,
  theme: 'ambiance'
}
console.log()

let code = document.querySelector("#fakeTypingCode").innerHTML.split('\n')
code.splice(0,1)
code.splice(code.length - 2,1)
code = code.join('\n')

ReactDOM.render(
  <Codemirror value={code} onChange={() => {}} options={options} />,
  document.querySelector("#fakeTypingCode")
)
