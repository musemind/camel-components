require('./demo-assets/style.less')
require('./demo-assets/codemirror.css')
require('./demo-assets/codemirror-ambiance.css')
require('./node_modules/codemirror/mode/jsx/jsx');

import ReactDOM from 'react-dom';
import React from 'react';

import Codemirror from 'react-codemirror'

import { FakeTyping } from './camelComponents/fakeTyping.jsx'
import { AnimationWindow } from './camelComponents/animationWindow.jsx'

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

ReactDOM.render(
  <AnimationWindow
    frameSpeed={45} // in ms
    frameStart={'social login'} // scene name or frame number
    animation={true} // false to freeze frame for easy scene creation
    transitionSpeed={800} // default transition speed, overwritten by element styles
    windowStyles={{position: 'relative', height: 400, width: 400, background: 'rgba(0.0.0.0)'}}
    stopOnEnd={false} // optional: false (default) => endless set repetition, true => set will run once
    scenes={[
      {name: 'social login', frames: 10, elements: [ // 0-9
        {style: {top: '35%', left: '20%', height: '30%', width: '60%', background: 'rgba(255, 255, 255, 0.5)', border: '#bbb 1px solid'}, content: null},
        {style: {top: '40%', left: '10%', height: '10%', width: '80%', fontSize: 17}, content: 'social login'},
        {style: {top: '19%', left: '44%', height: '12%', width: '12%', backgroundImage: 'url(./avatar/boy-1.svg)'}, content: null},
        {style: {top: '51%', left: '46%', height: '8%', width: '8%', backgroundImage: 'url(./socialnetwork/facebook.svg)', zIndex: '20'}, content: null},
        {style: {top: '51%', left: '36%', height: '8%', width: '8%', backgroundImage: 'url(./socialnetwork/google-plus.svg)'}, content: null},
        {style: {top: '51%', left: '56%', height: '8%', width: '8%', backgroundImage: 'url(./socialnetwork/twitter.svg)'}, content: null},
      ]},
      {name: 'animation: facebook trigger', frames: 4, elements: [ // 10-13
        true,
        true,
        true,
        {styleUpdate: true, style: {top: '47%', left: '42%', height: '16%', width: '16%', transition: 'all 400ms cubic-bezier(0.250, 1.085, 0.785, 1.650)'}, content: null},
        true,
        true,
      ]},
      {name: 'logged in', frames: 12, elements: [ // 14-25
        {styleUpdate: true, style: {top: '10%', left: '10%', height: '10%', width: '80%'}, content: null},
        {styleUpdate: true, style: {opacity: '0'}}, //fade out
        {styleUpdate: true, style: {top: '12%', left: '78%', height: '5%', width: '5%'}, content: null},
        {styleUpdate: true, style: {top: '12%', left: '84%', height: '5%', width: '5%', zIndex: '20', transition: 'default'}, content: null},
        {styleUpdate: true, style: {top: '49%', left: '16%', height: '12%', width: '12%', opacity: '0'}, content: null}, //fade out
        {styleUpdate: true, style: {top: '49%', left: '76%', height: '12%', width: '12%', opacity: '0', zIndex: '18'}, content: null}, //fade out
        {style: {top: '79%', left: '16%', height: '12%', width: '12%', backgroundImage: 'url(./avatar/boy-18.svg)', opacity: '0', zIndex: '18'}, content: null}, // invisible add user
        {style: {top: '79%', left: '46%', height: '12%', width: '12%', backgroundImage: 'url(./avatar/girl-3.svg)', opacity: '0', zIndex: '18'}, content: null}, // invisible add user
        {style: {top: '79%', left: '76%', height: '12%', width: '12%', backgroundImage: 'url(./avatar/boy-12.svg)', opacity: '0', zIndex: '18'}, content: null}, // invisible add user
        {style: {top: '40%', left: '10%', height: '10%', width: '80%', fontSize: 17, opacity: '0'}, content: 'realtime collaboration'}, // invisible new text
      ]},
      {name: 'show users', frames: 12, elements: [ // 26-37
        true,
        false,
        true,
        true,
        false,
        false,
        {styleUpdate: true, style: {top: '60%', left: '27%', height: '10%', width: '10%', opacity: '1'}, content: null}, // invisible add user
        {styleUpdate: true, style: {top: '60%', left: '47%', height: '10%', width: '10%', opacity: '1'}, content: null}, // invisible add user
        {styleUpdate: true, style: {top: '60%', left: '67%', height: '10%', width: '10%', opacity: '1'}, content: null}, // invisible add user,
        {styleUpdate: true, style: {opacity: '1'}}, // fade in
      ]},
      {name: 'speech bubbling', frames: 3, elements: [ // 38-39
        true, false, true, true,
        {style: {top: '50%', left: '61%', height: '10%', width: '10%', backgroundImage: 'url(./communication/speech-bubble.svg)'}, content: null},
        false, true, true, true, true
      ]},
      {name: 'speech bubbling2', frames: 3, elements: [ // 40-41
        true, false, true, true, true,
        {style: {top: '50%', left: '35%', height: '10%', width: '10%', backgroundImage: 'url(./communication/speech-bubble.svg)', transform: 'scaleX(-1)'}, content: null},
        true, true, true, true
      ]},
    ]}
  />,
  document.querySelector("#animationWindow")
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
