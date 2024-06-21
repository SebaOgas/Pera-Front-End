<script lang="ts">
	import { onMount } from 'svelte';
	import DatePicker, { formatDate } from '$lib/DatePicker.svelte';
	import type DTODetallesVerMovimientosSeleccionado from '../../DTODetallesVerMovimientosSeleccionado.js';
	import { ServicioVerMovimientos } from '../../ServicioVerMovimientos.js';
    export let data;
    
    let error = "";
    let permisos : string[] = [];

    let dto : DTODetallesVerMovimientosSeleccionado = {
    nroTransferencia: 0,
    tipoTransferencia: "",
    fechaTransferencia: new Date,
    nroCBOrigen: null,
    titularCBOrigen: "",
    nroCBDestino: null,
    titularCBDestino: "",
    montoTransferencia: 0,
    estadoTransferencia: "",
    motivoTransferencia: ""
	}


    onMount(async () => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_CUENTAS_BANCARIAS_PROPIAS")) {
            window.location.href = "/";
        }

        error = "";
        let response = await ServicioVerMovimientos.getDetalle(data.transferencia);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;

    });
    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Movimientos</h2>
    
    <div class="text-dark text-medium">
        N.° de Transferencia: {dto.nroTransferencia}
    </div>
    <div class="text-dark text-medium">
        Tipo: {dto.tipoTransferencia}
    </div>
    <div class="text-dark text-medium">
        Fecha: {formatDate(new Date(dto.fechaTransferencia), true)}
    </div>
    <div class="text-dark text-medium">
        N.° Cuenta Bancaria Origen: {dto.nroCBOrigen != null ? dto.nroCBOrigen : "-"}
    </div>
    <div class="text-dark text-medium">
        Titular Cuenta Bancaria Origen: {dto.titularCBOrigen}
    </div>
    <div class="text-dark text-medium">
        N.° Cuenta Bancaria Destino: {dto.nroCBDestino != null ? dto.nroCBDestino : "-"}
    </div>
    <div class="text-dark text-medium">
        Titular Cuenta Bancaria Destino: {dto.titularCBDestino}
    </div>
    <div class="text-dark text-medium">
        Monto: {dto.montoTransferencia}
    </div>
    <div class="text-dark text-medium">
        Estado: {dto.estadoTransferencia}
    </div>
    <div class="text-dark text-medium">
        Motivo: {dto.motivoTransferencia}
    </div>

    <div class="buttons d-flex flex-row justify-content-end w-100">
        <button class="bg-light text-darker" on:click={() => window.history.back()}>Aceptar</button>
    </div>
    

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    .buttons {
        gap: 20px;
    }
</style>