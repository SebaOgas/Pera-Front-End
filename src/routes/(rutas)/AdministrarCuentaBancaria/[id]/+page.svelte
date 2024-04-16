<script lang="ts">
	import { onMount } from "svelte";
	import type DTOAdministrarCuentaBancaria from "../DTOAdministrarCuentaBancaria";
	import { ServicioAdministrarCuentaBancaria } from "../ServicioAdministrarCuentaBancaria";

    let permisos : string[] = [];

    export let data;

    let dto : DTOAdministrarCuentaBancaria = {
        nroCB: 0,
        alias: "",
        baja: new Date()
    }

    let error = "";

    onMount(async () => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_CUENTAS_BANCARIAS_PROPIAS")) {
            window.location.href = "/";
        }

        let response : DTOAdministrarCuentaBancaria | string = await ServicioAdministrarCuentaBancaria.get(data.nroCB);
        if (typeof response === "string") {
            error = response;
        } else {
            dto = response;
        }

    });

    async function darBaja() {
        ServicioAdministrarCuentaBancaria.darDeBajaCuenta(dto);
        window.location.href = "/MisCuentasBancarias";
    }

    async function aceptar() {
        let response = ServicioAdministrarCuentaBancaria.modificarCuenta(dto);
        response.then(respuesta =>{
            if(typeof respuesta == "string"){
                error = respuesta;
                return;
            }
            window.history.back();
        })
    }

    async function cancelar() {

        window.history.back();
    }
    
</script>

<div class="container w-50 h-100">
    <h2 class="text-center text-dark text-bold">Modificar Cuenta Bancaria</h2>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">N.°</span>
        <span class="text-medium text-darker">{dto.nroCB}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Alias</span>
        <input type="text" bind:value={dto.alias}>
    </div>
    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">{error}</span>
    </div>
    <div class="d-flex flex-row justify-content-end w-100">
        <div class="d-flex justify-content-start w-100">
            <button class="bg-darker text-lighter text-medium" on:click={darBaja}>Dar de Baja</button>
        </div>
        <div class="d-flex flex-row justify-content-end w-30" style="gap: 10px;">
            <div class="d-flex justify-content-center w-100">
                <button class="bg-darker text-lighter text-medium" on:click={cancelar}>Cancelar</button>
            </div>
            <div class="d-flex justify-content-center w-100">
                <button class="bg-light text-darker text-medium" on:click={aceptar}>Aceptar</button>
            </div>
        </div>
    </div>    

</div>

