import React from 'react'

class AnimationWindow extends React.Component {
  componentWillMount() {
    let {frameSpeed, frameStart, animation, scenes} = this.props

    let framesTotal = 0
    scenes.forEach((scene) => {
      if (typeof frameStart === 'string' && frameStart === scene.name) {
        frameStart = framesTotal
      }
      framesTotal += scene.frames
    })

    console.log('frames total', framesTotal)

    this.setState({
      frame: frameStart,
      framesTotal
    })
  }

  componentDidMount() {
    if (this.props.animation) {
      setInterval(() => {
        this.nextFrame()
      }, 200)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.frame === nextState.frame) return false
    return true
  }

  nextFrame() {
    const {frame, framesTotal} = this.state
    this.setState({
      frame: (frame < framesTotal) ? frame + 1 : 0
    })
    console.log(frame)
  }

  render () {
    const {frame} = this.state
    const {frameSpeed, frameStart, animation, scenes, transitionSpeed, windowStyles} = this.props

    const getCurrentScene = (frame, scenes) => {
      let scene = 0
      do {
        frame -= scenes[scene].frames
        if (frame < 0) return scene
        scene++
        if (!scenes[scene]) return 0 // fallback preventing endless loop
      } while (true)
    }

    const currentScene = getCurrentScene(frame, scenes)

    const animationElement = (element, index) => {
      const defaultStyles = {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundPosition: 'center center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        opacity: 1,
        transition: `left ${transitionSpeed}ms ease,top ${transitionSpeed}ms ease, height ${transitionSpeed}ms ease, width ${transitionSpeed}ms ease, border ${transitionSpeed}ms ease, border-color ${transitionSpeed}ms ease, background-color ${transitionSpeed}ms ease, background-position ${transitionSpeed}ms ease, opacity ${transitionSpeed}ms ease`
      }
      return (
        <div key={index} style={{...defaultStyles, ...element.style}}>{element.content}</div>
      )
    }

    const sameElementOfPreviousScene = (scenes, currentScene, elementIndex) => {
      let element = false
      do {
        currentScene--
        element = scenes[currentScene].elements[elementIndex]
        if (typeof element === 'object') {
          return element
        }
      } while (currentScene >= 0)
      return false
    }

    const animationElements = () => {
      return scenes[currentScene].elements.map((element, index) => {
        if (typeof element === 'object') {
          return animationElement(element, index)
        } else {
          if (element) {
            return animationElement(sameElementOfPreviousScene(scenes, currentScene, index), index)
          }
          return false
        }
      })
    }

    return (
      <div className={`AnimationWindow scene${currentScene}`} style={windowStyles}>
        {animationElements()}
      </div>
    )
  }
}

export {
  AnimationWindow
}