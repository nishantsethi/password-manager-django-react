import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

import DashboardScreen from "./screens/DashboardScreen";

function App() {
  return (
    <Router className="App">
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login/' component={LoginScreen} />
          <Route path='/register/' component={RegisterScreen} />
          <Route path='/profile/' component={ProfileScreen} />
          <Route path='/dashboard/' component={DashboardScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
