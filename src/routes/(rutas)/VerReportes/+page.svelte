<script lang="ts">
	import { onMount } from "svelte";
	import type DTOHistograma from "./DTOHistograma";
	import { TipoReporte } from "./TipoReporte";
	import ComboBox from "$lib/ComboBox.svelte";
	import DatePicker from "$lib/DatePicker.svelte";
	import Histogram from "$lib/Histogram.svelte";
	import { ServicioVerReportes } from "./ServicioVerReportes";
    
    let error : string = "";
    let dto : DTOHistograma | null = null;
    let permisos : string[] = [];

    onMount( async () => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);
        if(!permisos.includes("VER_REPORTES")) {
            window.location.href = "/";
        }
    });

    let tiposReporte = [];
    tiposReporte[TipoReporte.CUENTAS_POR_BANCO] = "Cuentas Por Banco";
    tiposReporte[TipoReporte.BANCOS_ABIERTOS_CERRADOS] = "Bancos Abiertos y Cerrados";
    tiposReporte[TipoReporte.MONTOS_TRANSFERIDOS] = "Montos Transferidos";
    tiposReporte[TipoReporte.CANTIDAD_REGISTRACIONES] = "Cantidad de Registraciones";
    tiposReporte[TipoReporte.CANTIDAD_SUSCRIPCIONES] = "Cantidad de Suscripciones";

    let reporte_selec : TipoReporte;

    let hoy : Date = new Date();
    hoy.setHours(0, 0, 0, 0);
    let mesPasado = new Date();
    mesPasado.setDate(hoy.getDate() - 30);
    mesPasado.setHours(0, 0, 0, 0);
    let manana = new Date();
    manana.setDate(hoy.getDate() + 1);
    manana.setHours(0, 0, 0, 0);

    function selectReporte(tipo: TipoReporte) {
        reporte_selec = tipo;
        dto = null;
    }

    let datos : any[] = [];
    datos[TipoReporte.CUENTAS_POR_BANCO] = {
        fecha: hoy,
        intervalo: 5,
        xLabel: "N.° Cuentas",
        yLabel: "N.° Bancos"
    };
    datos[TipoReporte.BANCOS_ABIERTOS_CERRADOS] = {
        fechaInicio: mesPasado,
        fechaFin: manana,
        intervalo: 5,
        yLabel: "N.° Bancos <span style=color:#9DF069;>Abiertos</span> vs Cerrados",
        xLabel: "Fechas"
    };
    datos[TipoReporte.MONTOS_TRANSFERIDOS] = {
        fechaInicio: mesPasado,
        fechaFin: manana,
        intervalo: 5,
        nroBanco: null,
        yLabel: "Monto Transferido",
        xLabel: "Fechas"
    };
    datos[TipoReporte.CANTIDAD_REGISTRACIONES] = {
        fechaInicio: mesPasado,
        fechaFin: manana,
        intervalo: 5,
        yLabel: "N.° Registraciones",
        xLabel: "Fechas"
    };
    datos[TipoReporte.CANTIDAD_SUSCRIPCIONES] = {
        fechaInicio: mesPasado,
        fechaFin: manana,
        yLabel: "N.° Suscripciones",
        xLabel: "Plan"
    };
    

    async function plot() {
        error = "";
        let response : DTOHistograma | string;

        switch (reporte_selec) {
            case TipoReporte.CUENTAS_POR_BANCO:
                response = await ServicioVerReportes.cuentasPorBanco(datos[reporte_selec].fecha, datos[reporte_selec].intervalo);
                break;
            case TipoReporte.BANCOS_ABIERTOS_CERRADOS:
                response = await ServicioVerReportes.bancosAbiertosCerrados(datos[reporte_selec].fechaInicio, datos[reporte_selec].fechaFin, datos[reporte_selec].intervalo);
                break;
            case TipoReporte.MONTOS_TRANSFERIDOS:
                if(datos[reporte_selec].nroBanco === null) {
                    error = "Ingrese el número del banco";
                    return;
                }
                response = await ServicioVerReportes.montosTransferidos(datos[reporte_selec].fechaInicio, datos[reporte_selec].fechaFin, datos[reporte_selec].intervalo, datos[reporte_selec].nroBanco);
                break;
            case TipoReporte.CANTIDAD_REGISTRACIONES:
                response = await ServicioVerReportes.cantidadRegistraciones(datos[reporte_selec].fechaInicio, datos[reporte_selec].fechaFin, datos[reporte_selec].intervalo);
                break;
            case TipoReporte.CANTIDAD_SUSCRIPCIONES:
                response = await ServicioVerReportes.cantidadSuscripciones(datos[reporte_selec].fechaInicio, datos[reporte_selec].fechaFin);
                break;
            default:
                error = "Tipo de reporte inválido"
                return;
        }

        if (typeof response === "string") {
            error = response;
        } else {
            dto = response;
        }
    }

</script>

<div class="container w-100 h-100">
    <h1 class="text-center text-dark text-bold">Reportes</h1>
    <div class="d-flex justify-content-end w-100 mb-3">
        <ComboBox placeholder="Tipo de Reporte" value={tiposReporte[reporte_selec]}>
            {#each tiposReporte as t, i}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <span on:click={() => {selectReporte(i)}}>{t}</span>
            {/each}
        </ComboBox>
    </div>
    <div class="d-flex justify-content-start align-items-center w-100 mb-3">
        {#if reporte_selec === TipoReporte.CUENTAS_POR_BANCO}
            <DatePicker width="180px" bind:value={datos[reporte_selec].fecha}/>
            <label class="ms-2">Intervalo: <input type="number" bind:value={datos[reporte_selec].intervalo} min={1}/></label>
            <button class="bg-light text-darker ms-2" on:click={plot}>Aceptar</button>
        {:else if reporte_selec === TipoReporte.BANCOS_ABIERTOS_CERRADOS}
            <DatePicker width="180px" range={true} bind:startDate={datos[reporte_selec].fechaInicio} bind:endDate={datos[reporte_selec].fechaFin}/>
            <label class="ms-2">Intervalo (días): <input type="number" bind:value={datos[reporte_selec].intervalo} min={1}/></label>
            <button class="bg-light text-darker ms-2" on:click={plot}>Aceptar</button>
        {:else if reporte_selec === TipoReporte.MONTOS_TRANSFERIDOS}
            <DatePicker width="180px" range={true} bind:startDate={datos[reporte_selec].fechaInicio} bind:endDate={datos[reporte_selec].fechaFin}/>
            <label class="ms-2">N.° Banco: <input type="number" bind:value={datos[reporte_selec].nroBanco} min={0}/></label>
            <label class="ms-2">Intervalo: <input type="number" bind:value={datos[reporte_selec].intervalo} min={1}/></label>
            <button class="bg-light text-darker ms-2" on:click={plot}>Aceptar</button>
        {:else if reporte_selec === TipoReporte.CANTIDAD_REGISTRACIONES}
            <DatePicker width="180px" range={true} bind:startDate={datos[reporte_selec].fechaInicio} bind:endDate={datos[reporte_selec].fechaFin}/>
            <label class="ms-2">Intervalo: <input type="number" bind:value={datos[reporte_selec].intervalo} min={1}/></label>
            <button class="bg-light text-darker ms-2" on:click={plot}>Aceptar</button>
        {:else if reporte_selec === TipoReporte.CANTIDAD_SUSCRIPCIONES}
            <DatePicker width="180px" range={true} bind:startDate={datos[reporte_selec].fechaInicio} bind:endDate={datos[reporte_selec].fechaFin}/>
            <button class="bg-light text-darker ms-2" on:click={plot}>Aceptar</button>
        {/if}
    </div>

    {#if dto !== null}
        <h3 class="text-left text-dark text-bold">{dto.titulo !== undefined && dto.titulo !== null ? dto.titulo : ""}</h3>
        <Histogram content={dto.items} width="100%" xLabel={datos[reporte_selec].xLabel} yLabel={datos[reporte_selec].yLabel} barColors={["#9DF069", "#76951F"]} barBorderColors={["#76951F", "#142D2D"]}/>
    {/if}
    
    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">{error}</span>
    </div>  

</div>


<style>
    input[type=number] {
        width: 50px;
    }
</style>