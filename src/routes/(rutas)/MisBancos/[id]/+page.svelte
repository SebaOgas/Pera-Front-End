<script lang="ts">
	import { onMount } from "svelte";
	import type DTOBanco from "./DTOBanco";
	import { ServicioBanco } from "./ServicioBanco";
	import Money from "$lib/Money.svelte";

    export let data;

    let error : string = "";
    let dto: DTOBanco = {
		nroBanco: 0,
		nombre: "",
		estado: "",
		simboloMoneda: "",
		usaPassword: "",
		usaHabilitacionAutomatica: "",
		emailDueno: "",
		baseMonetaria: 0,
		nombreDueno: "",
		nroCB: 0,
		esDueno: false
	};
    
    onMount( async () => {


    let response : DTOBanco | string = await ServicioBanco.get(data.id);
        if (typeof response === "string") {
            error = response;
            //window.location.href ="/";
        } else {
            dto = response;
        }
    });

    async function transferirDominio() {
        
        window.location.href = `/TransferirDominioDeBanco/${dto.nroBanco}`;
    }

    async function emitir() {
        
        window.location.href = `/EmitirDinero/${dto.nroCB}`;
    }

    async function administrarBanco() {
        
        window.location.href = `/AdministrarBancoPropio/${dto.nroBanco}`;
    }

    async function verMovimientos() {
        
        window.location.href = `/VerMovimientosDeBanco/${dto.nroBanco}`;
    }

    async function adminCuentasHab() {
        
        window.location.href = `/AdministrarHabilitacionCuentasBancarias/${dto.nroBanco}`;
    }

    async function adminBanqueros() {
        
        window.location.href = `/AdministrarBanqueros/${dto.nroCB}`;
    }


</script>

<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold">Detalles de Banco</h2>
    <div class="main d-flex justify-content-between">
        <div style="display: flex; align-items:center; flex-direction:column">
            <div class="w-100">
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">N.°</span>
                    <span class="text-medium text-darker">{dto.nroBanco}</span>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Nombre</span>
                    <span class="text-medium text-darker">{dto.nombre}</span>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Estado</span>
                    <span class="text-medium text-darker">{dto.estado}</span>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Simbolo de la Moneda</span>
                    <span class="text-medium text-darker">{dto.simboloMoneda}</span>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Tiene contraseña</span>
                    <span class="text-medium text-darker">{dto.usaPassword}</span>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Habilitar cuentas nuevas automáticamente</span>
                    <span class="text-medium text-darker">{dto.usaHabilitacionAutomatica}</span>
                </div>
            </div>
            {#if dto.esDueno}
            <button class="bg-light text-darker text-medium" on:click={administrarBanco}>Administrar Banco</button>
            {/if}
        </div>
        <div style="display: flex; align-items:center; flex-direction:column; justify-content:space-between; gap:20px" class="">
            <div style="display: flex; align-items:center; flex-direction:column; justify-content:space-between" class="mb-2 w-100">
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Dueño</span>
                    <span class="text-medium text-darker">{dto.nombreDueno} (mail: {dto.emailDueno})</span>
                </div>
                {#if dto.esDueno}
                <button class="bg-light text-darker text-medium" on:click={transferirDominio}>Transferir Dominio</button>
                {/if}
                <div class="d-flex justify-content-between align-items-center w-100 mb-3">
                    <span class="text-medium text-darker">Base Monetaria</span>
                    <span class="text-medium text-darker"><Money numero={dto.baseMonetaria} color="darker"/></span>
                </div>
                <button class="bg-light text-darker text-medium" on:click={emitir}>Emitir Dinero</button>
            </div>
            <div class="d-flex justify-content-between flex-column" style="gap: 10px">
                <button class="bg-light text-darker text-medium" on:click={verMovimientos}>Ver Movimientos</button>
                <button class="bg-light text-darker text-medium" on:click={adminCuentasHab}>Administrar Cuentas Habilitadas</button>
                {#if dto.esDueno}
                <button class="bg-light text-darker text-medium" on:click={adminBanqueros}>Administrar Banqueros</button>
                {/if}
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">{error}</span>
    </div>
</div>


<style>
    .main {
        gap: 40px;
    }
    .main>* {
        flex: 1 1 auto;
    }
</style>