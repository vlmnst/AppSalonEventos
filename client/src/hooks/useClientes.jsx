import { useContext } from "react";
import ClientesContext from "../context/ClientesProvider";

function useClientes() {
  return useContext(ClientesContext)
}

export default useClientes
