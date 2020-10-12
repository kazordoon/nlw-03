import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import logoImg from './assets/images/logo.svg';
import './assets/styles/pages/landing.css';

function App() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="logo" />

        <main>
          <h1>Leve a felicidade para o mundo.</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Salvador</strong>
          <span>Bahia</span>
        </div>

        <a href="#" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </a>
      </div>
    </div>
  );
}

export default App;
