import React, { useState, useEffect } from 'react';
import {Link, NavLink, Outlet} from 'react-router-dom';
import axios from 'axios'; // Assuming you'll use Axios for HTTP requests

const LayoutPubblico: React.FC = () => {
  const [utenteConnesso, setUtenteConnesso] = useState<string | null>(null);

  useEffect(() => {
    // Fetch utenteConnesso (e.g., from local storage or API)
    const fetchUtenteConnesso = async () => {
      // Replace with your actual logic to fetch user data
      try {
        const response = await axios.get('/api/user'); // Example API endpoint
        setUtenteConnesso(response.data.username); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUtenteConnesso();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/logout'); // Example logout API endpoint
      setUtenteConnesso(null);
      // Optionally redirect to login or home page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavLink className="navbar-brand" to="/home">Gestione Utenti</NavLink>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
                <a href="#">The Spring Side</a>
              </li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Utenti <b className="caret"></b></a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/login">Login</Link> 
                  </li>
                  <li>
                    <Link to="/registrazione">Registrazione</Link>
                  </li>
                  <li>
                    <Link to="/secure/listaUtenti">Lista Utenti</Link>
                  </li>
                </ul>
              </li>
            </ul>
            {utenteConnesso ? (
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#" onClick={handleLogout}>Logout</a>
                </li>
                <li>
                  <a href="#">{utenteConnesso}</a> {/* Display logged-in username */}
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>

      <div className="container" style={{ marginTop: '50px', marginBottom: '20px' }}>
        <Outlet /> {/* Use Outlet for nested routes */}
      </div>

      <footer>
        <div className="container">
          <hr />
          <p>©TheSpringSide 2016</p>
        </div>
      </footer>
    </div>
  );
};

export default LayoutPubblico;