import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

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
      <Welcome name="MacGuyver" />
      <Welcome name="McGruber" />
      <Welcome name="MacDonald" />
      <Goodbye name="MacCoullch" />
      <Clock />
      <Clock />
      <Clock />
      <Toggle />
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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
