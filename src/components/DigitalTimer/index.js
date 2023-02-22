// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimerRunning: false, timeInSeconds: 0, timerLimitInMinutes: 25}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeInSeconds} = this.state
    const isButtonsDisabled = timeInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="para">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="value-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timeInSeconds: 0,
      timerLimitInMinutes: 25,
    })
  }

  incrementTimeInSeconds = () => {
    const {timerLimitInMinutes, timeInSeconds} = this.state
    const isTimerCompleted = timeInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeInSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const stateOrPauseImg = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const stateOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="button"
          type="button"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={stateOrPauseImg}
            alt={stateOrPauseAltText}
            className="icon"
          />
          <p className="timer-label">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button className="button" onClick={this.onResetTimer} type="button">
          <img
            alt="reset icon"
            className="icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-label">Reset</p>
        </button>
      </div>
    )
  }

  getTime = () => {
    const {timeInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds = timerLimitInMinutes * 60 - timeInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const timerStatus = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="bg-container">
        <div className="app-container">
          <h1>Digital Timer</h1>
          <div className="digital-timer-container">
            <div className="display-time-container">
              <div className="timer-container">
                <h1 className="timer">{this.getTime()}</h1>
                <p className="timer-status">{timerStatus}</p>
              </div>
            </div>
            <div className="controllers-container">
              {this.renderTimerController()}
              {this.renderTimerLimitController()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
