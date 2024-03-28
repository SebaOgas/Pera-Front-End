<script lang="ts">
	import { onMount } from "svelte";
	import { ServicioAbrirCuentaBancaria } from "../ServicioAbrirCuentaBancaria";
	import type DTOConfirmacionAbrirCuenta from "../DTOConfirmacionAbrirCuenta";

    let permisos : string[];
    let error : string = "";

    let confirmada = false;

    let nroCB : number = -1;

    let cuenta : DTOConfirmacionAbrirCuenta = {
		alias: "",
		cuentaHabilitada: false,
		nombreBanco: "",
		nroBanco: 0,
		tieneContrasena: false
	};

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

        let response = await ServicioAbrirCuentaBancaria.getDatosConfirmacion();
        if (typeof response === "string") {
            error = response;
            return;
        }
        if (!response) {
            error = "Ha ocurrido un error inesperado. Inténtelo de nuevo más tarde";
            return;
        }
        cuenta = response;
    });


    let contrasena : string = "";

    async function confirmar() {
        let response = await ServicioAbrirCuentaBancaria.confirmar(true, contrasena);
        if (typeof response === "string") {
            error = response;
            return;
        }
        nroCB = response;
        confirmada = true;
        error = "";
    }

    function redir(dir: string) {
        window.location.href = dir;
    }
</script>


<div class="container w-50 h-100 d-flex flex-column">
    <h1 class="text-center text-dark text-bold">Detalles de la Cuenta Bancaria</h1>
    <div class="main w-100 d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Nombre del banco</span>
        <span class="text-medium text-darker">{cuenta.nombreBanco}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Número del banco</span>
        <span class="text-medium text-darker">{cuenta.nroBanco}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Alias</span>
        <span class="text-medium text-darker">{cuenta.alias}</span>
    </div>
    {#if !cuenta.cuentaHabilitada}
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-center text-darker">Deberá esperar a que un banquero habilite su cuenta antes de poder comenzar a operar</span>
    </div>
    {/if}
    {#if !confirmada}
        {#if cuenta.tieneContrasena}
            <div class="d-flex justify-content-between w-100 mb-3">
                <span class="text-medium text-darker">Contraseña del banco: </span>    
                <input type="password" bind:value={contrasena}>
            </div>
        {/if}
        <div class="d-flex justify-content-between w-100 mb-3">
            <button class="bg-light text-darker text-medium" on:click={() => redir(`/MisCuentasBancarias`)}>Cancelar</button>
            <button class="bg-light text-darker text-medium" on:click={confirmar}>Confirmar</button>
        </div>
    {:else}   
        <div class="d-flex justify-content-center w-100 mb-3">
            <span class="container text-medium text-center text-darker">Se creó su cuenta bancaria con número {nroCB}</span>
        </div>
        <div class="d-flex justify-content-end w-100 mb-3">
            <button class="bg-light text-darker text-medium" on:click={() => redir(`/MisCuentasBancarias/${nroCB}`)}>Finalizar</button>
        </div>
    {/if}
    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-center text-dark">{error}</span>
    </div>
    </div>
</div>