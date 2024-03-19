import type DTOAuthResponse from "../RegistrarUsuario/DTOAuthResponse";
import type DTODatosUsuario from "./DTODatosUsuario";
import type DTOLoginRequest from "./DTODatosUsuario";

const BASE_URL = "http://localhost:8080";

export const ServicioUsuario = {
    
    get: async () : Promise<DTODatosUsuario | string> => {
        const response = await fetch(`${BASE_URL}/Usuario/get`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: "include"
        });
        if (response.status === 403) {
            return await response.text();
        }
        const data : DTODatosUsuario = await response.json();
        localStorage.setItem("permisos", JSON.stringify(data.rol.permisos));
        return data;
    }
}