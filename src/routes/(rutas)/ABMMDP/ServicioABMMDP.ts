import type DTOABMMDP from "./DTOABMMDP";

const BASE_URL = "http://localhost:8080";

export const ServicioABMMDP = {
    
    getMediosPago: async () : Promise<DTOABMMDP[] | string> => {
        const response = await fetch(`${BASE_URL}/ABMMDP/getMediosPago`, {
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
        const data : DTOABMMDP[] = await response.json();
        return data;
    },

    altaMDP: async (nombreMDP: string) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/ABMMDP/altaMDP?nombreMDP=${nombreMDP}`, {
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
        return null;
    },


    darBajaMDP: async (nroMDP: number) : Promise<null | string> => {
        const response = await fetch(`${BASE_URL}/ABMMDP/darBajaMDP?nroMDP=${nroMDP}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            mode: 'cors',
            credentials: "include",
        });
        if (response.status !== 200) {
            return await response.text();
        }
        return null;
    }

}