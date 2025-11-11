# 🛒 Tienda Desocupe Masivo

**Tienda Desocupe Masivo** es una aplicación web desarrollada con **TypeScript, React + Vite, CSS y Node.js**, que emula una tienda en línea con temática inspirada en el popular personaje **Don Berriondo** de *Desocupe Masivo*.  

Los usuarios pueden **registrarse, iniciar sesión y simular compras**, aunque no se implementó una pasarela de pagos real.  
Lo más destacado del proyecto es el **chatbot interactivo de Don Berriondo**, que utiliza inteligencia artificial para responder con el estilo característico y humor paisa del personaje.

---

## ✨ Características principales

- 👤 Registro e inicio de sesión de usuarios.  
- 🛍️ Simulación de compras (sin pasarela de pago real).  
- 🤖 Chatbot con personalidad de **Don Berriondo**, alimentado por **OpenAI (modelo GPT-4-mini o similar)**.  
- ⚙️ Desarrollado con **React + Vite** para el frontend y **Node.js** en el backend.  
- 💬 Comunicación con la API de OpenAI mediante variables de entorno configurables.

---

## 🧠 Chatbot de Don Berriondo

El chatbot está diseñado para recrear la forma de hablar del personaje **Don Berriondo**, ofreciendo respuestas cómicas, expresivas y muy paisas.  
Para ello, se conecta a la API de **OpenAI**, utilizando el modelo **GPT-4-mini** (o una variante compatible).  

El contexto del personaje se define en el backend, permitiendo que el asistente responda con el tono y estilo de Don Berriondo al interactuar con los usuarios.

---

## ⚙️ Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)  
- [npm](https://www.npmjs.com/)  
- Una clave válida de la API de [OpenAI](https://platform.openai.com/)

---

## 🚀 Instalación y ejecución en local

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo


2. **Instalar dependencias**

   ```bash
   npm install

3. **Configurar variable de entorno**

En la raíz del proyecto encontrarás un archivo llamado .env.example.
Debes crear un nuevo archivo llamado .env y copiar su contenido, completando los valores correspondientes

4. **Ejecutar el proyecto en modo desarrollo**

   ```bash
   npm run dev

Esto iniciará el servidor y podrás acceder a la aplicación.