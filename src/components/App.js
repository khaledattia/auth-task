import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext';

import Signup from '../views/Signup';
import Login from '../views/Login';
import { PrivateRoute } from './PrivateRoute';
import Profile from '../views/Profile';
import Dashboard from '../views/Dashboard';
import { Container } from 'react-bootstrap';
function App() {

  return (
    <AuthProvider>
      <Container className = 'd-flex align-items-center justify-content-center' style={{minHeight: "100vh"}}>

        <Router>
          <Routes>

            {/* private routes */}
            <Route path = "/"          element = { <PrivateRoute component = { <Dashboard /> } /> } />
            <Route path = "/profile"   element = { <PrivateRoute component = { <Profile /> } /> } />

            {/* public routes routs */}
            <Route path = "/sign-up"   element = { <div className='w-100' style={{maxWidth: "400px"}}><Signup /></div> } />
            <Route path = "/login"   element = { <div className='w-100' style={{maxWidth: "400px"}}><Login /></div> } />
            <Route path = "/*"         element = { <div>page not found</div> } />

          </Routes>
        </Router>

      </Container>

    </AuthProvider>
  );
}

export default App;
