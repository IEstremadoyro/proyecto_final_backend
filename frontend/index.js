const nombreEmpresa = document.getElementById("empresa-nombre");
const descripcionEmpresa = document.getElementById("empresa-descripcion");
const crearEmpresa = document.getElementById("crear-empresa");

const nombreProyecto = document.getElementById("proyecto-nombre");
const descripcionProyecto = document.getElementById("proyecto-descripcion");
const crearProyecto = document.getElementById("crear-proyecto");

const nombreArticulo = document.getElementById("articulo-nombre");
const descripcionArticulo = document.getElementById("articulo-descripcion");
const crearArticulo = document.getElementById("crear-articulo");

const numeroCotizacion = document.getElementById("cotizacion-numero");
const crearCotizacion = document.getElementById("crear-cotizacion");

const numeroOrden = document.getElementById("orden-numero");
const crearOrden = document.getElementById("crear-orden");

const ordenServicio = document.getElementById("acta-orden-servicio");
const crearActaAceptacion = document.getElementById("crear-acta-aceptacion");

const BASE_URL = "http://127.0.0.1:3000";

crearEmpresa.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(`${BASE_URL}/empresas`, {
    method: "POST",
    body: JSON.stringify({
      nombre: nombreEmpresa.value,
      descripcion: descripcionEmpresa.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((respuesta) => {
      console.log(respuesta);
    });
});

crearProyecto.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(`${BASE_URL}/proyectos`, {
    method: "POST",
    body: JSON.stringify({
      nombre: nombreProyecto.value,
      descripcion: descripcionProyecto.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((respuesta) => {
      console.log(respuesta);
    });
});

crearArticulo.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(`${BASE_URL}/articulos`, {
    method: "POST",
    body: JSON.stringify({
      nombre: nombreArticulo.value,
      descripcion: descripcionArticulo.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((respuesta) => {
      console.log(respuesta);
    });
});

crearCotizacion.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(`${BASE_URL}/cotizacion`, {
    method: "POST",
    body: JSON.stringify({
      numero_cotizacion: numeroCotizacion.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((respuesta) => {
      console.log(respuesta);
    });
});

crearOrden.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(`${BASE_URL}/oservicios`, {
    method: "POST",
    body: JSON.stringify({
      numero_orden: numeroOrden.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((respuesta) => {
      console.log(respuesta);
    });
});

crearActaAceptacion.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(`${BASE_URL}/actas-aceptacion`, {
    method: "POST",
    body: JSON.stringify({
      orden_servicio: ordenServicio.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((respuesta) => {
      console.log(respuesta);
    });
});