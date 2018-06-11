
class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.addOne = this.addOne.bind(this);
		this.minusOne = this.minusOne.bind(this);
		this.reset = this.reset.bind(this);
		this.state = {
			count: props.count
		};
	}
	componentDidMount() {
		try {
			const json = localStorage.getItem('count');
			const count = +JSON.parse(json);
			console.log('c', count);
			this.setState(() => ({count: count}));
		} catch(e) {
			// Do nothing
			console.log(e);
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if  (prevState.count != 0){
			const json = JSON.stringify(this.state.count);
			localStorage.setItem('count', json);
		}
    
	}
	addOne() {
		this.setState(
			(prevState) => {
				return{
					count: prevState.count+1
				};
			}
		);
	}
	minusOne() {
		this.setState(
			(prevState) => {
				return{
					count: prevState.count-1
				};
			}
		);
	}
	reset() {
		this.setState(
			() => {
				return{
					count: 0
				};
			}
		);
	}
	render() {
		return (
			<div>
				<h1>Count: {this.state.count}</h1>
				<button onClick={this.addOne}>+1</button>
				<button onClick={this.minusOne}>-1</button>
				<button onClick={this.reset}>Reset</button>
			</div>
		);
	}
}
Counter.defaultProps = {
	count: 0
};
ReactDOM.render(<Counter />, document.getElementById('app'));
