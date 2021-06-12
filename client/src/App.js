import { BrowserRouter as Router, Route } from "react-router-dom";
// pages
import Join from "./pages/Join";
import Chatroom from "./pages/Chatroom";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chatroom" component={Chatroom} />
    </Router>
  );
}

export default App;
