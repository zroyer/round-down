import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import moment from 'moment';

const INITIAL_ROUND_TIME = 180000;
const INITIAL_BREAK_TIME = 30000;

class Count extends React.Component {
	render() {
    const formattedTime = moment.utc(this.props.time).format('mm:ss');
		return (
      <View>
        <Text style={styles.timer}>{formattedTime}</Text>
      </View>
		);
	}
}

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
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
			}
			if(this.state.time === 0) {
				this.setState({
          time: this.state.isBreak ? INITIAL_ROUND_TIME : INITIAL_BREAK_TIME,
          round: this.state.isBreak ? this.state.round + 1 : this.state.round,
          isBreak: !this.state.isBreak,
        });
			}
		}
	}

	_toggleTimer = () => {
		this.setState({ isTicking : !this.state.isTicking })
	}

  _resetTimer = () => {
    this.setState({
      time: INITIAL_ROUND_TIME,
      round: 1,
      isTicking : false,
    });
  }

  _viewStyle = () => {
    const viewStyle = {
  		flex: 1,
      justifyContent: 'center',
  		backgroundColor: '#00BB6D',
  	};

    if (this.state.isBreak) {
      viewStyle.backgroundColor = '#007BFF';
    }

    if (!this.state.isTicking) {
      viewStyle.backgroundColor = '#A41EDD';
    }

    return viewStyle;
  }

	render() {
    const {
      time,
      round,
      isTicking,
      isBreak,
    } = this.state;

		return (
			<TouchableOpacity style={this._viewStyle()} onPress={this._toggleTimer}>
        <View style={styles.container}>
          <Text style={styles.roundIndicator}>
            {isBreak ? 'Break' : 'Round'} {round}
          </Text>
        </View>
				<View style={styles.container}>
					<Count time={this.state.time} sec={this.state.sec}/>
				</View>
				<View style={styles.buttons}>
					<Button title='🔄' onPress={this._resetTimer} />
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timer: {
    fontSize: 90,
    color: '#fff',
  },
  roundIndicator: {
    fontSize: 36,
    color: '#fff',
  },
  buttons: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 1,
    fontSize: 36,
    alignItems: 'center',
  }
})
