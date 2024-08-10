<script lang="ts">
	import { onMount } from "svelte";
	import { ServicioABMConfiguracionPrecioPremium } from "../ServicioABMConfiguracionPrecioPremium";
	import type DTODetallesCPP from "../DTODetallesCPP";
	import DatePicker from "$lib/DatePicker.svelte";
	import type DTODetallesCPPPrecioPremium from "../DTODetallesCPPPrecioPremium";

    let error : string = "";
    let permisos : string[] = [];

    let dto: DTODetallesCPP = {
        nroConfig: 0,
        fechaInicio: new Date(),
        fechaFin: null,
        planes: []
    }

    $: planes = dto.planes;
    
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

    });

    async function altaConfiguracion(){
        error = "";
        if(dto.fechaInicio === null) {
            error = "Ingrese la fecha de inicio de vigencia";
            return;
        }
        dto.planes.forEach(p => {
            if(p.nombre === "") {
                error = "Los planes deben tener un nombre";
                return;
            }
            if(p.duracion < 1) {
                error = "Los planes deben tener una duración";
                return;
            }
            if(p.precio < 1) {
                error = "Los planes deben tener un precio";
                return;
            }
        });
        if(error != "") return;

        if(dto.planes.length === 0) {
            error = "Debe ingresar al menos un plan";
            return;
        }
        
        let response = await ServicioABMConfiguracionPrecioPremium.altaConfiguracion(dto);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.history.back();
    }

    function nuevoPlan() {
        let plan : DTODetallesCPPPrecioPremium = {
			nombre: "",
			duracion: 30,
			descripcion: "",
			precio: 1
		}

        dto.planes = [...dto.planes, plan];
    }

    function eliminarPlan(plan: DTODetallesCPPPrecioPremium) {
        dto.planes = dto.planes.filter(p => p !== plan);
    }


</script>

<div class="container w-75 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Administrar Parámetro</h2>
    <h4 class="text-center text-dark text-bold text-big">Planes Premium</h4>

    <h4 class="text-center text-dark text-bold text-big">Alta</h4>

    <div class="main d-flex flex-column">
        <div class="d-flex justify-content-between w-100 mb-2">
            <span class="text-medium text-darker">Fecha de Inicio</span>
            <DatePicker bind:value={dto.fechaInicio}/>
        </div>
        <div class="d-flex justify-content-between w-100 mb-3">
            <span class="text-medium text-darker">Fecha de Fin</span>
            <DatePicker bind:value={dto.fechaFin}/>
        </div>
        <div class="d-flex justify-content-between w-100 mb-3">
            <span class="text-medium text-darker">Planes</span>
            <button class="bg-light text-darker" on:click={nuevoPlan}>Nuevo</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Duración (días)</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each planes as plan}
                    <tr>
                        <td><input type="text" bind:value={plan.nombre}></td>
                        <td><input type="number" min="1" bind:value={plan.duracion}></td>
                        <td><input type="text" bind:value={plan.descripcion}></td>
                        <td><input type="number" min="1" bind:value={plan.precio}></td>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                        <td><img src="/green_cross.svg" alt="Eliminar" class="clickable icon" on:click={()=>{eliminarPlan(plan)}}/></td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <div class="d-flex justify-content-end w-100 mb-3" style="gap: 20px;">
        <button class="bg-darker text-lighter text-medium" on:click={()=>{window.history.back()}}>Cancelar</button>
        <button class="bg-light text-darker text-medium" on:click={altaConfiguracion}>Aceptar</button>
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