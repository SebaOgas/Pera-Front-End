<script lang="ts">
	import type DTOAuthResponse from "../RegistrarUsuario/DTOAuthResponse";
	import type DTOLoginRequest from "./DTOLoginRequest";
	import { ServicioLoguearUsuario } from "./ServicioLoguearUsuario";
    
    let dto : DTOLoginRequest = {
        email: "",
        password: ""
    }

    let error : string = "";

    async function login() {
        let resp : DTOAuthResponse = await ServicioLoguearUsuario.login(dto);
        if (resp.error !== null) {
            error = resp.error;
            return;
        }
        window.location.href = "/Usuario";
    }
</script>

<div class="container w-50 h-100">
    <h1 class="text-center text-dark text-bold">Iniciar Sesión</h1>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-dark">Email:</span>
        <input type="text" bind:value={dto.email}>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-dark">Contraseña:</span>
        <input type="password" bind:value={dto.password}>
    </div>
    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">{error}</span>
    </div>    
    <div class="d-flex justify-content-center w-100">
        <button class="bg-light text-darker text-big" on:click={login}>Iniciar Sesión</button>
    </div>

</div>