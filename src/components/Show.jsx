import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../credenciales';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Show = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('');

  const productsCollection = collection(db, 'Categorias');
  const historialCollection = collection(db, 'Historial'); // Colección para registrar movimientos

  // Obtener los productos desde Firestore
  const getProducts = async () => {
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Registrar movimientos en la colección 'Historial'
  const registrarMovimiento = async (accion, descripcion) => {
    await addDoc(historialCollection, {
      accion: accion,
      descripcion: descripcion,
      fecha: new Date().toISOString(), // Fecha actual en formato ISO
    });
  };

  // Eliminar un producto y registrar el movimiento
  const deleteProduct = async (id, nombre) => {
    await deleteDoc(doc(db, 'Categorias', id));
    await registrarMovimiento('Eliminado', `Se eliminó el producto: ${nombre}`);
    getProducts();
  };

  // Confirmación con SweetAlert antes de eliminar
  const confirmDelete = (id, nombre) => {
    Swal.fire({
      title: 'Eliminar este producto?',
      text: 'El producto no se podrá recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id, nombre);
        Swal.fire('Borrado!', 'Tu producto ha sido eliminado.', 'success');
      }
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Filtrar por categoría y término de búsqueda
  const filteredProducts = products.filter((product) => {
    return (
      product.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategoria === '' || product.Categoria === filterCategoria)
    );
  });

  // Obtener las categorías únicas
  const categoriasUnicas = [...new Set(products.map((product) => product.Categoria))];

  // Determinar el estado del stock (con clases de Bootstrap)
  const getEstado = (stock) => {
    if (stock < 10) {
      return <span className="badge bg-danger" style={{ borderRadius: '50%', padding: '10px' }}></span>; // Rojo
    } else if (stock >= 10 && stock <= 20) {
      return <span className="badge bg-warning" style={{ borderRadius: '50%', padding: '10px' }}></span>; // Amarillo
    } else {
      return <span className="badge bg-success" style={{ borderRadius: '50%', padding: '10px' }}></span>; // Verde
    }
  };

  return (
    <div className="container-fluid mt-4" style={{ backgroundColor: '#F0F0F0', minHeight: '100vh', padding: '20px', borderRadius: '8px' }}>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <Link to="/create" className="btn btn-success me-2" style={{ padding: '10px 20px', fontSize: '18px', backgroundColor: '#a200ff' }}>Crear</Link>
          <input
            type="text"
            className="form-control d-inline-block"
            placeholder="Buscar producto..."
            style={{ width: '300px', fontSize: '18px', padding: '10px' }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="form-control d-inline-block ms-2"
            style={{ width: '300px', fontSize: '18px', padding: '10px' }}
            onChange={(e) => setFilterCategoria(e.target.value)}
          >
            <option value="">Filtrar por categoría</option>
            {categoriasUnicas.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.Nombre}</td>
              <td>{product.Categoria}</td>
              <td>{product.Descripcion}</td>
              <td>{product.Precio}</td>
              <td>{product.Stock}</td>
              <td>
                {getEstado(product.Stock)} 
              </td>
              <td>
                <Link to={`/edit/${product.id}`} className="btn btn-light me-2">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <button
                  onClick={() => confirmDelete(product.id, product.Nombre)}
                  className="btn btn-danger"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Show;
