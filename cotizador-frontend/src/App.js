// // import React from 'react';
// import Home from './components/Home';
// import CrearMarca from './components/CrearMarca';
// import MostrarMarcas from './components/MostrarMarcas';
// import CrearArticulo from './components/CrearArticulo';
// import MostrarArticulo from './components/MostrarArticulos';
// import CrearEmpresa from './components/CrearEmpresa';
// import MostrarEmpresa from './components/MostrarEmpresa';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// function App() {
//   return (
//     <Router>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/crearmarca">Crear Marca</Link>
//         <Link to="/mostrarMarcas">Mostrar Marcas</Link>
//         <Link to="/crearaArticulos">Crear Articulos</Link>
//         <Link to="/mostrarArticulos">Mostrar  Articulos</Link>
//         <Link to="/crearEmpresa">Mostrar Empresas</Link>
//         <Link to="/mostrarEmpresa">Mostrar Empresas</Link>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/crearmarca" element={<CrearMarca />} />
//         <Route path="/mostrarMarcas" element={<MostrarMarcas />} />
//         <Route path="/crearaArticulos" element={<CrearArticulo />} />
//         <Route path="/mostrarArticulos" element={<MostrarArticulo />} />
//         <Route path="/CrearEmpresa" element={<CrearEmpresa />} />
//         <Route path='/mostrarEmpresa' element={<MostrarEmpresa />} />
//       </Routes>
//     </Router>
//   );
// }

// // Exporta App por defecto
// export default App;

import React from 'react';
import Home from './components/Home';
import CrearMarca from './components/CrearMarca';
import MostrarMarcas from './components/MostrarMarcas';
import CrearArticulo from './components/CrearArticulo';
import MostrarArticulo from './components/MostrarArticulos';
import CrearEmpresa from './components/CrearEmpresa';
import MostrarEmpresa from './components/MostrarEmpresa';
import CrearCotizacion from './components/CrearCotizacion';
import MostrarCotizacion from './components/MostraCotizacion';
import CrearProyecto from './components/CrearProyecto';
import MostrarProyecto from './components/MostrarProyecto';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap'; // Importar componentes de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Cotizador</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/crearmarca">Crear Marca</Nav.Link>
              <Nav.Link as={Link} to="/mostrarMarcas">Mostrar Marcas</Nav.Link>
              <Nav.Link as={Link} to="/crearaArticulos">Crear Artículos</Nav.Link>
              <Nav.Link as={Link} to="/mostrarArticulos">Mostrar Artículos</Nav.Link>
              <Nav.Link as={Link} to="/crearEmpresa">Crear Empresa</Nav.Link>
              <Nav.Link as={Link} to="/mostrarEmpresa">Mostrar Empresas</Nav.Link>
              <Nav.Link as={Link} to="/crearCotizacion">Crear Cotizaciones</Nav.Link>
              <Nav.Link as={Link} to="/mostrarCotizacion">Mostrar Cotizaciones</Nav.Link>
              <Nav.Link as={Link} to="/crearProyecto">Crear Proyectos</Nav.Link>
              <Nav.Link as={Link} to="/mostrarProyecto">Mostrar Proyectos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crearmarca" element={<CrearMarca />} />
        <Route path="/mostrarMarcas" element={<MostrarMarcas />} />
        <Route path="/crearaArticulos" element={<CrearArticulo />} />
        <Route path="/mostrarArticulos" element={<MostrarArticulo />} />
        <Route path="/crearEmpresa" element={<CrearEmpresa />} />
        <Route path='/mostrarEmpresa' element={<MostrarEmpresa />} />
        <Route path='/crearCotizacion' element={<CrearCotizacion />} />
        <Route path='/mostrarCotizacion' element={<MostrarCotizacion />} />
        <Route path='/crearProyecto' element={<CrearProyecto />} />
        <Route path='/mostrarProyecto' element={<MostrarProyecto />} />
      </Routes>
    </Router>
  );
}

// Exporta App por defecto
export default App;
