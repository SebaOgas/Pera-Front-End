<script lang="ts">
	import { onMount } from "svelte";
	import { ServicioAdministrarDatosDelUsuario } from "./ServicioAdministrarDatosDelUsuario";
	import type DTOAdminDatosUsuario from "./DTOAdminDatosUsuario";
	import CheckBox from "$lib/CheckBox.svelte";
    
    let error : string = "";
    let dto : DTOAdminDatosUsuario = {
		id: 0,
		email: "",
		nombre: "",
		contrasena: "",
		cambiarContrasena: false
	};
    let repetirContrasena : string;
    let permisos : string[] = [];
    let finalizado = false;

    onMount( async () => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);
        if(!permisos.includes("ADMIN_DATOS_PROPIOS")) {
            window.location.href = "/";
        }

        let response : DTOAdminDatosUsuario | string = await ServicioAdministrarDatosDelUsuario.get();
        if (typeof response === "string") {
            error = response;
            //window.location.href ="/";
        } else {
            dto = response;
        }
    });

    
    async function back() {
        
        window.location.href = "/Usuario";
    }

    async function modificar() {
        if (dto.cambiarContrasena) {
            if (dto.contrasena === "" || dto.contrasena === undefined) {
                error = "Ingrese la nueva contraseña";
                return;
            }
            if (dto.contrasena !== repetirContrasena) {
                error = "Las contraseñas no coinciden";
                return;
            }
        }
        error = "";
        let response : string | DTOAdminDatosUsuario = await ServicioAdministrarDatosDelUsuario.modificar(dto);
        if (typeof response === "string") {
            error = response;
            return;
        }

        finalizado = true;
    }

</script>

<div class="container w-75 h-100">
    <h1 class="text-center text-dark text-bold">Mis Datos</h1>
    {#if !finalizado}
        <div class="d-flex justify-content-between w-100 mb-3">
            <span class="text-medium text-darker">N.° de usuario</span>
            <span class="text-medium text-darker">{dto.id}</span>
        </div>
        <div class="d-flex justify-content-between w-100 mb-3">
            <span class="text-medium text-darker">Nombre</span>
            <input type="text" bind:value="{dto.nombre}">
        </div>
        <div class="d-flex justify-content-between w-100 mb-3">
            <span class="text-medium text-darker">Correo electrónico</span>
            <input type="text" bind:value="{dto.email}">
        </div>
        <div class="d-flex justify-content-between w-100 mb-3">
            <CheckBox bind:checked={dto.cambiarContrasena} label="Cambiar Contraseña" classes="text-medium"/>
        </div>
        {#if dto.cambiarContrasena}
            <div class="d-flex justify-content-between w-100 mb-3">
                <span class="text-medium text-darker">Nueva Contraseña</span>
                <input type="password" bind:value="{dto.contrasena}">
            </div>
            <div class="d-flex justify-content-between w-100 mb-3">
                <span class="text-medium text-darker">Repetir Nuevo Contraseña</span>
                <input type="password" bind:value="{repetirContrasena}">
            </div>
        {/if}
        <div class="d-flex justify-content-center w-100 mb-3">
            <span class="text-medium text-dark">{error}</span>
        </div>  
        <div class="d-flex justify-content-between w-100 mb-3">
            <button class="bg-light text-darker text-medium" on:click={back}>Atrás</button>
            <button class="bg-light text-darker text-medium" on:click={modificar}>Aceptar</button>
        </div>
    {:else}
        <div class="d-flex justify-content-center w-100 mb-3">
            <span class="text-medium text-dark">Sus datos fueron modificados correctamente</span>
        </div>  
        <div class="d-flex justify-content-center w-100 mb-3">
            <button class="bg-light text-darker text-medium" on:click={() => {window.location.href = "/Usuario";}}>Finalizar</button>
        </div>
    {/if}
    

</div>