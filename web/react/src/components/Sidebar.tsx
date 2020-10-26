import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import '../assets/styles/components/sidebar.css';
import mapMarkerImg from '../assets/images/map-marker.svg';

const Sidebar: React.FC = () => {
  const { goBack } = useHistory();

  return (
    <aside className="app-sidebar">
      <Link to="/">
        <img src={mapMarkerImg} alt="Happy" />
      </Link>

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;
