import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Registrazione from "./registrazione";
import ListaUtenti from "./listaUtenti";
import PaginaProtetta from "./paginaProtetta";
import LayoutPrivato from "./layoutPrivato";
import LayoutPubblico from "./layoutPubblico";
import {useAuth} from "./useAuth.tsx";
import './assets/style.css'

const AppRouter = () => {
  const auth = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutPubblico />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="registrazione" element={<Registrazione />} />
        </Route>
        <Route path="/secure" element={auth.isAuthenticated ? <LayoutPrivato /> : <Navigate to="/login"/>}>
          <Route index element={<Navigate to={"/secure/listaUtenti"}/>}/>
          <Route path="listaUtenti" element={<ListaUtenti />} />
          <Route path="protetta" element={<PaginaProtetta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;