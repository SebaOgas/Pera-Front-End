<script lang="ts">
	import { onMount } from "svelte";
	import { ServicioABMConfiguracionPrecioPremium } from "../../ServicioABMConfiguracionPrecioPremium";
	import type DTODetallesCPP from "../../DTODetallesCPP";
	import DatePicker, { formatDate } from "$lib/DatePicker.svelte";
	import type DTODetallesCPPPrecioPremium from "../../DTODetallesCPPPrecioPremium";

    let error : string = "";
    let permisos : string[] = [];
    export let data;

    let dto: DTODetallesCPP = {
        nroConfig: 0,
        fechaInicio: new Date(),
        fechaFin: null,
        planes: []
    }
    
    onMount( async () => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_PARAMETROS")) {
            window.location.href = "/";
        }

        getConfiguracion();

    });

    async function getConfiguracion(){
        
        
        let response = await ServicioABMConfiguracionPrecioPremium.getDetalleConfiguracion(data.nroConfig);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;
    }



</script>

<div class="container w-75 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Administrar Parámetro</h2>
    <h4 class="text-center text-dark text-bold text-big">Planes Premium</h4>

    <h4 class="text-center text-dark text-bold text-big">Detalle</h4>

    <div class="main d-flex flex-column">
        <div class="d-flex justify-content-between w-100 mb-2">
            <span class="text-medium text-darker">N.°</span>
            <span>{dto.nroConfig}</span>
        </div>
        <div class="d-flex justify-content-between w-100 mb-2">
            <span class="text-medium text-darker">Fecha de Inicio</span>
            <span>{formatDate(dto.fechaInicio)}</span>
        </div>
        <div class="d-flex justify-content-between w-100 mb-3">
            <span class="text-medium text-darker">Fecha de Fin</span>
            <span>{formatDate(dto.fechaFin)}</span>
        </div>
        <div class="d-flex justify-content-between w-100 mb-3">
            <span class="text-medium text-darker">Planes</span>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Duración (días)</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                {#each dto.planes as plan}
                    <tr>
                        <td>{plan.nombre}</td>
                        <td>{plan.duracion}</td>
                        <td>{plan.descripcion}</td>
                        <td>{plan.precio}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <div class="d-flex justify-content-end w-100 mb-3" style="gap: 20px;">
        <button class="bg-darker text-lighter text-medium" on:click={()=>{window.history.back()}}>Aceptar</button>
    </div>

    <div class="d-flex justify-content-center w-100 mb-3">
        <span class="text-medium text-dark">{error}</span>
    </div>
</div>


<style>

    .main>* {
        flex: 1 1 auto;
    }
</style>