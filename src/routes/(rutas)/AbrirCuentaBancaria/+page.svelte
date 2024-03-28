<script lang="ts">
	import SearchBar from "$lib/SearchBar.svelte";
    import { onMount } from "svelte";
	import { ServicioAbrirCuentaBancaria } from "./ServicioAbrirCuentaBancaria";
	import type DTOAbrirCuentaBancaria from "./DTOAbrirCuentaBancaria";
	import RadioButton from "$lib/RadioButton.svelte";

    let permisos : string[];
    let error : string = "";
    let bancos : DTOAbrirCuentaBancaria[] = new Array();

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

        getBancos("");
    });

    async function getBancos(nombreBanco: string) {
        let response = await ServicioAbrirCuentaBancaria.getBancos(nombreBanco);
        if (typeof response === "string") {
            error = response;
            return;
        }
        error = "";
        if (response.length === 0) {
            error = "No se encontró ningún banco";
        }
        bancos = response;
    }

    async function seleccionarBanco() {
        let rad = document.querySelector('input[name="banco"]:checked');
        if (rad === null) {
            error = "Seleccione un banco";
            return;
        }
        let nroBanco = Number.parseInt((<HTMLInputElement>rad).value);
        let response = await ServicioAbrirCuentaBancaria.seleccionarBanco(nroBanco);
        if (typeof response === "string") {
            error = response;
            return;
        }
        if (!response) {
            error = "Ha ocurrido un error inesperado. Inténtelo de nuevo más tarde";
            return;
        }
        window.location.href = "/AbrirCuentaBancaria/IngresarAlias";
    }
</script>


<div class="w-100 h-100 d-flex flex-column">
    <h1 class="text-center text-dark text-bold">Seleccione el banco</h1>
    <div class="w-75 main d-flex flex-column p-2">
        <div class="w-100 d-flex flex-row justify-content-start">
            <SearchBar placeholder="Buscar..." action={getBancos}/>
        </div>
        <div class="d-flex justify-content-center w-100">
            <span class="text-medium text-dark">{error}</span>
        </div>    
        <div class="lista_bancos d-flex flex-row w-100 justify-content-center align-items-start p-2">
            {#each bancos as banco}
                <RadioButton name="banco" value="{"" + banco.nroBanco}" label="{banco.nombreBanco}"/>
            {/each}
        </div>
    </div>
    <div class="d-flex flex-row justify-content-end w-100">
        <button class="bg-light" on:click={seleccionarBanco}>Siguiente</button>
    </div>
</div> 

<style>
    .main {
        flex: 1 1 auto;
        margin: 0 auto;
        gap: 20px;
    }

    .lista_bancos {
        flex-wrap: wrap;
        gap: 20px;
        flex: 1 1 auto;
    }
</style>