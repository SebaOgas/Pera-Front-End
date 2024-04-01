<script lang="ts">
	import { onMount } from 'svelte';
	import type DTOCuentaBancariaPropia from '../DTOCuentaBancariaPropia.js';
	import { ServicioMisCuentasBancarias } from '../ServicioMisCuentasBancarias';
	import Money from '$lib/Money.svelte';

    export let data;
    
    let error = "";
    let permisos : string[] = [];
    let cuenta : DTOCuentaBancariaPropia = {
		id: 0,
		nombreUsuario: '',
		monto: 0,
		moneda: '',
		fha: new Date(),
		fhb: new Date(),
		estado: '',
		alias: '',
		nroBanco: 0,
		nombreBanco: '',
		estadoBanco: ''
	};

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

        //Obtener bancos al cargar la pagina
        let response = await ServicioMisCuentasBancarias.obtenerCuentaBancariaPropia(data.id);

        if (typeof response === "string") {
            error = response;
            return;
        }

        cuenta = response;

    });
</script>

<div class="container w-75 h-100">
    <h2 class="text-center text-dark text-bold">Detalles de Cuenta Bancaria</h2>
    
    <div class="main d-flex flex-column flex-sm-row justify-content-between align-items-start">
        <div class="w-100 d-flex flex-column justify-content-center align-items-center">
            <span class="text-big text-dark">¡Hola, {cuenta.nombreUsuario}!</span>
            <span class="text-medium">Tienes depositado en esta cuenta</span>
            <Money simbolo={cuenta.moneda} numero={cuenta.monto}/>
            <button class="text-medium bg-light" on:click={() => {window.location.href=`/TransferirDinero/${cuenta.id}`;}}>Transferir</button>
        </div>
        <div class="right-col w-100 d-flex flex-column justify-content-start align-items-center">
            <div class="w-100 d-flex flex-column justify-content-start align-items-center">
                <div class="w-100 d-flex flex-row justify-content-between align-items-center text-medium">
                    <span>N.°</span>
                    <span>{cuenta.id}</span>
                </div>
                <div class="w-100 d-flex flex-row justify-content-between align-items-center text-medium">
                    <span>Fecha de Apertura</span>
                    <span>{new Date(cuenta.fha).toLocaleDateString("es-AR")}</span>
                </div>
                <div class="w-100 d-flex flex-row justify-content-between align-items-center text-medium">
                    <span>Fecha de Cierre</span>
                    <span>{cuenta.fhb !== null ? (new Date(cuenta.fhb).toLocaleDateString("es-AR")) : "-"}</span>
                </div>
                <div class="w-100 d-flex flex-row justify-content-between align-items-center text-medium">
                    <span>Estado</span>
                    <span>{cuenta.estado}</span>
                </div>
                <div class="w-100 d-flex flex-row justify-content-between align-items-center text-medium">
                    <span>Alias</span>
                    <span>{cuenta.alias}</span>
                </div>
            </div> 
            
            <div class="w-100 d-flex flex-column justify-content-start align-items-center">
                <div class="w-100 d-flex flex-row justify-content-between align-items-center text-medium">
                    <span>N.° del Banco</span>
                    <span>{cuenta.nroBanco}</span>
                </div>
                <div class="w-100 d-flex flex-row justify-content-between align-items-center text-medium">
                    <span>Nombre del Banco</span>
                    <span>{cuenta.nombreBanco}</span>
                </div>
                <div class="w-100 d-flex flex-row justify-content-between align-items-center text-medium">
                    <span>Estado del Banco</span>
                    <span>{cuenta.estadoBanco}</span>
                </div>
            </div>  

            <div class="buttons w-100 d-flex flex-row justify-content-center align-items-center">
                <button class="text-medium bg-light" on:click={() => {window.location.href=`/VerMovimientos/${cuenta.id}`;}}>Ver Movimientos</button>
                {#if !(cuenta.estado=="Deshabilitada")}
                <button class="text-medium bg-light" on:click={() => {window.location.href=`/AdministrarCuentaBancaria/${cuenta.id}`;}}>Modificar</button>
                {/if}
            </div>  
        </div> 

    </div>

    <div class="d-flex justify-content-center w-100">
        <span class="text-medium text-dark">{error}</span>
    </div>    

</div>


<style>

    .buttons {
        gap: 20px;
    }

    @media (min-width: 576px) {
        .main>div{
            width: 50%;
        }
    }

    .right-col {
        gap: 40px;
    }
</style>