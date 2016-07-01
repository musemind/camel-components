require('./demo-assets/style.less')
require('./demo-assets/codemirror.css')
require('./demo-assets/codemirror-neo.css')
require('./node_modules/codemirror/mode/jsx/jsx');

import ReactDOM from 'react-dom';
import React from 'react';

import Codemirror from 'react-codemirror'

import { FakeTyping } from './camelComponents/fakeTyping.jsx'
import { AnimationWindow } from './camelComponents/animationWindow.jsx'

const options = {
  lineNumbers: true,
  mode: {
    name: 'application/javascript',
    json: true
  },
  readOnly: true,
  theme: 'neo'
}

class App extends React.Component {
  componentWillMount () {
    let page = window.location.hash
    if (page === '') {
      page = '#component-AnimationWindow'
    }
    this.setState({
      page
    })
  }

  render () {
    const {page} = this.state
    const content = () => {
      switch (page) {
        case '#component-FakeTyping':
          return (
            <div>
              <div style={{padding: '50px 40px'}}>
                <h2>Component: "Fake Typing"</h2>
                <p>Eyecatcher for important stuff, listings.<br />Example:</p>
                <FakeTyping
                  timeAfterCharacter={50}
                  timeAfterWord={4000}
                  lines={[
              'Lorem Ipsum is simply dummy text..',
              'Sed ut perspiciatis unde omnis iste natus.',
              '1914 translation by H. Rackham'
            ]}
                />
              </div>

              <div className="sectionCode">
                <Codemirror className="fakeTypingCode" value={require("raw!./demo-assets/fakeTypingCode.txt")} onChange={() => {}} options={options} style={{height: '350px !important'}} />
              </div>
            </div>
          )
        case '#component-AnimationWindow':
          return (
            <div>
              <div style={{padding: '50px 40px'}}>
                <h2>Component: "Animation Window"</h2>
                <p>CSS3 Transition based animation window. You can create different scenes and animations inside this scenes.<br />Example:</p>
                <AnimationWindow
                  frameSpeed={45} // in ms
                  frameStart={'toggle bubbles'} // scene name or frame number
                  animation={true} // false to freeze frame for easy scene creation
                  transitionSpeed={800} // default transition speed, overwritten by element styles
                  windowStyles={{position: 'relative', height: 400, width: 400, background: 'rgba(0.0.0.0)'}}
                  stopOnEnd={false} // optional: false (default) => endless set repetition, true => set will run once
                  scenes={[
              {name: 'social login', frames: 10, elements: {
                bar: {style: {top: '35%', left: '20%', height: '30%', width: '60%', background: 'rgba(255, 255, 255, 0.1)', border: 'rgba(255, 255, 255, 0.2) 1px solid'}},
                wording: {style: {top: '40%', left: '10%', height: '10%', width: '80%', fontSize: 17}, content: 'social login'},
                avatar: {style: {top: '19%', left: '44%', height: '12%', width: '12%', backgroundImage: 'url(./avatar/boy-1.svg)'}},
                facebook: {style: {top: '51%', left: '46%', height: '8%', width: '8%', backgroundImage: 'url(./socialnetwork/facebook.svg)', zIndex: '20'}},
                googlePlus: {style: {top: '51%', left: '36%', height: '8%', width: '8%', backgroundImage: 'url(./socialnetwork/google-plus.svg)'}},
                twitter: {style: {top: '51%', left: '56%', height: '8%', width: '8%', backgroundImage: 'url(./socialnetwork/twitter.svg)'}},
              }},
              {name: 'facebook trigger', frames: 4, elements: {
                facebook: {styleUpdate: {top: '47%', left: '42%', height: '16%', width: '16%', transition: 'all 400ms cubic-bezier(0.250, 1.085, 0.785, 1.650)'}},
              }},
              {name: 'logged in', frames: 12, elements: {
                bar: {styleUpdate: {top: '10%', left: '10%', height: '10%', width: '80%'}},
                wording: {removeAfterScene: true, styleUpdate: {opacity: '0'}}, //fade out
                avatar: {styleUpdate: {top: '12%', left: '78%', height: '5%', width: '5%'}},
                facebook: {styleUpdate: {top: '12%', left: '84%', height: '5%', width: '5%', zIndex: '20', transition: 'default'}},
                googlePlus: {removeAfterScene: true, styleUpdate: {top: '49%', left: '16%', height: '12%', width: '12%', opacity: '0'}}, //fade out
                twitter: {removeAfterScene: true, styleUpdate: {top: '49%', left: '76%', height: '12%', width: '12%', opacity: '0', zIndex: '18'}}, //fade out
                user1: {style: {top: '79%', left: '16%', height: '12%', width: '12%', backgroundImage: 'url(./avatar/boy-18.svg)', opacity: '0', zIndex: '18'}}, // invisible add user
                user2: {style: {top: '79%', left: '46%', height: '12%', width: '12%', backgroundImage: 'url(./avatar/girl-3.svg)', opacity: '0', zIndex: '18'}}, // invisible add user
                user3: {style: {top: '79%', left: '76%', height: '12%', width: '12%', backgroundImage: 'url(./avatar/boy-12.svg)', opacity: '0', zIndex: '18'}}, // invisible add user
                wording2: {style: {top: '40%', left: '10%', height: '10%', width: '80%', fontSize: 17, opacity: '0'}, content: 'realtime collaboration'}, // invisible new text
              }},
              {name: 'show users', frames: 12, elements: {
                user1: {styleUpdate: {top: '60%', left: '27%', height: '10%', width: '10%', opacity: '1'}}, // invisible add user
                user2: {styleUpdate: {top: '60%', left: '47%', height: '10%', width: '10%', opacity: '1'}}, // invisible add user
                user3: {styleUpdate: {top: '60%', left: '67%', height: '10%', width: '10%', opacity: '1'}}, // invisible add user
                wording2: {styleUpdate: {opacity: '1'}}, // fade in
              }},
              {name: 'speech bubbling', frames: 3, elements: {
                speechBubble1: {style: {top: '50%', left: '61%', height: '10%', width: '10%', backgroundImage: 'url(./communication/speech-bubble.svg)'}},
              }},
              {name: 'speech bubbling2', frames: 3, elements: {
                speechBubble2: {style: {top: '50%', left: '35%', height: '10%', width: '10%', backgroundImage: 'url(./communication/speech-bubble.svg)', transform: 'scaleX(-1)'}},
              }},
              {name: 'toggle bubbles', frames: 10, elements: {
                speechBubble1: {styleUpdate: {left: '20%'}},
                speechBubble2: {styleUpdate: {left: '74%'}},
              }},
            ]}
                />
              </div>

              <div className="sectionCode">
                <Codemirror className="animationWindowCode" value={require("raw!./demo-assets/animationWindowCode.txt")} onChange={() => {}} options={options} style={{height: '350px !important'}} />
              </div>
            </div>
          )
      }
      return (
        <span>Hallo</span>
      )
    }
    const setPage = (page) => {
      history.pushState(null, null, page);
      this.setState({page})
    }

    return (
      <div className="sectionCamelComponents">
        <div className="sectionNavigation">
          <div>
            <h1 onClick={() => {setPage('#component-AnimationWindow')}}>camel<br />components</h1>
            <p>React animation components</p>
            <div className="installation">
              <span>npm install camel-components --save</span>
            </div>
            <div>
              <a href="https://www.npmjs.com/package/camel-components">npm</a>
              <a href="https://github.com/musemind/camel-components">Github</a>
            </div>
            <div style={{marginTop: 40}}>
              Components:
              <div
                className={`nagivation-item ${(this.state.page === '#component-AnimationWindow') ? 'active' : ''}`}
                onClick={() => {setPage('#component-AnimationWindow')}}
              >
                Animation Window
              </div>
              <div
                className={`nagivation-item ${(this.state.page === '#component-FakeTyping') ? 'active' : ''}`}
                onClick={() => {setPage('#component-FakeTyping')}}
              >
                Fake Typing
              </div>
            </div>

          </div>
          <div style={{paddingTop: 30}}>
            "camel components" are free to use in any project. created by <a href="https://github.com/musemind">musemind</a>
          </div>
        </div>
        <div className="sectionContent">
          {content()}
        </div>
      </div>
    )

  }
}


ReactDOM.render(
  <App />,
  document.querySelector("#appRoot")
)
