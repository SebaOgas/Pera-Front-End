<script lang="ts">
	import type DTOAuthResponse from "../DTOAuthResponse";
	import { ServicioRegistrarUsuario } from "../ServicioRegistrarUsuario";
    
    let codigo : string = "";

    async function ingresarCodigo() {

        let data : DTOAuthResponse = await ServicioRegistrarUsuario.ingresarCodigo(Number.parseInt(codigo));
        //window.location.href = "RegistrarUsuario/IngresarCodigoRegistrarUsuario";
        if (data.error.length > 0) {
            console.log ("Error: " + data.error);
            return;
        }
        console.log("Exito!!!");
    }
</script>

<div class="container w-50 h-100">
    <h1 class="text-center text-dark text-bold">Ingresar Código</h1>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-dark">Código:</span>
        <input type="text" bind:value={codigo}>
    </div>
    <div class="d-flex justify-content-between w-100">
        <button class="bg-darker text-lighter">Cancelar</button>
        <button class="bg-light text-darker" on:click={ingresarCodigo}>Aceptar</button>
    </div>   

</div>