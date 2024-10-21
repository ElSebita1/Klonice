import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../credenciales';

const VistaGeneral = () => {
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalCategorias, setTotalCategorias] = useState(0);
  const [alertas, setAlertas] = useState(0);

  const getProductos = async () => {
    const productosSnapshot = await getDocs(collection(db, 'Categorias'));
    let totalStock = 0;
    const categorias = new Set();
    let productosAlertas = 0;

    productosSnapshot.forEach((doc) => {
      const data = doc.data();
      totalStock += data.Stock;

      // Añadir categoría única
      categorias.add(data.Categoria);

      // Productos con bajo stock (por ejemplo, menor a 10)
      if (data.Stock < 10) {
        productosAlertas++;
      }
    });

    setTotalProductos(totalStock);
    setTotalCategorias(categorias.size);
    setAlertas(productosAlertas);
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Vista General</h3>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-white mb-3" style={{ backgroundColor: '#6c5ce7' }}>
            <div className="card-body">
              <h5 className="card-title">Total de Productos</h5>
              <p className="card-text">{totalProductos}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white mb-3" style={{ backgroundColor: '#00cec9' }}>
            <div className="card-body">
              <h5 className="card-title">Total de Categorías</h5>
              <p className="card-text">{totalCategorias}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white mb-3" style={{ backgroundColor: '#e17055' }}>
            <div className="card-body">
              <h5 className="card-title">Alertas</h5>
              <p className="card-text">{alertas}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaGeneral;
