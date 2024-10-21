import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getDoc, updateDoc, doc, addDoc, collection } from 'firebase/firestore';
import { db } from '../credenciales';

const Edit = () => {
  const [Nombre, setNombre] = useState('');
  const [Categoria, setCategoria] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [Precio, setPrecio] = useState(0);
  const [Stock, setStock] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();
  const historialCollection = collection(db, 'Historial'); 

  const update = async (e) => {
    e.preventDefault();
    const product = doc(db, 'Categorias', id);
    const data = {
      Nombre: Nombre,
      Categoria: Categoria,
      Descripcion: Descripcion,
      Precio: Precio,
      Stock: Stock
    };
    await updateDoc(product, data);
    await addDoc(historialCollection, {
      accion: 'Actualizado',
      descripcion: `Se actualizó el producto: ${Nombre}`,
      fecha: new Date().toISOString(),
    });
    navigate('/productos');
  };

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, 'Categorias', id));
    if (product.exists()) {
      const productData = product.data();
      setNombre(productData.Nombre);
      setCategoria(productData.Categoria);
      setDescripcion(productData.Descripcion);
      setPrecio(productData.Precio);
      setStock(productData.Stock);
    } else {
      console.log('El producto no existe');
    }
  };

  useEffect(() => {
    getProductById(id);
  }, [id]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edita este producto</h2>
      <form className="shadow p-4" onSubmit={update} style={{ maxWidth: '600px', margin: '0 auto', borderRadius: '10px', background: '#f9f9f9' }}>
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
        <button type="submit" className="btn btn-primary w-100">Actualizar</button>
        <Link to="/productos" className="btn btn-secondary w-100 mt-3">Volver a Productos</Link>
      </form>
    </div>
  );
};

export default Edit;
