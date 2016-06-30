import React from 'react'
import R from 'ramda'

class AnimationWindow extends React.Component {
  componentWillMount() {
    let {frameStart, scenes, transitionSpeed} = this.props

    let framesTotal = 0
    let elementIds = {}
    scenes.forEach((scene) => {
      if (typeof frameStart === 'string' && frameStart === scene.name) {
        frameStart = framesTotal
      }
      Object.keys(scene.elements).forEach((key) => {elementIds[key] = true})
      framesTotal += scene.frames
    })
    elementIds = Object.keys(elementIds)

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
      defaultStyles,
      elementIds
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
    const {frame, defaultStyles, elementIds} = this.state
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

    const animationElement = (element, elementId) => {
      if (element) {
        const {content} = element
        return (
          <div key={elementId} style={{...defaultStyles, ...element.style}}>{content ? content : null}</div>
        )
      }
    }

    const aggregateElement = (scenes, currentScene, elementId) => {
      let style = {}
      let searchScene = currentScene
      do {
        let element = R.clone(scenes[searchScene].elements[elementId])
        if (typeof element === 'undefined') element = true
        if (typeof element === 'object') {
          if (element.removeAfterScene && searchScene !== currentScene) {
            return false
          }
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
        searchScene--
      } while (searchScene >= 0)
      return false
    }

    const animationElements = () => {
      return elementIds.map((elementId) => {
        return animationElement(aggregateElement(scenes, currentScene, elementId), elementId)
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