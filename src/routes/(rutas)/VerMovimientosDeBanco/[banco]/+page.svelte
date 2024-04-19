<script lang="ts">
	import { onMount } from 'svelte';
    import CheckBox from '$lib/CheckBox.svelte';
	import { ServicioVerMovimientosDeBanco } from '../ServicioVerMovimientosDeBanco.js';
	import type DTOFiltrosMovimientosBanco from '../DTOFiltrosMovimientosBanco.js';
	import type DTOMovimientosBanco from '../DTOMovimientosBanco.js';



    export let data;
    
    let error = "";
    let permisos : string[] = [];

    let usuario : string = "";

    let filtros : DTOFiltrosMovimientosBanco = {
		emisiones: false,
		fechaDesde: new Date(),
		fechaHasta: new Date(),
		nroCBFiltro: 0,
		recepciones: false,
		transferencias: false
	};

    let dto : DTOMovimientosBanco = {
		nombreBanco: "",
		detalles: []
	}

    onMount(async () => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_BANCOS_PROPIOS")) {
            window.location.href = "/";
        }

        filtrar();

    });

    async function filtrar() {
        error = "";
        let response = await ServicioVerMovimientosDeBanco.filtrar(data.banco, filtros);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;

        if (dto.detalles.length === 0) {
            error = "No se encontró transferencias que cumplan los criterios especificados";
        }
    }

    async function ver(nroTransferencia: number) {
        window.location.href = `./${data.banco}/${nroTransferencia}`;
    }
    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Movimientos</h2>
    <h4 class="text-center text-dark text-bold text-big">Banco {dto.nombreBanco}</h4>
    
    <div class="buttons d-flex flex-row justify-content-between">
    
    </div>
    
    <table class="w-100">
        <thead>
            <tr>
                <th>N.°</th>
                <th>Fecha</th>
                <th>N.° CB Origen</th>
                <th>Titular CB Origen</th>
                <th>N.° CB Destino</th>
                <th>Titular CB Destino</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Info</th>
            </tr>
        </thead>
        <tbody>
            {#each dto.detalles as d}
                <tr>
                    <td>{d.nroTransferencia}</td>
                    <td>{d.fhTransferencia}</td>
                    <td>{d.nroCBOrigen}</td>
                    <td>{d.nombreTitularOrigen}</td>
                    <td>{d.nroCBDestino}</td>
                    <td>{d.nombreTitularDestino}</td>
                    <td>{d.monto}</td>
                    <td>{d.anulada ? "Anulada" : "Vigente"}</td>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <td><img src="/eye.svg" alt="Ver" class="clickable" on:click={() => {ver(d.nroTransferencia)}}></td>
                </tr>
            {/each}
        </tbody>
    </table>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    .buttons {
        gap: 40px;
    }
</style>