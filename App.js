import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import moment from 'moment';

const INITIAL_ROUND_TIME = 180000;
const INITIAL_BREAK_TIME = 30000;

class Count extends React.Component {
	render() {
    const formatted = moment.utc(this.props.time).format('mm:ss');
		return (
      <View>
        <Text style={styles.timer}>{formatted}</Text>
      </View>
		);
	}
}

export default class App extends React.Component {
	constructor() {
		super();
		this.state={
      time: INITIAL_ROUND_TIME,
      round: 1,
      isBreak: false,
			isTicking : false,
		};
	}

	componentDidMount() {
		this.interval = setInterval(this._tick, 1000);
	}

	_tick = () => {
		if(this.state.isTicking) {
			if(this.state.time > 0) {
				this.setState(prevState => ({ time : prevState.time - 1000 }));
			};
			if(this.state.time === 0) {
				this.setState({
          time: this.state.isBreak ? INITIAL_ROUND_TIME : INITIAL_BREAK_TIME,
          round: this.state.isBreak ? this.state.round + 1 : this.state.round,
          isBreak: !this.state.isBreak,
        });
			}
		}
	}

	_startTimer = () => {
		this.setState({ isTicking : true })
	}

	_pauseTimer = () => {
		this.setState({ isTicking : false })
	}

  _resetTimer = () => {
    this.setState({
      time: INITIAL_ROUND_TIME,
      round: 1,
      isTicking : false,
    });
  }

	render() {
    const {
      time,
      round,
      isTicking,
      isBreak,
    } = this.state;

		return (
			<View style={styles.container}>
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <Text style={styles.roundIndicator}>
            {isBreak ? 'Break' : 'Round'} {round}
          </Text>
        </View>
				<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
					<Count time={this.state.time} sec={this.state.sec}/>
				</View>
				<View style={styles.buttons}>
          {isTicking ? (
            <Button title='⏸' onPress={this._pauseTimer} />
          ) : (
            <Button title='▶️' onPress={this._startTimer} />
          )}
					<Button title='🔄' onPress={this._resetTimer} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
  timer: {
    fontSize: 70,
  },
  roundIndicator: {
    fontSize: 36,
  },
  buttons: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 1,
    fontSize: 36,
    alignItems: 'center',
  }
})
