import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import TimerCountdown from 'react-native-timer-countdown';

const INITIAL_ROUND_TIME = 180000;
const INITIAL_BREAK_TIME = 30000;

export default class App extends React.Component {
  state = {
    round: 1,
    isBreak: false,
    time: INITIAL_ROUND_TIME,
  };

  _roundOver() {
    if (!this.state.isBreak) {
      this.setState({
        isBreak: true,
        time: INITIAL_BREAK_TIME,
      });
    }
    else {
      this.setState({
        round: this.state.round + 1,
        isBreak: false,
        time: INITIAL_ROUND_TIME,
      });
    }
  }

  _reset() {
    this.setState({
      round: 1,
      isBreak: false,
      time: INITIAL_ROUND_TIME,
    });
  }

  render() {
    const {
      round,
      time,
      isBreak,
    } = this.state;

    return (
      <View style={styles.container}>
        <TimerCountdown
          initialSecondsRemaining={time}
          onTick={secondsRemaining => console.log("tick", secondsRemaining)}
          onTimeElapsed={() => this._roundOver()}
          allowFontScaling={true}
          style={styles.timerCountdown}
        />
        <Text style={styles.roundIndicator}>
          {isBreak
            ? 'Break!'
            : `Round ${round}`
          }
        </Text>
        <Button
          title='🔄'
          onPress={() => this._reset()}
          style={styles.resetButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerCountdown: {
    fontSize: 72,
  },
  roundIndicator: {
    fontSize: 36,
  },
  resetButton: {
    fontSize: 36,
  },
});
