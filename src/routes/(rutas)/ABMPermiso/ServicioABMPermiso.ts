import type DTOABMPermiso from "./DTOABMPermiso";

const BASE_URL = "http://localhost:8080";

export const ServicioABMPermiso = {
    
    getPermisos: async () : Promise<DTOABMPermiso[] | string> => {
        const response = await fetch(`${BASE_URL}/ABMPermiso/getPermisos`, {
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
        const data : DTOABMPermiso[] = await response.json();
        return data;
    }

}