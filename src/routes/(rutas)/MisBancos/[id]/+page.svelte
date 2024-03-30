<script lang="ts">
	import { onMount } from "svelte";
	import type DTOBanco from "./DTOBanco";
	import { ServicioBanco } from "./ServicioBanco";
	import Money from "$lib/Money.svelte";

    export let data;

    let error : string = "";
    let dto: DTOBanco
    
    onMount( async () => {


    let response : DTOBanco | string = await ServicioBanco.get(data.id);
        if (typeof response === "string") {
            error = response;
            window.location.href ="/";
        } else {
            dto = response;
        }
    });

    async function back() {
        
        window.history.back();
    }

    async function transferirDominio() {
        
        window.location.href = "/TransferirDominio";
    }

    async function emitir() {
        
        window.location.href = "/EmitirDinero";
    }

    async function administrarBanco() {
        
        window.location.href = "/AdministrarBanco";
    }

    async function verMovimientos() {
        
        window.location.href = "/VerMovimientos";
    }

    async function adminCuentasHab() {
        
        window.location.href = "/AdministrarCuentasHabilitadas";
    }

    async function adminBanqueros() {
        
        window.location.href = "/AdministrarBanqueros";
    }


</script>

<div class="container w-75 h-100">
    <h2 class="text-center text-dark text-bold">Detalles de Banco</h2>
    <div class="d-flex justify-content-between">
        <div style="display: flex; align-items:center; flex-direction:column">
            <div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">N.°</span>
                    <span class="text-medium text-darker">{dto?.nroBanco}</span>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Nombre</span>
                    <span class="text-medium text-darker">{dto?.nombreBanco}</span>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Estado</span>
                    <span class="text-medium text-darker">{dto?.estadoBanco}</span>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Simbolo de la Moneda</span>
                    <span class="text-medium text-darker">{dto?.simboloMoneda}</span>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Tiene contraseña</span>
                    <span class="text-medium text-darker">{dto?.usaPassword}</span>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Habilitar cuentas nuevas automáticamente</span>
                    <span class="text-medium text-darker">{dto?.usaHabilitacionAutomatica}</span>
                </div>
            </div>
            <button class="bg-light text-darker text-medium" on:click={administrarBanco}>Administrar Banco</button>
        </div>
        <div style="display: flex; align-items:center; flex-direction:column; justify-content:space-between; gap:20px">
            <div style="display: flex; align-items:center; flex-direction:column; justify-content:space-between">
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Dueño</span>
                    <span class="text-medium text-darker">{dto?.emailDueno}</span>
                </div>
                <button class="bg-light text-darker text-medium" on:click={transferirDominio}>Transferir Dominio</button>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Base Monetaria</span>
                    <span class="text-medium text-darker"><Money numero={dto?.baseMonetaria} color="dark"/></span>
                </div>
                <button class="bg-light text-darker text-medium" on:click={emitir}>Emitir Dinero</button>
            </div>
            <div class="d-flex justify-content-between flex-column" style="gap: 10px">
                <button class="bg-light text-darker text-medium" on:click={verMovimientos}>Ver Movimientos</button>
                <button class="bg-light text-darker text-medium" on:click={adminCuentasHab}>Administrar Cuentas Habilitadas</button>
                <button class="bg-light text-darker text-medium" on:click={adminBanqueros}>Administrar Banqueros</button>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">{error}</span>
    </div>
</div>