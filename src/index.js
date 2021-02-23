import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Calculator from './temperature';

function formatName(user) {
  return user.firstName + ' ' + user.lastName; 
}

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>
  }
  return <h1>Hello, Stranger!</h1>
}

const user = {
  firstName: 'Bill',
  lastName: 'The Shill',
  avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Future_USS_Zumwalt%27s_first_underway_at_sea.jpg/2560px-Future_USS_Zumwalt%27s_first_underway_at_sea.jpg'
};

const element = (
  <div>
    <img src={user.avatarUrl} width="800" height="600"></img>
    <img src="logo512.png" width="128" height="128"></img>
    <h1>
      Hello, {formatName(user)}!
  </h1>
  </div>
  
);

// one way of declaring a component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// ES6 class way of declaring a component
class Goodbye extends React.Component {
  render() {
    return <h1>Goodbye, {this.props.name}</h1>;
  }
}

function App() {
  return  (
    <div>
      <FlavorForm />
      <Welcome name="MacGuyver" />
      <Welcome name="McGruber" />
      <Reservation />
      <Welcome name="MacDonald" />
      <Goodbye name="MacCoullch" />
      <EssayForm />
      <Clock />
      <Clock />
      <Clock />
      <Toggle />
      <NumberList numbers={numbers} />
      <CarList cars={cars}/>
      <NameForm />
      <Calculator />
    </div>
  );
}

// Clock example
// function tick() {
//   const element = (
//     <div>
//       <h1>Yo world</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(element, document.getElementById('root'));
// }
// setInterval(tick, 1000);
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    // you can also put the setState in here...
    // not sure why it's kicked into another lifecycle function
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Yo world</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

// function tick() {
//   ReactDOM.render(
//     <Clock date={new Date()} />,
//     document.getElementById('root')
//   );
// }
// setInterval(tick, 1000);

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggle: true};

    // this bind is necessary to 'this' work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];

function CarList(props) {
  const cars = props.cars;
  const listCars = cars.map((car) =>
    <li>{car}</li>
  )
  return (
    <ul>{listCars}</ul>
  )
}
const cars = ['Honda', 'Tesla', 'Toyota'];

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ', this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay: 
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>
    )
  }
}

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select> 
        </label>
      </form>
    )
  }
}

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
