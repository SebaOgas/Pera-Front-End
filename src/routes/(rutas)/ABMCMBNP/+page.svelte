<script lang="ts">
	import { onMount } from 'svelte';
	import type DTOABMCMBNP from './DTOABMCMBNP.js';
	import { ServicioABMCMBNP } from './ServicioABMCMBNP.js';
	import { formatDate } from '$lib/DatePicker.svelte';
    
    let error = "";
    let permisos : string[] = [];

    let dto : DTOABMCMBNP[] = [{
		idCMBNP: 0,
        fechaInicio: new Date,
        fechaFin: new Date,
        cantidad: ""
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

        getCantidades();

    });

    async function getCantidades() {
    
        let response = await ServicioABMCMBNP.getCantidadesBNP();
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;

    }

    async function altaCantidad() {
        window.location.href = `/ABMCMBNP/AltaCantidad`;
    }
    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Administrar Párametro</h2>
    <h4 class="text-center text-dark text-bold text-big">Cantidad máxima de bancos para usuarios no premium</h4>
    
    <div class="d-flex justify-content-end w-100 mb-3">
        <button class=" bg-light text-darker text-medium" on:click={altaCantidad}>Nuevo</button>
    </div>
    

    <table class="w-100">
        <thead style="border-bottom: 1px solid #000000;">
            <tr>
                <th>Id</th>
                <th>Fecha de Inicio</th>
                <th>Fecha de Fin</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        <tbody>
            {#each dto as d}
                <tr style="border-bottom: 1px solid #000000;">
                    <td>{d.idCMBNP}</td>
                    <td>{formatDate(d.fechaInicio)}</td>
                    <td>{formatDate(d.fechaFin)}</td>
                    <td>{d.cantidad}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    
</style>