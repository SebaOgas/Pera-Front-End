<script lang="ts">
	import { onMount } from "svelte";
	import { ServicioRealizarTransferencia } from "../ServicioRealizarTransferencia";
	import type DTOConfirmacionTransferencia from "../DTOConfirmacionTransferencia";


    let dtoTransferencia : DTOConfirmacionTransferencia = {
        nroCBOrigen: 0,
        nroCBDestino: 0,
        monto: 0,
        motivo: ""
    };

    let nroTransferencia: number = 0;

    let finalizado = false;

    let error : string = "";

    let permisos : string[] = [];

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

        let response = await ServicioRealizarTransferencia.getDatosConfirmacionTransferencia();
        if (typeof response === "string") {
            error = response;
            return;
        }

        dtoTransferencia = response;
    });

    async function confirmar() {
        let response = await ServicioRealizarTransferencia.confirmar(true);
        if (typeof response === "string") {
            error = response;
            return;
        }

        nroTransferencia = response;
        finalizado = true;
    }
    
</script>

{#if !finalizado}
    <h2 style="padding-bottom: 30px;" class="text-center text-dark text-bold">¿Esta seguro de que desea realizar la siguiente transferencia?</h2>
{/if}

<div style="width: 30%;" class="container h-100">
    {#if !finalizado}
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">De:</span>
        <span class="text-medium text-darker">{dtoTransferencia.nroCBOrigen}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Para:</span>
        <span class="text-medium text-darker">{dtoTransferencia.nroCBDestino}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Monto:</span>
        <span class="text-medium text-darker">{dtoTransferencia.monto}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Motivo:</span>
        <span class="text-medium text-darker">{dtoTransferencia.motivo}</span>
    </div>
    {:else}
    <h2 class="text-center text-dark text-bold">Transferencia exitosa</h2>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">De:</span>
        <span class="text-medium text-darker">{dtoTransferencia.nroCBOrigen}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Para:</span>
        <span class="text-medium text-darker">{dtoTransferencia.nroCBDestino}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Monto:</span>
        <span class="text-medium text-darker">{"$"}{dtoTransferencia.monto}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Motivo:</span>
        <span class="text-medium text-darker">{dtoTransferencia.motivo}</span>
    </div>
    <div class="d-flex justify-content-between w-100 mb-3">
        <span class="text-medium text-darker">Transferencia numero:</span>
        <span class="text-medium text-darker">{nroTransferencia}</span>
    </div>
    {/if}

    <div style="gap: 100px; d" class="mt-4 d-flex flex-row justify-content-center">
        {#if !finalizado}
        <button class="text-medium bg-darker text-lighter" on:click={() => {window.location.href = "/MisBancos";}}>Cancelar</button>
        <button class="text-medium bg-light" on:click={confirmar}>Continuar</button>
        {:else}
        <button class="text-medium bg-light" on:click={() => {window.location.href = "/MisCuentasBancarias";}}>Finalizar</button>
        {/if}
    </div>
</div>