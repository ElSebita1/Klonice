import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../credenciales';

const Create = () => {
  const [Nombre, setNombre] = useState('');
  const [Categoria, setCategoria] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [Precio, setPrecio] = useState(0);
  const [Stock, setStock] = useState(0);
  const navigate = useNavigate();

  const productsCollection = collection(db, 'Categorias');
  const historialCollection = collection(db, 'Historial'); // Colección para registrar movimientos

  const store = async (e) => {
    e.preventDefault();
    await addDoc(productsCollection, {
      Nombre: Nombre,
      Categoria: Categoria,
      Descripcion: Descripcion,
      Precio: Precio,
      Stock: Stock
    });
    await addDoc(historialCollection, {
      accion: 'Creado',
      descripcion: `Se añadió el producto: ${Nombre}`,
      fecha: new Date().toISOString(),
    });
    navigate('/productos');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">CREAR PRODUCTO NUEVO</h2>
      <form className="shadow p-4" onSubmit={store} style={{ maxWidth: '600px', margin: '0 auto', borderRadius: '10px', background: '#f9f9f9' }}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input value={Nombre} onChange={(e) => setNombre(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <input value={Categoria} onChange={(e) => setCategoria(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea value={Descripcion} onChange={(e) => setDescripcion(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input value={Precio} onChange={(e) => setPrecio(Number(e.target.value))} type="number" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input value={Stock} onChange={(e) => setStock(Number(e.target.value))} type="number" className="form-control" />
        </div>
        <button type="submit" className="btn btn-success w-100">Almacenar</button>
        <Link to="/productos" className="btn btn-secondary w-100 mt-3">Volver a Productos</Link>
      </form>
    </div>
  );
};

export default Create;
