import React, { useState, useEffect } from 'react';
import {Link, NavLink, Outlet, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useAuth} from "./useAuth.tsx"; // Assuming you'll use Axios for HTTP requests

const LayoutPrivato: React.FC = () => {
  const [utenteConnesso, setUtenteConnesso] = useState(''); 
  const navigate = useNavigate();
  const auth = useAuth()

  useEffect(() => {
    const fetchUtente = async () => {
      try {
        // Replace with your actual endpoint to get user data
        const response = await axios.get('/api/user');
        setUtenteConnesso(response.data.username ?? auth.username ); // Assuming the username is in response.data.username
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error, maybe redirect to login?
      }
    };

    fetchUtente();
  }, []);

  const handleLogout = async () => {
    try {
      // Replace with your actual logout endpoint
      auth.logout()
      // Redirect to login or home page after logout
      navigate('/login'); 
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout error
    }
  };

  return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" id="navBarId">
          <div className="container">
            <div className="navbar-header">
              <NavLink className="navbar-brand" to="/home" id="brandId">Gestione Utenti</NavLink>
            </div>
            <ul className="nav navbar-nav" id="navLinks1Id">
              <li>
                <a href="#" id="theSpringSideId">The Spring Side</a>
              </li>
              <li className="dropdown" id="dropdownId">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#" id="dropdownToggleId">
                  Utenti <span className="caret" id="caretSpanId"></span>
                </a>
                <ul className="dropdown-menu" id="dropdownMenuId">
                  <li>
                    <Link to="/registrazione" id="registrazioneLinkId">Registrazione</Link>
                  </li>
                  <li>
                    <Link to="/secure/listaUtenti" id="listaUtentiLinkId">Lista Utenti</Link>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="navbar-form navbar-right" id="formId">
              <div className="form-group" id="formGroupId">
                <span id="outputTextId"></span> {/* Placeholder for h:outputText */}
              </div>
              <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleLogout}
                  id="logoutButtonId"
              >
                logout <i className="glyphicon glyphicon-chevron-right" id="logoutIconId"></i>
              </button>
            </form>
            <ul className="nav navbar-nav navbar-right" id="navLinks2Id">
              <li>
                <a href="#" id="utenteConnessoLinkId">
                  <i className="glyphicon glyphicon-user" id="userIconId"></i> {utenteConnesso}
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main style={{paddingTop: '50px', paddingBottom: '20px'}}>
          <Outlet/>
        </main>

        <div className="container" id="footerContainerId">
          <hr id="hr2Id"/>
          <footer id="footer2Id">
            <p id="copyright2Id">©TheSpringSide 2016</p>
          </footer>
        </div>
        {/* This renders the nested route components */}
      </div>
  );
};

export default LayoutPrivato;