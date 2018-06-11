class IndecisionApp extends React.Component {
	constructor(props){
		super(props);
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handleDeleteOption = this.handleDeleteOption.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.state = {
			options: props.options
		};
	}

	componentDidMount() {
		try{
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);
			if (options){
				this.setState(() => ({ options: options }));
			}
		}catch(e) {
			// Do nothing
		}
    
    
	}
	componentDidUpdate(prevProps, prevState) {
		if  (prevState.options.length !== this.state.options.length){
			const json = JSON.stringify(this.state.options);
			localStorage.setItem('options', json);
		}
    
	}
	componentWillUnmount() {
		console.log('componentWillUnmount'); 
	}
  
	handleDeleteOptions() {
		// this.setState( () => {
		//   return {
		//     options: []
		//   };
		// });

		this.setState(() => ({ options: [] }));
	}

	handleDeleteOption(optionToRemove) {
    
		this.setState( (prevState) => ({
			option: prevState.options.splice(prevState.options.indexOf(optionToRemove), 1)
		}));
		// this.setState((prevState) => ({
		//   options: prevState.options.filter((option) => return optionToRemove !== option; )
		// }));
	}
	handlePick() {
		const num = Math.floor(Math.random() * this.state.options.length);
		console.log(this.state.options[num]);
		return this.state.options[num];
	}
	handleAddOption(option) {

		if(!option){
			return 'Add something';
		}else if(this.state.options.indexOf(option) > -1) {
			return 'This option already exists';
		}

		this.setState( (prevState) => ({
			options: prevState.options.concat(option)
		}));
	}
	render() {

		const subtitle = 'Put your life in the hands of a computer';
 

		return (
			<div>
				<Header  subtitle={subtitle}/>
				<Action handlePick={this.handlePick} hasOptions={this.state.options.length > 0} />
				<Options 
					options={this.state.options}
					handleDeleteOptions={this.handleDeleteOptions}
					handleDeleteOption={this.handleDeleteOption}
				/>
				<AddOption handleAddOption={this.handleAddOption}/>
			</div>
		);
	}
}

IndecisionApp.defaultProps = {
	options: []
};

const Header = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
			{props.subtitle && <h2>{props.subtitle}</h2>}
		</div>
	);
};

Header.defaultProps = {
	title: 'Indecision'
};
// class Header extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <h2>{this.props.subtitle}</h2>
//       </div>
//     );
//   }
// }

const Action = (props) => {
  
	return (
		<div>
			<button disabled={!props.hasOptions} onClick={props.handlePick}>What should I do?</button>  
		</div>
	);
};

// class Action extends React.Component {
  
//   render() {
//     return (
//       <div>
//         <button disabled={!this.props.hasOptions} onClick={this.props.handlePick}>What should I do?</button>  
//       </div>
//     );
//   }
// }

const Options = (props) => {

	return (
		<div>   
			<button onClick={props.handleDeleteOptions}>Remove All</button>
			{props.options.length === 0 && <p>Please add an option to get started!</p>}
			{
				props.options.map(
					(opt) => (
						<Option 
							key={opt} 
							optionText={opt}
							handleDeleteOption={props.handleDeleteOption}/>
					))
			}  
		</div>
	);
};


const Option = (props) => {
	return (
		<div>
			{ props.optionText}
			<button onClick={
				(e) => {props.handleDeleteOption(props.optionText);}
			}>X</button>
		</div>
	);
};
// class Option extends React.Component {
//   render() {
  
//   }
// }

class AddOption extends React.Component {
	constructor(props){
		super(props);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.state = {
			error: undefined
		};
	}
	handleAddOption(event) {
		event.preventDefault(); // prevent page refresh
      
		const option = event.target.elements.option.value.trim();
		const error = this.props.handleAddOption(option);
		this.setState( () => ({ error }));
    
		if (!error) {
			event.target.elements.option.value = '';
		}
   
	}
	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.handleAddOption}>
					<input type="text" name="option" />
					<button>Add Option</button>
				</form> 
			</div>
		);
	}
}


ReactDOM.render(<IndecisionApp options={['Jurereba', 'Costao']}/>, document.getElementById('app'));