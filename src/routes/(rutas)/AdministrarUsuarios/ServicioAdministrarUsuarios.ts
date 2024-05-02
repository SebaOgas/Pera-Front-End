import type DTOAdministrarUsuarios from "./DTOAdministrarUsuarios";
import type DTOAdministrarUsuariosSeleccionado from "./DTOAdministrarUsuariosSeleccionado";
import type DTODetallesUsuarioSeleccionado from "./DTODetallesUsuarioSeleccionado";
import type DTORolUsuarioAdministrarUsuarios from "./DTORolUsuarioAdministrarUsuarios";

const BASE_URL = "http://localhost:8080";

export const ServicioAdministrarUsuarios = {
    
    getUsuarios: async () : Promise<DTOAdministrarUsuarios[] | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarUsuarios/getUsuarios`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: "include"
        });
        if (response.status !== 200) {
            return await response.text();
        }
        const data : DTOAdministrarUsuarios[] = await response.json();
        return data;
    },

    getUsuarioSeleccionado: async (idUsuario: number) : Promise<DTOAdministrarUsuariosSeleccionado | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarUsuarios/getDetalle/${idUsuario}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: "include"
        });
        if (response.status !== 200) {
            return await response.text();
        }
        const data : DTOAdministrarUsuariosSeleccionado = await response.json();
        return data;
    },

    getCuentaFiltrada: async (filtro: string) : Promise<DTODetallesUsuarioSeleccionado | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarUsuarios/filtro?filtro=${filtro}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: "include"
        });
        if (response.status !== 200) {
            return await response.text();
        }
        const data : DTODetallesUsuarioSeleccionado = await response.json();
        return data;
    },

    darBajaCuentaSeleccionada: async (nroCB: number) : Promise<void | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarUsuarios/${nroCB}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: "include"
        });
        if (response.status !== 200) {
            return await response.text();
        }
        return;
    },

    getRolUsuario: async (idUsuario: number) : Promise<DTORolUsuarioAdministrarUsuarios | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarUsuarios/getRol/${idUsuario}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: "include"
        });
        if (response.status !== 200) {
            return await response.text();
        }
        const data : DTORolUsuarioAdministrarUsuarios = await response.json();
        return data;
    },

    confirmar: async (nuevoRol: string, dto: DTORolUsuarioAdministrarUsuarios) : Promise<string[] | string> => {
        const response = await fetch(`${BASE_URL}/AdministrarUsuarios/confirmar?nuevoRol=${nuevoRol}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: "include",
            body: JSON.stringify(dto)
        });
        if (response.status !== 200) {
            return await response.text();
        }
        const data : string[] = await response.json();
        return data;
    }

}