
class VisibilityApp extends React.Component {
   

   
    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <Action/>
            </div>
        );
    };
}

class Action extends React.Component {
     
    constructor(props){
        super(props);
        this.toggleDetails = this.toggleDetails.bind(this);
        this.state = {
            clickStatus: false
        };
    }
    toggleDetails() {
        // this.props.clickStatus = !this.props.clickStatus;
        // clickStatus = !clickStatus;
        this.setState( (prevState) => {
            return{
                clickStatus: !prevState.clickStatus
            };
        });
        console.log(this.state.clickStatus);
        
    }

    render() {
        return (
            <div>
            <button onClick={this.toggleDetails}>{this.state.clickStatus? 'Hide details':'Show details'}</button>
            {this.state.clickStatus && <p>ALOW</p>}
            </div>
        );
    }
}
ReactDOM.render(<VisibilityApp/>, document.getElementById('app'));

