import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../credenciales';

const HistorialMovimientos = () => {
  const [movimientos, setMovimientos] = useState([]);

  const historialCollection = collection(db, 'Historial');

  // Función para obtener los movimientos desde Firestore
  const getMovimientos = async () => {
    const data = await getDocs(historialCollection);
    setMovimientos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getMovimientos();
  }, []);

  // Determinar el color basado en el tipo de acción
  const getColor = (accion) => {
    if (accion === 'Eliminado') {
      return 'bg-danger'; // Rojo para eliminaciones
    } else if (accion === 'Actualizado') {
      return 'bg-info'; // Verde para adiciones
    }
    return 'bg-success'; // Color neutro por defecto
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Historial de Movimientos</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Acción</th>
            <th>Descripción</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((movimiento) => (
            <tr key={movimiento.id}>
              <td>
                <span className={`badge ${getColor(movimiento.accion)} p-2`}>
                  {movimiento.accion}
                </span>
              </td>
              <td>{movimiento.descripcion}</td>
              <td>{new Date(movimiento.fecha).toLocaleString()}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialMovimientos;
