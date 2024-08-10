<script lang="ts">
	import { onMount } from 'svelte';
	import type DTOModificarRol from '../../DTOModificarRol';
	import { ServicioABMRol } from '../../ServicioABMRol';
    
    export let data;

    let error = "";
    let permisos : string[] = [];

    let dto: DTOModificarRol = {
        nroRol: 0,
        nombreRol: ""
    }

    onMount(async () => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_PARAMETROS")) {
            window.location.href = "/";
        }

        getRol();

    });

    async function getRol(){
        let response = await ServicioABMRol.getRol(data.nroRol);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;
    }

    async function confirmar() {
        
        let response = await ServicioABMRol.confirmar(dto);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.history.back();

    }
    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Administrar Parámetro</h2>
    <h4 class="text-center text-dark text-bold text-big">Roles</h4>
    <h4 class="text-center text-dark text-bold text-big">Modificar</h4>
    
    <div class="d-flex justify-content-center w-100 mb-3" style="gap: 480px;">
        <span class="text-medium text-darker">Nº</span>
        <span>{dto.nroRol}</span>
    </div>
    <div class="d-flex justify-content-evenly w-100 mb-3">
        <span class="text-medium text-darker">Nombre</span>
        <input type="text" placeholder="{dto.nombreRol}" bind:value={dto.nombreRol}>
    </div>
    
    <div class="d-flex justify-content-end w-100 mb-3" style="gap: 20px;">
        <button class="bg-darker text-lighter text-medium" on:click={()=>{window.location.href = `/ABMRol`;}}>Cancelar</button>
        <button class="bg-light text-darker text-medium" on:click={confirmar}>Aceptar</button>
    </div>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    
</style>