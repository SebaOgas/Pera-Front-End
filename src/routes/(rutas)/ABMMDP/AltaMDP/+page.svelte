<script lang="ts">
	import { onMount } from 'svelte';
	import { ServicioABMMDP } from '../ServicioABMMDP';
    
    let error = "";
    let permisos : string[] = [];
    let nombreMDP: string = "";

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

    });

    async function altaMDP() {
        
        let response = await ServicioABMMDP.altaMDP(nombreMDP);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.history.back();

    }
    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Administrar Parametro</h2>
    <h4 class="text-center text-dark text-bold text-big">Medios de pago</h4>
    <h4 class="text-center text-dark text-bold text-big">Alta</h4>
    
    <div class="d-flex justify-content-evenly w-100 mb-3">
        <span class="text-medium text-darker">Nombre</span>
        <input type="text" placeholder="nombreMDP" bind:value={nombreMDP}>
    </div>
    
    <div class="d-flex justify-content-end w-100 mb-3" style="gap: 20px;">
        <button class="bg-darker text-lighter text-medium" on:click={()=>{window.location.href = "/ABMMDP";}}>Cancelar</button>
        <button class="bg-light text-darker text-medium" on:click={altaMDP}>Aceptar</button>
    </div>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    
</style>