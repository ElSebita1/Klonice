import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-klonice.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faTags, faBell, faHistory, faChartBar } from '@fortawesome/free-solid-svg-icons';

const Barrita = ({ alertCount }) => {
  return (
    <div className="bg-dark text-white p-3 d-flex flex-column" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="text-center mb-4">
        <img src={logo} alt="Logo" style={{ width: '80px', height: 'auto' }} />
        <h4 className="mt-3">Gestión de inventario</h4>
      </div>

      <ul className="nav flex-column flex-grow-1">
        <li className="nav-item mb-3">
          <Link to="/" className="nav-link text-white">
            <FontAwesomeIcon icon={faHome} className="me-2" /> Vista general
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/productos" className="nav-link text-white">
            <FontAwesomeIcon icon={faBox} className="me-2" /> Productos
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/categorias" className="nav-link text-white">
            <FontAwesomeIcon icon={faTags} className="me-2" /> Categorías
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/alertas" className="nav-link text-white">
            <FontAwesomeIcon icon={faBell} className="me-2" />
            Alertas {alertCount > 0 && <span className="badge bg-danger ms-2">{alertCount}</span>}
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link to="/historial" className="nav-link text-white">
            <FontAwesomeIcon icon={faHistory} className="me-2" /> Historial de movimientos
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Barrita;
