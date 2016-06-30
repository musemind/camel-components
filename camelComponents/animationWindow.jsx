import React from 'react'
import R from 'ramda'

class AnimationWindow extends React.Component {
  componentWillMount() {
    let {frameStart, scenes, transitionSpeed} = this.props

    let framesTotal = 0
    scenes.forEach((scene) => {
      if (typeof frameStart === 'string' && frameStart === scene.name) {
        frameStart = framesTotal
      }
      framesTotal += scene.frames
    })

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

    this.setState({
      frame: frameStart,
      framesTotal,
      defaultStyles
    })
  }

  componentDidMount() {
    if (this.props.animation) {
      this.setState({
        timer: setInterval(() => {
          this.nextFrame()
        }, 200)
      })
    }
  }

  shouldComponentUpdate(nextState) {
    if (this.state.frame === nextState.frame) return false
    return true
  }
  nextFrame() {
    const {stopOnEnd} = this.props
    const {frame, framesTotal, timer} = this.state
    const newFrame = (frame < framesTotal - 1) ? frame + 1 : 0
    if (stopOnEnd && (newFrame === 0)) {
      clearInterval(timer)
    } else {
      this.setState({
        frame: newFrame
      })
    }
  }

  render () {
    const {frame, defaultStyles} = this.state
    const {scenes, windowStyles} = this.props

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
      return (
        <div key={index} style={{...defaultStyles, ...element.style}}>{element.content}</div>
      )
    }

    const aggregateElement = (scenes, currentScene, elementIndex) => {
      let style = {}
      do {
        let element = R.clone(scenes[currentScene].elements[elementIndex])
        if (typeof element === 'object') {
          if (element.style.transition === 'default') {
            element.style.transition = defaultStyles.transition
          }
          style = {...element.style, ...style}
          if (!element.styleUpdate) {
            element.style = style
            return element
          }
        } else {
          if (!element) {
            return false
          }
        }
        currentScene--
      } while (currentScene >= 0)
      return false
    }

    const animationElements = () => {
      return scenes[currentScene].elements.map((element, index) => {
        return animationElement(aggregateElement(scenes, currentScene, index), index)
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