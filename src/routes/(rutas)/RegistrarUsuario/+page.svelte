<script lang="ts">
	import type DTORegisterRequest from "./DTORegisterRequest";
	import { ServicioRegistrarUsuario } from "./ServicioRegistrarUsuario";
    
    let repetirPassword : string = "";
    let dto : DTORegisterRequest = {
        nombre: "",
        email: "",
        password: ""
    }

    let error : string = "";

    async function register() {
        if (dto.password !== repetirPassword) {
            error = "Las contraseñas no coinciden"
            return;
        }
        let resp : string = await ServicioRegistrarUsuario.register(dto);
        if (resp.length !== 0) {
            error = resp;
            return;
        }
        window.location.href = "RegistrarUsuario/" + dto.email;
    }
</script>

<div class="container w-50 h-100">
    <h1 class="text-center text-dark text-bold">Registrarse</h1>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-dark">Nombre:</span>
        <input type="text" bind:value={dto.nombre}>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-dark">Email:</span>
        <input type="text" bind:value={dto.email}>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-dark">Contraseña:</span>
        <input type="password" bind:value={dto.password}>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-dark">Repetir Contraseña:</span>
        <input type="password" bind:value={repetirPassword}>
    </div>    
    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">{error}</span>
    </div>    
    <div class="d-flex justify-content-center w-100">
        <button class="bg-light text-darker text-big" on:click={register}>Registrarse</button>
    </div>
    <div class="d-flex justify-content-center w-100">
        <a href="/LoguearUsuario" class="text-medium">Iniciar Sesión</a>
    </div>

</div>