<script lang="ts">
	import { onMount } from "svelte";
	import CheckBox from "../../../lib/CheckBox.svelte";

	
import type DTOCrearBanco from "./DTOCrearBanco";
	
	import { ServicioCrearBanco } from "./ServicioCrearBanco";
    

    let dto : DTOCrearBanco = {
        nombre: "",
        simboloMoneda: "",
        habilitacionAutomatica: false,
        usarPassword: false,
        password: ""
    }

    let error : string = "";

    let finalizado = false;

    let permisos : string[] = [];

    onMount(() => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_BANCOS_PROPIOS")) {
            window.location.href = "/";
        }
    });
    

    async function crearBanco() {
        let resp : string = await ServicioCrearBanco.crear(dto);
        if (resp.length !== 0) {
            error = resp;
            return;
        }
        finalizado = true;
    }

    async function back() {
        
        window.history.back();
    }

    

    

</script>

<div class="container w-50 h-100">
    <h2 class="text-center text-dark text-bold">Crear Banco</h2>
    {#if !finalizado}
        <div class="d-flex justify-content-between w-100 mb-3">
            <span class="text-medium text-darker">Nombre:</span>
            <input type="text" bind:value={dto.nombre}>
        </div>
        {#if permisos.includes("ELEGIR_SIMBOLO_MONEDA")}
        <div class="d-flex justify-content-between w-100 mb-3">
            <span class="text-medium text-darker">Simbolo Moneda:</span>
            <input type="text" bind:value={dto.simboloMoneda}>
        </div>
        {/if}
        <div class="d-flex justify-content-between w-100 mb-3">
            <CheckBox label="Habilitación Automática" classes="text-medium" bind:checked={dto.habilitacionAutomatica}/>
        </div>
        <div class="d-flex justify-content-between w-100 mb-3">
            <CheckBox label="Utilizar Contraseña" classes="text-medium" bind:checked={dto.usarPassword}/>
        </div> 
        {#if dto.usarPassword}
            <div class="d-flex justify-content-between w-100 mb-3">
                <span class="text-medium text-darker">Contraseña:</span>
                <input type="password" bind:value={dto.password}>
            </div>
        {/if}    
        <div class="d-flex justify-content-center w-100 mb-3">
            <span class="text-medium text-dark">{error}</span>
        </div>
        <div style="display: flex;">
            <div class="d-flex justify-content-center w-100">
                <button class="bg-darker text-lighter text-medium" on:click={back}>Cancelar</button>
            </div>    
            <div class="d-flex justify-content-center w-100">
                <button class="bg-light text-darker text-medium" on:click={crearBanco}>Aceptar</button>
            </div>
        </div>
    {:else}
        <div style="display: flex;">
            <div class="d-flex justify-content-center w-100">
                <button class="bg-light text-darker text-medium" on:click={() => {window.location.href = "/AdministrarBancoPropio";}}>Finalizar</button>
            </div>
        </div>
    {/if}
</div>