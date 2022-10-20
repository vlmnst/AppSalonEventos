import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layout/AuthLayout";
import ConfirmAcount from "./paginas/ConfirmAcount.jsx";
import ForgetPassword from "./paginas/ForgetPassword.jsx";
import Login from "./paginas/Login.jsx";
import Register from "./paginas/Register.jsx";
import NewPassword from "./paginas/NewPassword";
import RutaProtegida from "./layout/RutaProtegida";
import AdministrarEventos from "./paginas/AdministrarEventos";

import { AuthProvider } from "./context/AuthPovider";
import { ClientesProvider } from "./context/ClientesProvider"

function App() {

  return (
  <BrowserRouter>
    <AuthProvider>
      <ClientesProvider>

      <Routes>

        <Route path="/" element={ <AuthLayout/> }>
          <Route index element={ <Login/> } />
          <Route path="confirmacount/:token" element={ <ConfirmAcount/> } />
          <Route path="forgetpassword" element={ <ForgetPassword/> } />
          <Route path="forgetpassword/:token" element={ <NewPassword/> } />
          <Route path="register" element={ <Register/> } />
        </Route>

        <Route path='/admin' element={ <RutaProtegida/> }>
          <Route index element={ <AdministrarEventos/> } />
        </Route>

      </Routes>
      </ClientesProvider>
    </AuthProvider>
  </BrowserRouter>
  )
}

export default App
