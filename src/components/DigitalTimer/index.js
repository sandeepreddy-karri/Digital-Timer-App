// Write your code here
// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timerLimitInMinutes: 25,
  timeElapsedInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecrement = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitControlSection = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-control-section">
        <p className="timer-limit-heading">Set Timer Limit</p>
        <div className="plus-or-minus-container">
          <button
            className="minus-button"
            type="button"
            disabled={isButtonsDisabled}
            onClick={this.onDecrement}
          >
            -
          </button>
          <div className="time-count">
            <p className="timer-limit-text-display">{timerLimitInMinutes}</p>
          </div>
          <button
            className="plus-button"
            type="button"
            disabled={isButtonsDisabled}
            onClick={this.onIncrement}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onClickReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  onClickStartOrPause = () => {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerControlSection = () => {
    const {isTimerRunning} = this.state

    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltImgText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="start-reset-timer-controller-section">
        <button
          className="button"
          type="button"
          onClick={this.onClickStartOrPause}
        >
          <img
            src={startOrPauseImageUrl}
            alt={startOrPauseAltImgText}
            className="start-or-pause-images"
          />
          <p className="start-or-pause-text">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button className="button" type="button" onClick={this.onClickReset}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="reset-image"
          />
          <p className="reset-text">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedTimeInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state

    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const label = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="main-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="image-time-container">
          <div className="image-container">
            <div className="stop-watch-time-container">
              <h1 className="time-display">{this.getElapsedTimeInSeconds()}</h1>
              <p className="timer-state">{label}</p>
            </div>
          </div>
          <div className="timer-setting-container">
            {this.renderTimerControlSection()}
            {this.renderTimerLimitControlSection()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
