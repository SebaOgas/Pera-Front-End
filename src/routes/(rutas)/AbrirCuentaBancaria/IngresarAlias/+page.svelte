<script lang="ts">
	import { onMount } from "svelte";
	import { ServicioAbrirCuentaBancaria } from "../ServicioAbrirCuentaBancaria";

    let permisos : string[];
    let error : string = "";

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

    });

    let alias: string = "";
    async function ingresarAlias() {
        let response = await ServicioAbrirCuentaBancaria.ingresarAlias(alias);
        if (typeof response === "string") {
            error = response;
            return;
        }
        if (!response) {
            error = "Ha ocurrido un error inesperado. Inténtelo de nuevo más tarde";
            return;
        }
        error = "";
        window.location.href = "/AbrirCuentaBancaria/ConfirmacionAbrirCuenta";
    }
</script>

<div class="container w-75 h-100 d-flex flex-column">
    <h1 class="text-center text-dark text-bold">Ingrese un alias</h1>
    <div class="main w-100 d-flex flex-column justify-content-center align-items-center">
        <input type="text" class="text-big" placeholder="Alias..." bind:value={alias}>
        {#if error !== ""}
            <span class="text-medium text-dark">{error}</span>
        {/if}
        <button class="text-big bg-light" on:click={ingresarAlias}>Siguiente</button>
    </div>
</div>

<style>
    .main {
        flex: 1 1 auto;
        gap: 40px;
    }
</style>