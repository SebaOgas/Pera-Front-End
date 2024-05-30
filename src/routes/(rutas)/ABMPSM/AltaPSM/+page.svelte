<script lang="ts">
	import { onMount } from 'svelte';
	import { ServicioABMPSM } from '../ServicioABMPSM';
	import DatePicker from '$lib/DatePicker.svelte';
	import type DTOABMPSM from '../DTOABMPSM';
    
    let error = "";
    let permisos : string[] = [];
    
    let dto : DTOABMPSM = {
		nroSimbolo: 0,
        simbolo: "",
        fechaInicio: new Date,
        fechaFin: new Date
	};

    onMount(async () => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_PARAMETROS")) {
            window.location.href = "/";
        }

    });

    async function altaPSM() {
        
        let response = await ServicioABMPSM.altaPSM(dto);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.history.back();

    }
    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Administrar Parametro</h2>
    <h4 class="text-center text-dark text-bold text-big">Simbolos de Monedas</h4>
    <h4 class="text-center text-dark text-bold text-big">Alta</h4>
    
    <div>
        <div style="display: flex; align-items:center; flex-direction:column">
            <div class="w-100">
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Simbolo</span>
                    <input type="text" bind:value={dto.simbolo}>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Fecha de Alta</span>
                    <DatePicker bind:value={dto.fechaInicio}/>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Fecha de Baja</span>
                    <DatePicker bind:value={dto.fechaFin}/>
                </div>
            </div>
        </div>
    </div>
    
    <div class="d-flex justify-content-end w-100 mb-3" style="gap: 20px;">
        <button class="bg-darker text-lighter text-medium" on:click={()=>{window.history.back()}}>Cancelar</button>
        <button class="bg-light text-darker text-medium" on:click={altaPSM}>Aceptar</button>
    </div>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    
</style>