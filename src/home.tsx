import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div id="home-container"> {/* Added ID for the container */}
      <div className="jumbotron"> {/* Using Bootstrap classes */}
        <h1 id="home-title">Gestione Utenti</h1>
        <p id="home-description">
          Un esempio di applicazione web realizzata con Spring Boot, Spring
          Security, Spring Data JPA e JSF
        </p>
        <p id="home-spring-link">
          The Spring Side <a href="http://www.thespringside.com">www.thespringside.com</a>
        </p>
        <div id="home-buttons">
          <Link to="/login" className="btn btn-lg btn-info" id="login-button">
            Accedi »
          </Link>
          <Link
            to="/registrazione"
            className="btn btn-lg btn-info"
            id="register-button"
          >
            Registrati »
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;