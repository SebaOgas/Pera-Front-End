<script lang="ts">
	import { onMount } from 'svelte';
	import type DTOABMRol from './DTOABMRol.js';
	import { ServicioABMRol } from './ServicioABMRol.js';
	import { formatDate } from '$lib/DatePicker.svelte';
    
    let error = "";
    let permisos : string[] = [];

    let dto : DTOABMRol[] = [{
		nroRol: 0,
        nombreRol: "",
        fechaBajaRol: new Date,
        deBaja: false
	}];

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

        getRoles();

    });

    async function getRoles() {
    
        let response = await ServicioABMRol.getRoles();
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;

    }

    async function altaRol() {
        window.location.href = `/ABMRol/AltaRol`;
    }

    async function modificarRol(nroRol: number) {
        window.location.href = `/ABMRol/ModificarRol/${nroRol}`;
    }

    async function darBaja(nroRol: number){

        let response = await ServicioABMRol.darBaja(nroRol);
        if (typeof response === "string") {
            error = response;
            return;
        }

        window.location.reload();
    }
    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Administrar Parametro</h2>
    <h4 class="text-center text-dark text-bold text-big">Roles</h4>
    
    <div class="d-flex justify-content-end w-100 mb-3">
        <button class=" bg-light text-darker text-medium" on:click={altaRol}>Nuevo</button>
    </div>
    

    <table class="w-100">
        <thead style="border-bottom: 1px solid #000000;">
            <tr>
                <th>N.°</th>
                <th>Nombre</th>
                <th>Fecha de Baja</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {#each dto as d}
                <tr style="border-bottom: 1px solid #000000;">
                    <td>{d.nroRol}</td>
                    <td>{d.nombreRol}</td>
                    <td>{formatDate(d.fechaBajaRol)}</td>
                    {#if !(d.deBaja)}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <td><img src="/edit.svg" alt="Editar" class="clickable icon" on:click={()=>{modificarRol(d.nroRol)}}/>
                        <img src="/green_cross.svg" alt="Baja" class="clickable" on:click={() => {darBaja(d.nroRol)}}></td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    
</style>