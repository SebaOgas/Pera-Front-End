<script lang="ts">
	import { onMount } from "svelte";
	import DatePicker from "$lib/DatePicker.svelte";
	import type DTOABMCMCBP from "../DTOABMCMCBP";
	import { ServicioABMCMCBP } from "../ServicioABMCMCBP";

    let error : string = "";
    let permisos : string[] = [];

    let dto : DTOABMCMCBP = {
		idCMCBP: 0,
        fechaInicio: new Date,
        fechaFin: new Date,
        cantidad: ""
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

    });

    async function confirmar() {

        let response = await ServicioABMCMCBP.confirmarCBP(dto);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.history.back();
    }

</script>

<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Administrar Parámetro</h2>
    <h4 class="text-center text-dark text-bold text-big">Cantidad maxima de cuentas en cada banco del que un usuario no premium es dueno</h4>

    <h4 class="text-center text-dark text-bold text-big">Alta</h4>

    <div class="main d-flex justify-content-between">
        <div style="display: flex; align-items:center; flex-direction:column">
            <div class="w-100">
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Fecha de Inicio</span>
                    <DatePicker bind:value={dto.fechaInicio}/>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Fecha de Fin</span>
                    <DatePicker bind:value={dto.fechaFin}/>
                </div>
                <div class="d-flex justify-content-between w-100 mb-3">
                    <span class="text-medium text-darker">Cantidad</span>
                    <input type="text" bind:value={dto.cantidad}>
                </div>
            </div>
        </div>
    </div>

    <div class="d-flex justify-content-end w-100 mb-3" style="gap: 20px;">
        <button class="bg-darker text-lighter text-medium" on:click={()=>{window.history.back()}}>Cancelar</button>
        <button class="bg-light text-darker text-medium" on:click={confirmar}>Aceptar</button>
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