<script lang="ts">
    import { ServicioCambiarContrasena } from './ServicioCambiarContrasena.js';
    

    let mail : string = "";
    let error : string = "";


    async function enviarCodigo() {

        let datos = await ServicioCambiarContrasena.enviarCodigo(mail);
        if (typeof datos === "string") {
            error = datos;
            return;
        }
        window.location.href = `/CambiarContrasena/${mail}`;
    }

    function back() {
        window.location.href = "/Usuario";
    }
</script>

<div class="container w-50 h-100">
    <h1 class="text-center text-dark text-bold">Cambio de Contraseña</h1>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-dark">Correo electrónico:</span>
        <input type="text" bind:value={mail}>
    </div>
    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">{error}</span>
    </div>  
    <div class="d-flex justify-content-between w-100">
        <button class="bg-darker text-lighter" on:click={back}>Cancelar</button>
        <button class="bg-light text-darker" on:click={enviarCodigo}>Enviar Código al Mail</button>
    </div>   
</div>