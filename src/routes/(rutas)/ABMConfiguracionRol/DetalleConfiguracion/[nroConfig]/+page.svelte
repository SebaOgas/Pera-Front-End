<script lang="ts">
	import { onMount } from "svelte";
	import Money from "$lib/Money.svelte";
	import type DTOAltaConfiguracionRol from "../../DTOAltaConfiguracionRol";
	import { ServicioABMConfiguracionRol } from "../../ServicioABMConfiguracionRol";

    export let data;

    let error : string = "";
    let permisos : string[] = [];

    let dto: DTOAltaConfiguracionRol = {
		nroConfig: 0,
        nombreRol: "",
        fechaInicio: new Date,
        fechaFin: new Date,
        permisos: []
	};
    
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

        getDetalleConfiguracion();
    });

    async function getDetalleConfiguracion() {

        let response = await ServicioABMConfiguracionRol.getDetalleConfiguracion(data.nroConfig);
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;
    }

    async function aceptar(){
        window.location.href = `/ABMConfiguracionRol`;
    }


</script>

<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Administrar Parametro</h2>
    <h4 class="text-center text-dark text-bold text-big">Permisos correspondientes a los roles</h4>

    <h4 class="text-center text-dark text-bold text-big">Detalles</h4>

    <div class="main d-flex justify-content-between">
        <div style="display: flex; align-items:center; flex-direction:column">
            <div class="w-100">
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">N.°</span>
                    <span class="text-medium text-darker">{dto.nroConfig}</span>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Rol</span>
                    <span class="text-medium text-darker">{dto.nombreRol}</span>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Fecha de Inicio</span>
                    <span class="text-medium text-darker">{dto.fechaInicio}</span>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Fecha de Fin</span>
                    <span class="text-medium text-darker">{dto.fechaFin}</span>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Permisos</span>
                    <div style="display: flex; flex-direction:column;">
                        {#each dto.permisos as p}
                            <span class="text-medium text-darker">{p}</span>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="d-flex justify-content-end w-100 mb-3">
        <button class=" bg-light text-darker text-medium" on:click={aceptar}>Aceptar</button>
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