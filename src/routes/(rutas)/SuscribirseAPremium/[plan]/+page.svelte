<script lang="ts">
	import Money from "$lib/Money.svelte";
	import { onMount } from "svelte";
	import { ServicioSuscribirseAPremium } from "../ServicioSuscribirseAPremium.js";
	import type DTOOpcionesPago from "../DTOOpcionesPago.js";
	import type DTODatosSuscripcionPremium from "../DTODatosPagoSuscripcionPremium.js";
	import type DTORespuestaSuscripcionPremium from "../DTORespuestaSuscripcionPremium.js";

    export let data;

    let form : HTMLElement;
    let buttons : HTMLElement[] = new Array();

    let info : DTOOpcionesPago = {
		idPP: -1,
		nombrePP: "",
		descripPP: "",
		precioPP: 0,
		mediosDePago: []
	};

    let error : string;

    onMount(async () => {
        //Obtener Medios de Pago
        let response = await ServicioSuscribirseAPremium.obtenerMediosDePago(data.idPlan);
        if (typeof response === "string") {
            error = response;
            return;
        }

        info = response;

    });

    let medioDePago : {id: number, nombre: string} = {
		id: -1,
		nombre: ""
	};

    let datosPago : DTODatosSuscripcionPremium = {
		idMedioDePago: -1,
		datosPago: {}
	};

    let finalizado : boolean = false;

    function selectMedioDePago(id : number, nombre : string) {
        console.log(id)
        buttons.forEach(e => {
            e.classList.add("bg-light");
            e.classList.remove("bg-dark");
            e.classList.add("text-darker");
            e.classList.remove("text-lighter");    
        });

        buttons[id].classList.remove("bg-light");
        buttons[id].classList.add("bg-dark");
        buttons[id].classList.remove("text-darker");
        buttons[id].classList.add("text-lighter");

        medioDePago.id = id;
        medioDePago.nombre = nombre;

        datosPago.idMedioDePago = id;
        
    }

    let detallesSuscripcion : DTORespuestaSuscripcionPremium;

    async function realizarPago() {
        //Realizar Pago
        let response = await ServicioSuscribirseAPremium.realizarPago(datosPago);
        
        if (typeof response === "string") {
            error = response;
            return;
        }

        detallesSuscripcion = response;
        
        finalizado = detallesSuscripcion.exito;
    }

</script>

<div class="container w-75 h-100">
    <h1 class="text-center text-dark text-bold">Realizar Pago</h1>

    <div class="d-flex flex-row justify-content-between align-items-center w-50 mx-auto">
        <div class="left_data">
            <h4 class="text-center text-dark text-bold">{info.nombrePP}</h4>
            <div class="text-center text-medium m-1">
                {info.descripPP}
            </div>
        </div>
        <Money numero={info.precioPP} color="dark"/>
    </div>

    <div bind:this={form} class="form d-flex flex-column align-items-center">
        {#if !finalizado}
        <h4 class="text-center text-dark text-bold">Medio de Pago:</h4>

        <div class="opciones_pago d-flex flex-row justify-content-center align-items-center">
            {#each info.mediosDePago as mdp}
                <button class="text-small bg-light text-darker" bind:this={buttons[mdp.idMDP]} on:click={() => selectMedioDePago(mdp.idMDP, mdp.nombreMDP)}>{mdp.nombreMDP}</button>
            {/each}   
        </div>
    
        <div class="d-flex flex-column justify-content-center align-items-center">
            {#if medioDePago.nombre === "Mercado Pago"}
                <div>Formulario para Mercado Pago</div>
                <button class="text-medium text-darker bg-light" on:click={realizarPago}>Aceptar</button>    
            {/if}

        </div>

        {:else}
            <div class="text-medium text-dark">{detallesSuscripcion.mensaje}</div>
            <h4 class="text-center text-dark text-bold">¡Ya puede disfrutar de los beneficios de Pera Premium!</h4>
            <div class="text-medium text-dark">Válido hasta el {new Date(detallesSuscripcion.fechaFin)}</div>
            
            <button class="text-medium text-darker bg-light" on:click={() => {window.location.href = "/Usuario"}}>Finalizar</button> 
        {/if}
    </div>

    {#if error !== undefined}
        <div class="d-flex justify-content-center w-100 mb-3">
            <span class="text-medium text-dark">{error}</span>
        </div>   
    {/if}
    
</div>

<style>
    .left_data {
        width: 168px;
    }

    .opciones_pago {
        gap: 20px;
    }

    .form {
       gap: 20px;
       margin-top: 20px;
    }
</style>