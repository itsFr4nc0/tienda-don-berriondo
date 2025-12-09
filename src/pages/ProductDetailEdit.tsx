import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import type { Producto } from "../context/CartContext";
import "./ProductDetail.css";

const categorias = ["Hogar", "Papelería", "Tecnología", "Accesorios personales", "Deporte"];

const ProductDetailEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [stock, setStock] = useState("");

  // Cargar producto actual
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/products/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");

        const data: Producto = await res.json();
        
        setNombre(data.nombre || "");
        setCategoria(data.categoria || "");
        setDescripcion(data.descripcion || "");
        setPrecio(data.precio?.toString() || "");
        setImagen(data.imagen || "");
        setStock(data.stock?.toString() || "");
      } catch (err) {
        setError("No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleGuardar = async () => {
    if (!nombre.trim() || !categoria || !descripcion.trim() || !precio || !imagen.trim() || !stock) {
      toast.error("Todos los campos son obligatorios", { position: "top-right" });
      return;
    }

    const precioNum = parseFloat(precio);
    const stockNum = parseInt(stock, 10);

    if (isNaN(precioNum) || precioNum <= 0) {
      toast.error("El precio debe ser válido", { position: "top-right" });
      return;
    }

    if (isNaN(stockNum) || stockNum < 0) {
      toast.error("El stock debe ser válido", { position: "top-right" });
      return;
    }

    setGuardando(true);

    try {
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");
      const token = loggedUser.token;

      if (!token) {
        toast.error("No estás autenticado", { position: "top-right" });
        return;
      }

      const res = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          categoria,
          descripcion,
          precio: precioNum,
          imagen,
          stock: stockNum,
        }),
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error al actualizar");
        } else {
          throw new Error(`Error ${res.status}: Verifica el backend`);
        }
      }

      toast.success("Producto actualizado correctamente", {
        position: "top-right",
        autoClose: 2500,
      });

      setTimeout(() => {
        navigate("/");
      }, 2500);

    } catch (err: any) {
      toast.error(err.message, { position: "top-right" });
    } finally {
      setGuardando(false);
    }
  };

  if (loading) {
    return (
      <div className="producto-no-encontrado">
        <h2>Cargando producto...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="producto-no-encontrado">
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate("/")}>Volver al inicio</button>
      </div>
    );
  }

  return (
    <motion.div
      className="product-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="product-detail-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.button
          className="btn-volver"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Volver sin guardar
        </motion.button>

        <motion.div
          className="product-detail-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: "flex",
            gap: "25px",
          }}
        >
          {/* IMAGEN ─────────────── */}
          <motion.div
            className="product-image-section"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              maxWidth: "400px",
              width: "100%",
            }}
          >
            {/* CONTENEDOR SCROLLEABLE PARA LA IMAGEN */}
            <div
              style={{
                maxHeight: "450px",
                overflowY: "auto",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            >
              <motion.img
                src={imagen || "https://via.placeholder.com/400"}
                alt={nombre}
                className="product-main-image"
                whileHover={{ scale: 1.05 }}
                style={{
                  width: "100%",
                  display: "block",
                }}
              />
            </div>

            {/* INPUT DE URL — SIEMPRE VISIBLE */}
            <input
              type="text"
              placeholder="URL de la imagen"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "10px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
                background: "white",
              }}
            />
          </motion.div>

          {/* FORMULARIO ─────────────── */}
          <motion.div
            className="product-info-section"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.span
              className="product-category-badge"
              style={{ backgroundColor: "#e74c3c", color: "white" }}
            >
              MODO EDICIÓN
            </motion.span>

            <label style={{ fontWeight: "bold", marginTop: "20px", display: "block" }}>
              Nombre del producto:
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #3498db",
                borderRadius: "8px",
                fontSize: "18px",
                marginBottom: "15px",
                fontWeight: "bold",
              }}
            />

            <label style={{ fontWeight: "bold", display: "block" }}>Categoría:</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #3498db",
                borderRadius: "8px",
                fontSize: "16px",
                marginBottom: "15px",
              }}
            >
              <option value="">Seleccionar categoría</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label style={{ fontWeight: "bold", display: "block" }}>Descripción:</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #3498db",
                borderRadius: "8px",
                fontSize: "16px",
                marginBottom: "15px",
                resize: "vertical",
              }}
            />

            <label style={{ fontWeight: "bold", display: "block" }}>Precio (COP):</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #3498db",
                borderRadius: "8px",
                fontSize: "18px",
                marginBottom: "15px",
              }}
            />

            <label style={{ fontWeight: "bold", display: "block" }}>Stock disponible:</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #3498db",
                borderRadius: "8px",
                fontSize: "18px",
                marginBottom: "20px",
              }}
            />

            <motion.div className="product-actions">
              <motion.button
                className="btn-add-to-cart-large"
                onClick={handleGuardar}
                disabled={guardando}
                whileHover={{ scale: guardando ? 1 : 1.05 }}
                whileTap={{ scale: guardando ? 1 : 0.95 }}
                style={{
                  backgroundColor: guardando ? "#95a5a6" : "#27ae60",
                  cursor: guardando ? "not-allowed" : "pointer",
                }}
              >
                {guardando ? "Guardando..." : "💾 Guardar cambios"}
              </motion.button>

              <motion.button
                className="btn-add-to-cart-large"
                onClick={() => navigate("/")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: "#95a5a6" }}
              >
                Cancelar
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetailEdit;
