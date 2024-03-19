<script lang="ts">
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

    async function crearBanco() {
        let resp : string = await ServicioCrearBanco.crear(dto);
        if (resp.length !== 0) {
            error = resp;
            return;
        }
    }

    async function back() {
        
        window.history.back();
    }

</script>

<div class="container w-50 h-100">
    <h1 class="text-center text-dark text-bold">Crear Banco</h1>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Nombre:</span>
        <input type="text" bind:value={dto.nombre}>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Simbolo Moneda:</span>
        <input type="text" bind:value={dto.simboloMoneda}>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Habilitacion Automatica:</span>
        <input type="boolean" bind:value={dto.habilitacionAutomatica}>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Utilizar Contraseña:</span>
        <input type="boolean" bind:value={dto.usarPassword}>
    </div> 
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Contraseña:</span>
        <input type="password" bind:value={dto.password}>
    </div>    
    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">{error}</span>
    </div>
    <div style="display: flex;">
        <div class="d-flex justify-content-center w-100">
            <button class="bg-darker text-lighter text-big" on:click={back}>Cancelar</button>
        </div>    
        <div class="d-flex justify-content-center w-100">
            <button class="bg-light text-darker text-big" on:click={crearBanco}>Aceptar</button>
        </div>
    </div>
</div>