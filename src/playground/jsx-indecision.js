
// JSX - JavaScript XML
const app = {
    title: 'Indecision app',
    subtitle: 'An app',
    options: ['One', 'Two']
  }
  
  // const fullname = 'Alex Bert'
  // const getFirstName = (fullname) => fullname.split(' ')[0]
  // console.log(getFirstName(fullname));
  
  // const multiplier = {
  //     numbers: [2,3,4,5,6],
  //     multiplyBy: 2,
  //     multiply() {
  //         return this.numbers.map(
  //             (number) => number*this.multiplyBy
  //         );
  //     }
  // };
  
  const onFormSubmit = (event) => {
    event.preventDefault() // prevent page refresh
      
    const option = event.target.elements.option.value
  
    if (option) {
      app.options.push(option)
      event.target.elements.option.value = ''
      render()
    }
  }
  
  const wipeOptions = () => {
    app.options = []
    render()
  }
  
  const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length)
    const option = app.options[randomNum]
    alert(option)
  }
  const appRoot = document.getElementById('app')
  //ReactDOM.render(template, appRoot);
  
  const render = () => {
    const template2 = (
      <div>
        <h1>{app.title}</h1>
        {<p>{true && app.subtitle}</p>}
        {app.options.length > 0 ? <p>Here are your options:</p> : <p>No options</p> }
        <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
        <button onClick={wipeOptions}>Remove All</button>
        <ol>
          {
            app.options.map(
              (option) => {
                return <li key={option}>{option}</li> 
              }
            )
          }
        </ol>
        <form onSubmit={onFormSubmit}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>)
    ReactDOM.render(template2, appRoot)
  }
  
  render()
  