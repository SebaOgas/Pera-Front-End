<script lang="ts">
	import { onMount } from "svelte";
	import type DTODetallesAltaConfiguracionRol from "../DTODetallesAltaConfiguracionRol";
	import { ServicioABMConfiguracionRol } from "../ServicioABMConfiguracionRol";
	import type DTOAltaConfiguracionRol from "../DTOAltaConfiguracionRol";
	import ComboBox from "$lib/ComboBox.svelte";
	import DatePicker from "$lib/DatePicker.svelte";
	import CheckBox from "$lib/CheckBox.svelte";

    let error : string = "";
    let permisos : string[] = [];
    let permisosSeleccionados: string[] = [];
    let permisoN: string = "";

    let dto: DTODetallesAltaConfiguracionRol = {
		roles: [],
        permisos: []
	};

    let dtoConfirmacion: DTOAltaConfiguracionRol = {
        nroConfig: 0,
        nombreRol: "",
        fechaInicio: new Date,
        fechaFin: new Date,
        permisos: []
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

        altaConfiguracion();
    });

    async function altaConfiguracion() {

        let response = await ServicioABMConfiguracionRol.altaConfiguracion();
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;
    }

    async function aceptar(){

        addPermiso();
        dtoConfirmacion.permisos = permisosSeleccionados;

        console.log(permisosSeleccionados);
        
        let response = await ServicioABMConfiguracionRol.confirmar(dtoConfirmacion);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.history.back();
    }

    async function setRolSeleccionado(rol: string){
        dtoConfirmacion.nombreRol = rol;
    }

    function addPermiso() {
        if (!permisosSeleccionados.includes(permisoN)) {
            permisosSeleccionados = [...permisosSeleccionados, permisoN];
        }
    }


</script>

<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Administrar Parametro</h2>
    <h4 class="text-center text-dark text-bold text-big">Permisos correspondientes a los roles</h4>

    <h4 class="text-center text-dark text-bold text-big">Alta</h4>

    <div class="main d-flex justify-content-between">
        <div style="display: flex; align-items:center; flex-direction:column">
            <div class="w-100">
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Rol</span>
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <ComboBox placeholder="nombreRol" value="{dtoConfirmacion.nombreRol}" width={40}>
                        {#each dto.roles as r}
                        <span on:click={() => setRolSeleccionado(r)}>{r}</span>
                        {/each}
                    </ComboBox>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Fecha de Inicio</span>
                    <DatePicker bind:value={dtoConfirmacion.fechaInicio}/>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Fecha de Fin</span>
                    <DatePicker bind:value={dtoConfirmacion.fechaFin}/>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Permisos</span>
                    {#each dto.permisos as p}
                    <CheckBox label="{p}" bind:value={permisoN}/>
                    {/each}
                </div>
            </div>
        </div>
    </div>

    <div class="d-flex justify-content-end w-100 mb-3" style="gap: 20px;">
        <button class="bg-darker text-lighter text-medium" on:click={()=>{window.history.back()}}>Cancelar</button>
        <button class="bg-light text-darker text-medium" on:click={aceptar}>Aceptar</button>
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