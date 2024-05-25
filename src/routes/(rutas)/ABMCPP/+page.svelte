<script lang="ts">
	import { onMount } from 'svelte';
	import type DTOABMCPP from './DTOABMCPP.js';
	import { ServicioABMConfiguracionPrecioPremium } from './ServicioABMConfiguracionPrecioPremium.js';
	import { formatDate } from '$lib/DatePicker.svelte';
    
    let error = "";
    let permisos : string[] = [];

    let dto : DTOABMCPP[] = [{
		nroConfig: 0,
        fechaInicio: new Date,
        fechaFin: new Date
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

        getConfiguraciones();

    });

    async function getConfiguraciones() {
    
        let response = await ServicioABMConfiguracionPrecioPremium.getConfiguraciones();
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;

    }

    async function altaConfiguracion() {
        window.location.href = `/ABMCPP/AltaConfiguracion`;
    }

    async function detalleConfiguracion(nroConfig: number) {
        window.location.href = `/ABMCPP/DetalleConfiguracion/${nroConfig}`;
    }

    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Administrar Parametro</h2>
    <h4 class="text-center text-dark text-bold text-big">Planes Premium</h4>
    
    <div class="d-flex justify-content-end w-100 mb-3">
        <button class=" bg-light text-darker text-medium" on:click={altaConfiguracion}>Nuevo</button>
    </div>
    

    <table class="w-100">
        <thead style="border-bottom: 1px solid #000000;">
            <tr>
                <th>N.°</th>
                <th>Fecha de Inicio</th>
                <th>Fecha de Fin</th>
                <th>Info</th>
            </tr>
        </thead>
        <tbody>
            {#each dto as d}
                <tr style="border-bottom: 1px solid #000000;">
                    <td>{d.nroConfig}</td>
                    <td>{formatDate(d.fechaInicio)}</td>
                    <td>{formatDate(d.fechaFin)}</td>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <td><img src="/eye.svg" alt="Ver" class="clickable icon" on:click={()=>{detalleConfiguracion(d.nroConfig)}}/></td>
                </tr>
            {/each}
        </tbody>
    </table>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    
</style>