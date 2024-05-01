<script lang="ts">
    import { ServicioCambiarContrasena } from '../../ServicioCambiarContrasena.js';
    
    export let data;

    let contrasena : string = "";
    let contrasenaRepetida : string = "";
    let error : string = "";


    async function cambiarContrasena() {

        if (contrasena !== contrasenaRepetida) {
            error = "La contraseña no coincide";
            return;
        }

        let datos = await ServicioCambiarContrasena.cambiarContrasena(data.mail, data.codigo, contrasena);
        if (typeof datos === "string") {
            error = datos;
            return;
        }
        window.location.href = `/CambiarContrasena/${data.mail}/${data.codigo}/fin`;
    }
</script>

<div class="container w-50 h-100">
    <h1 class="text-center text-dark text-bold">Cambio de Contraseña</h1>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-dark">Nueva contraseña:</span>
        <input type="password" bind:value={contrasena}>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-dark">Repetir contraseña:</span>
        <input type="password" bind:value={contrasenaRepetida}>
    </div>
    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">{error}</span>
    </div>  
    <div class="d-flex justify-content-between w-100">
        <button class="bg-darker text-lighter">Cancelar</button>
        <button class="bg-light text-darker" on:click={cambiarContrasena}>Aceptar</button>
    </div>   
</div>