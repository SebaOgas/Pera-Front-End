<script lang="ts">
	import { onMount } from 'svelte';
    import CheckBox from '$lib/CheckBox.svelte';
	import { ServicioVerMovimientosDeBanco } from '../ServicioVerMovimientosDeBanco.js';
	import type DTOFiltrosMovimientosBanco from '../DTOFiltrosMovimientosBanco.js';
	import type DTOMovimientosBanco from '../DTOMovimientosBanco.js';
	import DatePicker, { formatDate } from '$lib/DatePicker.svelte';



    export let data;
    
    let error = "";
    let permisos : string[] = [];

    let ayer : Date = new Date();
    ayer.setDate(ayer.getDate() - 1);

    let manana : Date = new Date();
    manana.setDate(manana.getDate() + 1);


    let filtros : DTOFiltrosMovimientosBanco = {
		emisiones: true,
		fechaDesde: ayer,
		fechaHasta: manana,
		nroCBFiltro: null,
		recepciones: true,
		transferencias: true
	};

    let auxNroCB : string = "";

    $: filtros.nroCBFiltro = auxNroCB === "" ? null : Number.parseInt(auxNroCB);

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
        window.location.href = `/VerMovimientosDeBanco/detalle/${nroTransferencia}`;
    }
    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Movimientos</h2>
    <h4 class="text-center text-dark text-bold text-big">Banco {dto.nombreBanco}</h4>
    
    <div class="filters d-flex flex-row justify-content-between w-100 flex-wrap mb-4">
        <div class="d-flex flex-row justify-content-between align-items-center">
            <CheckBox bind:checked={filtros.emisiones} label="Emisiones" classes="text-dark"/>
            <CheckBox bind:checked={filtros.transferencias} label="Transferencias" classes="text-dark"/>
            <CheckBox bind:checked={filtros.recepciones} label="Recepciones" classes="text-dark"/>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center">
            <label class="text-dark d-flex flex-row justify-content-between align-items-center"><span>N.° CB </span> <input type="text" bind:value={auxNroCB}/></label>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center">
            <DatePicker width="200px" range bind:startDate={filtros.fechaDesde} bind:endDate={filtros.fechaHasta}/>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center">
            <button class="bg-light text-darker" on:click={filtrar}>Filtrar</button>
        </div>
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
                    <td>{formatDate(new Date(d.fhTransferencia), true)}</td>
                    <td>{d.nroCBOrigen !== null ? d.nroCBOrigen : "-"}</td>
                    <td>{d.nombreTitularOrigen !== null ? d.nombreTitularOrigen : "-"}</td>
                    <td>{d.nroCBDestino !== null ? d.nroCBDestino : "-"}</td>
                    <td>{d.nombreTitularDestino !== null ? d.nombreTitularDestino : "-"}</td>
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
    .filters, .filters>* {
        row-gap: 8px;
        column-gap: 20px;
    }

    label {
        white-space: nowrap;
    }

    label>span {
        margin-right: 4px;
    }
</style>