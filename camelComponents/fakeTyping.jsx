import React from 'react'

class FakeTyping extends React.Component {
  componentWillMount () {
    this.setState({
      actualLine: 0,
      actualOffset: 0,
      mode: 'wait',
      actualString: this.props.lines[0],
      actualWaitingTime: 0
    })
  }

  componentDidMount () {
    this.continueFakeTyping()
  }
  componentDidUpdate () {
    this.continueFakeTyping()
  }

  continueFakeTyping () {
    const {lines, timeAfterCharacter, timeAfterWord} = this.props
    const waitingIterations = Math.ceil(timeAfterWord / timeAfterCharacter)
    let {actualLine, actualString, actualOffset, mode, actualWaitingTime} = this.state

    setTimeout(() => {

      switch (mode) {
        case 'deleteActualLine':
          actualOffset++

          // end of mode
          if (actualOffset > lines[actualLine].length) {
            actualLine++
            if (actualLine >= lines.length) {
              actualLine = 0
            }
            actualOffset = 0

            actualOffset = lines[actualLine].length
            mode = 'typeActualLine'
          }
          break
        case 'typeActualLine':
          actualOffset--

          // end of mode
          if (actualOffset === 0) {
            mode = 'wait'
          }
          break
        case 'wait': actualWaitingTime++

          // end of mode
          if (actualWaitingTime >= waitingIterations) {
            actualWaitingTime = 0
            mode = 'deleteActualLine'
          }
          break
      }

      let line = lines[actualLine]
      actualString = line.substr(0, line.length - actualOffset)

      this.setState({
        actualString,
        actualOffset,
        actualLine,
        actualWaitingTime,
        mode
      })
    }, timeAfterCharacter)
  }

  render () {
    let {actualString} = this.state
    return (
      <span>{actualString}<span className='animate-flicker'>|</span></span>
    )
  }
}

export {
  FakeTyping
}