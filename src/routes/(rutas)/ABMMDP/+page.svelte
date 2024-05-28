<script lang="ts">
	import { onMount } from 'svelte';
	import type DTOABMMDP from './DTOABMMDP';
	import { ServicioABMMDP } from './ServicioABMMDP';

    let error = "";
    let permisos : string[] = [];

    let dto : DTOABMMDP[] = [{
		nroMDP: 0,
        nombreMDP: "",
        fechaBajaMDP: new Date,
        deBaja: false
	}];

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

        getMediosPago();

    });

    async function getMediosPago() {
    
        let response = await ServicioABMMDP.getMediosPago();
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;

    }

    async function altaMDP() {
        window.location.href = `/ABMMDP/AltaMDP`;
    }


    async function darBaja(nroMDP: number){

        let response = await ServicioABMMDP.darBajaMDP(nroMDP);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.location.reload();
    }
    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Administrar Parametro</h2>
    <h4 class="text-center text-dark text-bold text-big">Medios de pago</h4>
    
    <div class="d-flex justify-content-end w-100 mb-3">
        <button class=" bg-light text-darker text-medium" on:click={altaMDP}>Nuevo</button>
    </div>
    

    <table class="w-100">
        <thead style="border-bottom: 1px solid #000000;">
            <tr>
                <th>N.°</th>
                <th>Nombre</th>
                <th>Fecha de Baja</th>
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody>
            {#each dto as d}
                <tr style="border-bottom: 1px solid #000000;">
                    <td>{d.nroMDP}</td>
                    <td>{d.nombreMDP}</td>
                    <td>{d.fechaBajaMDP}</td>
                    {#if !(d.deBaja)}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <td><img src="/green_cross.svg" alt="Baja" class="clickable" on:click={() => {darBaja(d.nroMDP)}}></td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    
</style>