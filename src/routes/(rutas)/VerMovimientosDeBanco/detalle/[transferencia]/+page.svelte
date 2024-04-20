<script lang="ts">
	import { onMount } from 'svelte';
    import CheckBox from '$lib/CheckBox.svelte';
	import DatePicker, { formatDate } from '$lib/DatePicker.svelte';
	import { ServicioVerMovimientosDeBanco } from '../../ServicioVerMovimientosDeBanco.js';
	import type DTODetallesMovimientosBancoSeleccionado from '../../DTODetallesMovimientosBancoSeleccionado.js';



    export let data;
    
    let error = "";
    let permisos : string[] = [];

    let dto : DTODetallesMovimientosBancoSeleccionado = {
		anulada: false,
		fhTransferencia: new Date(),
		monto: 0,
		motivo: '',
		nombreTitularDestino: '',
		nombreTitularOrigen: '',
		nroCBDestino: null,
		nroCBOrigen: null,
		nroTransferencia: 0,
		responsable: '',
		tipo: ''
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

        error = "";
        let response = await ServicioVerMovimientosDeBanco.getDetalle(data.transferencia);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;

    });

    async function anular() {
        let response = await ServicioVerMovimientosDeBanco.anular(data.transferencia);
        if (typeof response === "string") {
            error = response;
            return;
        }
        window.location.reload();
    }
    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Movimientos</h2>
    
    <div class="text-dark text-medium">
        N.° de Transferencia: {dto.nroTransferencia}
    </div>
    <div class="text-dark text-medium">
        Tipo: {dto.tipo}
    </div>
    <div class="text-dark text-medium">
        Fecha: {formatDate(new Date(dto.fhTransferencia), true)}
    </div>
    {#if dto.tipo === "emisión"}
        <div class="text-dark text-medium">
            Responsable: {dto.responsable}
        </div>
    {/if}
    {#if dto.tipo !== "emisión"}
        <div class="text-dark text-medium">
            N.° Cuenta Bancaria Origen: {dto.nroCBOrigen}
        </div>
        <div class="text-dark text-medium">
            Titular Cuenta Bancaria Origen: {dto.nombreTitularOrigen}
        </div>
    {/if}
    {#if dto.tipo !== "recepción"}
        <div class="text-dark text-medium">
            N.° Cuenta Bancaria Destino: {dto.nroCBDestino}
        </div>
        <div class="text-dark text-medium">
            Titular Cuenta Bancaria Destino: {dto.nombreTitularDestino}
        </div>
    {/if}
    <div class="text-dark text-medium">
        Monto: {dto.monto}
    </div>
    <div class="text-dark text-medium">
        Estado: {dto.anulada ? "Anulada" : "Vigente"}
    </div>
    <div class="text-dark text-medium">
        Motivo: {dto.motivo}
    </div>

    <div class="buttons d-flex flex-row justify-content-end w-100">
        {#if !dto.anulada}
            <button class="bg-darker text-lighter" on:click={anular}>Anular</button>
        {/if}
        <button class="bg-light text-darker" on:click={() => window.history.back()}>Aceptar</button>
    </div>
    

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    .buttons {
        gap: 20px;
    }
</style>