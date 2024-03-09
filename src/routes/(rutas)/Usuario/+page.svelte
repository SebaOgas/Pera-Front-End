<script lang="ts">
	import { onMount } from "svelte";
	import { ServicioUsuario } from "./ServicioUsuario";
	import type DTODatosUsuario from "./DTODatosUsuario";
    
    let error : string = "";
    let dto : DTODatosUsuario

    onMount( async () => {


        let response : DTODatosUsuario | string = await ServicioUsuario.get();
        if (typeof response === "string") {
            error = response;
            window.location.href ="/";
        } else {
            dto = response;
        }
    });

    
    async function back() {
        
        window.history.back();
    }

    async function admin() {
        
        window.location.href = "/AdministrarDatosDelUsuario";
    }

    async function suscribirseAPremium() {
        
        window.location.href = "/SuscribirseAPremium";
    }
</script>

<div class="container w-75 h-100">
    <h1 class="text-center text-dark text-bold">Mis Datos</h1>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">N.° de usuario</span>
        <span class="text-medium text-darker">{dto?.id}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Nombre</span>
        <span class="text-medium text-darker">{dto?.nombre}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Correo electrónico</span>
        <span class="text-medium text-darker">{dto?.email}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Plan</span>
        <span class="text-medium text-darker">{dto?.rol.nombre + (dto?.rol.vencimiento !== null && dto?.rol.nombre === "Premium" ? ` (vence el ${new Date(dto?.rol.vencimiento).toLocaleDateString("es-AR")})` : "")}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <button class="bg-light text-darker text-medium" on:click={back}>Atrás</button>
        <button class="bg-light text-darker text-medium" on:click={admin}>Modificar</button>
    </div>
    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">{error}</span>
    </div>   
    {#if dto?.rol.nombre === "No Premium"} 
        <div class="d-flex justify-content-center w-100">
            <button class="bg-darker text-light text-big" on:click={suscribirseAPremium}>Obtener Premium</button>
        </div>
    {/if}

</div>