<script lang="ts">
	import { onMount } from 'svelte';
	import type DTOABMPSM from './DTOABMPSM.js';
	import { ServicioABMPSM } from './ServicioABMPSM.js';
	import { formatDate } from '$lib/DatePicker.svelte';
    
    let error = "";
    let permisos : string[] = [];

    let dto : DTOABMPSM[] = [{
		nroSimbolo: 0,
        simbolo: "",
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

        getSimbolosMoneda();

    });

    async function getSimbolosMoneda() {
    
        let response = await ServicioABMPSM.getSimbolosMoneda();
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;

    }

    async function altaPSM() {
        window.location.href = `/ABMPSM/AltaPSM`;
    }
    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Administrar Parámetro</h2>
    <h4 class="text-center text-dark text-bold text-big">Símbolos de monedas</h4>
    
    <div class="d-flex justify-content-end w-100 mb-3">
        <button class=" bg-light text-darker text-medium" on:click={altaPSM}>Nuevo</button>
    </div>
    

    <table class="w-100">
        <thead style="border-bottom: 1px solid #000000;">
            <tr>
                <th>N.°</th>
                <th>Símbolo</th>
                <th>Fecha de Inicio</th>
                <th>Fecha de Fin</th>
            </tr>
        </thead>
        <tbody>
            {#each dto as d}
                <tr style="border-bottom: 1px solid #000000;">
                    <td>{d.nroSimbolo}</td>
                    <td>{d.simbolo}</td>
                    <td>{formatDate(d.fechaInicio)}</td>
                    <td>{formatDate(d.fechaFin)}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    
</style>