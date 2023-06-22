import logo from './logo.svg';
import './App.css';
import Playcanvas from './Playcanvas';

function App() {
  const pc = new Playcanvas();
  pc.connectToIframe();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <iframe title="iframe" id="game-iframe" src="https://playcanvas-test-eight.vercel.app/" />
    </div>
  );
}

export default App;
