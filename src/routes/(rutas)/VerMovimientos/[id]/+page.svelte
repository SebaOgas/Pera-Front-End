<script lang="ts">
	import { onMount } from 'svelte';
	import DatePicker, { formatDate } from '$lib/DatePicker.svelte';
	import type DTOFiltrosVerMovimientos from '../DTOFiltrosVerMovimientos.js';
	import type DTOVerMovimientos from '../DTOVerMovimientos.js';
	import { ServicioVerMovimientos } from '../ServicioVerMovimientos.js';

    export let data;
    
    let error = "";
    let permisos : string[] = [];

    let ayer : Date = new Date();
    ayer.setDate(ayer.getDate() - 1);

    let manana : Date = new Date();
    manana.setDate(manana.getDate() + 1);


    let filtros : DTOFiltrosVerMovimientos = {
        filtroNombreUsuario: "",
        filtroNroCB: "",
        fechaDesde: ayer,
        fechaHasta: manana
	};

    let dto : DTOVerMovimientos = {
		nroCuenta: 0,
        detalles: []
	};

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

        getMovimientosCuentas();

    });

    async function getMovimientosCuentas() {
        error = "";
        let response = await ServicioVerMovimientos.getMovimientosCuentas(data.id, filtros);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;

        if (dto.detalles.length === 0) {
            error = "No se encontraron transferencias que cumplan los criterios especificados";
        }

    }

    async function ver(nroTransferencia: number) {
        window.location.href = `/VerMovimientos/VerDetalleMovimiento/${nroTransferencia}`;
    }
    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Movimientos</h2>
    <h4 class="text-center text-dark text-bold text-big">Cuenta Nº {dto.nroCuenta}</h4>
    
    <div class="filters d-flex flex-row justify-content-between w-100">
        <div class="d-flex flex-row justify-content-between align-items-center">
            <label class="text-dark d-flex flex-row justify-content-between align-items-center"><span>Nombre del Usuario </span> <input type="text" bind:value={filtros.filtroNombreUsuario}/></label>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center">
            <label class="text-dark d-flex flex-row justify-content-between align-items-center"><span>N.° CB </span> <input type="text" bind:value={filtros.filtroNroCB}/></label>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center">
            <DatePicker width="200px" range bind:startDate={filtros.fechaDesde} bind:endDate={filtros.fechaHasta}/>
        </div>
        <div class="d-flex flex-row justify-content-between align-items-center">
            <button class="bg-light text-darker" on:click={getMovimientosCuentas}>Filtrar</button>
        </div>
    </div>
    
    <table class="w-100">
        <thead>
            <tr>
                <th>N.°</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Nº CB</th>
                <th>Titular CB</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Info</th>
            </tr>
        </thead>
        <tbody>
            {#each dto.detalles as d}
                <tr>
                    <td>{d.nroTransferencia}</td>
                    <td>{formatDate(new Date(d.fechaTransferencia), true)}</td>
                    <td>{d.tipoTransferencia}</td>
                    <td>{d.nroCBTransferencia}</td>
                    <td>{d.titularCB}</td>
                    <td>{d.montoTransferencia}</td>
                    <td>{d.estadoTransferencia}</td>
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
        gap: 20px;
    }

    label {
        white-space: nowrap;
    }

    label>span {
        margin-right: 4px;
    }
</style>