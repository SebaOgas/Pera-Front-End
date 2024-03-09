<script lang="ts">
	import type DTOAuthResponse from "../DTOAuthResponse";
	import { ServicioRegistrarUsuario } from "../ServicioRegistrarUsuario";
    
    export let data;

    let codigo : string = "";
    let error : string = "";


    async function ingresarCodigo() {

        let datos : DTOAuthResponse = await ServicioRegistrarUsuario.ingresarCodigo(data.mail, Number.parseInt(codigo));
        if (datos.error !== null) {
            error = datos.error;
            return;
        }
        window.location.href = "/Usuario";
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
        <button class="bg-light text-darker" on:click={ingresarCodigo}>Aceptar</button>
    </div>   

</div>