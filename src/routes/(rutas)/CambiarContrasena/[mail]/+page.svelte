<script lang="ts">
	import { onMount } from 'svelte';
    import { ServicioCambiarContrasena } from '../ServicioCambiarContrasena.js';
    
    export let data;

    let codigo : string = "";
    let error : string = "";

    onMount(async () => {
        let datos = await ServicioCambiarContrasena.enviarCodigo(data.mail);
        if (typeof datos === "string") {
            error = datos;
            return;
        }
    });


    async function ingresarCodigo() {

        let datos = await ServicioCambiarContrasena.ingresarCodigo(data.mail, Number.parseInt(codigo));
        if (typeof datos === "string") {
            error = datos;
            return;
        }
        window.location.href = `/CambiarContrasena/${data.mail}/${codigo}`;
    }
</script>

<div class="container w-50 h-100">
    <h1 class="text-center text-dark text-bold">Ingresar Código</h1>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-dark">Código:</span>
        <input type="text" bind:value={codigo}>
    </div>
    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">{error}</span>
    </div>  
    <div class="d-flex justify-content-between w-100">
        <button class="bg-darker text-lighter">Cancelar</button>
        <button class="bg-light text-darker" on:click={ingresarCodigo}>Siguiente</button>
    </div>   
</div>