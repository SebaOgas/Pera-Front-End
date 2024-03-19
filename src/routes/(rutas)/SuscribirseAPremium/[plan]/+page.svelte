<script lang="ts">
	import Money from "$lib/Money.svelte";
	import { onMount } from "svelte";

    export let data;

    let form : HTMLElement;
    let buttons : HTMLElement[] = new Array();

    onMount(async () => {
        //Obtener Medios de Pago
        data.idPlan;
    });

    let medioDePago : number;
    let finalizado : boolean = false;

    function selectMedioDePago(id : number) {
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

        medioDePago = id;
    }


    async function realizarPago() {
        //Realizar Pago
        finalizado = true;
    }

</script>

<div class="container w-75 h-100">
    <h1 class="text-center text-dark text-bold">Realizar Pago</h1>

    <div class="d-flex flex-row justify-content-between align-items-center w-50 mx-auto">
        <div class="left_data">
            <h4 class="text-center text-dark text-bold">Nombre Plan</h4>
            <div class="text-center text-medium m-1">
                Disfrute de las ventajas de Premium por 30 días
            </div>
        </div>
        <Money numero={2999.99} color="dark"/>
    </div>

    <div bind:this={form} class="form d-flex flex-column align-items-center">
        {#if !finalizado}
        <h4 class="text-center text-dark text-bold">Medio de Pago:</h4>

        <div class="opciones_pago d-flex flex-row justify-content-center align-items-center">
            <button class="text-small bg-light text-darker" bind:this={buttons[0]} on:click={() => selectMedioDePago(0)}>Mercado Pago</button>
            <button class="text-small bg-light text-darker" bind:this={buttons[1]} on:click={() => selectMedioDePago(1)}>Débito MasterCard</button>
            <button class="text-small bg-light text-darker" bind:this={buttons[2]} on:click={() => selectMedioDePago(2)}>Crédito MasterCard</button>
            <button class="text-small bg-light text-darker" bind:this={buttons[3]} on:click={() => selectMedioDePago(3)}>Crédito Visa</button>
    
        </div>
    
        <div class="d-flex flex-column justify-content-center align-items-center">
            {#if medioDePago === 0}
                <div>Formulario para Mercado Pago</div>
                <button class="text-medium text-darker bg-light" on:click={realizarPago}>Aceptar</button>    
            {:else if medioDePago === 1}
                <div>Formulario para Débito MasterCard</div>
                <button class="text-medium text-darker bg-light">Aceptar</button>   
            {/if}

        </div>

        {:else}
            <div class="text-medium text-dark">Pago realizado exitosamente</div>
            <h4 class="text-center text-dark text-bold">¡Ya puede disfrutar de los beneficios de Pera Premium!</h4>
            <div class="text-medium text-dark">Válido hasta el dd/MM/yyyy</div>
            
            <button class="text-medium text-darker bg-light" on:click={() => {window.location.href = "/Usuario"}}>Finalizar</button> 
        {/if}
    </div>
    
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