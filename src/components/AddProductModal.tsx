import React, { useState } from "react";

type Props = {
  close: () => void;
};

export const AddProductModal: React.FC<Props> = ({ close }) => {

  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: "",
    imagen: "",
    stock: ""
  });

  const categorias = [
    "Hogar",
    "Papelería",
    "Tecnología",
    "Accesorios personales",
    "Deporte"
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* ---------------- ENVIAR AL BACKEND ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    for (const key in form) {
      // @ts-ignore
      if (!form[key]) {
        alert("Todos los campos son obligatorios");
        return;
      }
    }
    //  Nuevo manejo del token
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");
    const token = loggedUser?.token;

    if (!token) {
      alert("No hay sesión activa ");
      return;
    }

    //const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          nombre: form.nombre,
          categoria: form.categoria,
          descripcion: form.descripcion,
          precio: Number(form.precio),
          imagen: form.imagen,
          stock: Number(form.stock)
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + data.message);
        return;
      }

      alert("Producto agregado correctamente ✔");
      close();

    } catch (err) {
      alert("Error en servidor");
      console.error(err);
    }
  };

  return (
    <div className="modal-bg">
      <form className="modal" onSubmit={handleSubmit}>

        <h2>Añadir Producto</h2>

        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
        >
          <option value="">Seleccione categoría</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <input
          name="precio"
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
        />

        <input
          name="imagen"
          type="text"
          placeholder="URL imagen"
          value={form.imagen}
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />

        <button type="submit" className="admin-btn">Guardar</button>
        <button
          type="button"
          className="admin-btn admin-btn-danger"
          onClick={close}
        >
          Cancelar
        </button>

      </form>
    </div>
  );
};
