import React from 'react';
import '../src/App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Show from './components/Show.jsx';
import Edit from './components/Edit.jsx';
import Create from './components/Create.jsx';
import Layout from './components/Layout';
import VistaGeneral from './components/VistaGeneral';
import Barrita from './components/Barrita';
import Alertas from './components/Alertas';
import HistorialMovimientos from './components/HistorialMovimientos';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<VistaGeneral />} />
            <Route path="/productos" element={<Show />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/alertas" element={<Alertas />} />
            <Route path="/historial" element={<HistorialMovimientos />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
