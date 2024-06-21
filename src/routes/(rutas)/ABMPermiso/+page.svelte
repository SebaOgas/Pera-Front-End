<script lang="ts">
	import { onMount } from 'svelte';
	import type DTOABMPermiso from './DTOABMPermiso';
	import { ServicioABMPermiso } from './ServicioABMPermiso';
	import { formatDate } from '$lib/DatePicker.svelte';
    
    let error = "";
    let permisos : string[] = [];

    let dto : DTOABMPermiso[] = [{
		nroPermiso: 0,
        nombrePermiso: "",
        fechaBajaPermiso: new Date
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

        getPermisos();

    });

    async function getPermisos() {
    
        let response = await ServicioABMPermiso.getPermisos();
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;

    }
    
</script>



<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Administrar Parametro</h2>
    <h4 class="text-center text-dark text-bold text-big">Permisos</h4>

    <table class="w-100">
        <thead style="border-bottom: 1px solid #000000;">
            <tr>
                <th>N.°</th>
                <th>Nombre</th>
                <th>Fecha de Baja</th>
            </tr>
        </thead>
        <tbody>
            {#each dto as d}
                <tr style="border-bottom: 1px solid #000000;">
                    <td>{d.nroPermiso}</td>
                    <td>{d.nombrePermiso}</td>
                    <td>{formatDate(d.fechaBajaPermiso)}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    
</style>