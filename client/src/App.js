import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <form>
      <label>
        Username:
      </label>
      <input type="text" name="username"/>
      <label>
        Password:
      </label>
      <input type="password" name="password"/>
      <input type="submit"/>
      </form>
    </div>
  );
}

export default App;
