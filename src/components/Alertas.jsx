import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../credenciales';

const Alertas = () => {
  const [alertas, setAlertas] = useState([]);

  const getProductosConAlerta = async () => {
    const productosSnapshot = await getDocs(collection(db, 'Categorias'));
    const productosCriticos = [];

    productosSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.Stock < 10) {
        productosCriticos.push({ ...data, id: doc.id });
      }
    });

    setAlertas(productosCriticos);
  };

  useEffect(() => {
    getProductosConAlerta();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Productos en estado crítico (menos de 10 existencias)</h3>
      {alertas.length > 0 ? (
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {alertas.map((product) => (
              <tr key={product.id}>
                <td>{product.Nombre}</td>
                <td>{product.Categoria}</td>
                <td>{product.Descripcion}</td>
                <td>{product.Precio}</td>
                <td>{product.Stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay productos con stock crítico.</p>
      )}
    </div>
  );
};

export default Alertas;
