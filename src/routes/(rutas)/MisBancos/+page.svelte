<script lang="ts">
	import { onMount } from "svelte";
	import CheckBox from "../../../lib/CheckBox.svelte";
	import type DTOMisBancos from "./DTOMisBancos";
	import { ServicioMisBancos } from "./ServicioMisBancos";
    

    let dto : DTOMisBancos = {
        numero : 0,
        nombre : "",
        ocupacion : "",
        estado : "",
    }

    let permisos : string[] = [];
    let bancos : DTOMisBancos[] = [];

    onMount(async () => {
        /*let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_PARAMETROS")) {
            window.location.href = "/";
        }*/

        //Obtener bancos al cargar la pagina
        let response = await ServicioMisBancos.obtenerBancos();

        if (typeof response === "string") {
            return;
        }

        bancos = response;

    });

    

</script>

<div class="container w-50 h-100">
    <h2 class="text-center text-dark text-bold">Bancos</h2>
    <table>
        <thead>
            <tr>
                <td>N.º</td>
                <td>Nombre</td>
                <td>Ocupación</td>
                <td>Estado</td>
            </tr>
        </thead>
        <tbody>
            {#each bancos as b}
            <tr>
                <td>{dto.numero}</td>
                <td>{dto.nombre}</td>
                <td>{dto.ocupacion}</td>
                <td>{dto.estado}</td>
            </tr>
            <tr>
                <td>A2</td>
                <td>B2</td>
                <td>C2</td>
                <td>D2</td>
            </tr>
            <tr>
                <td>A3</td>
                <td>B3</td>
                <td>C3</td>
                <td>D3</td>
            </tr>
            <tr>
                <td>A4</td>
                <td>B4</td>
                <td>C4</td>
                <td>D4</td>
            </tr>
            {/each}
        </tbody>
    </table>
        <div style="display: flex;">
            <div class="d-flex justify-content-center w-100">
                <button class="bg-light text-darker text-medium" on:click={() => {window.location.href = "/CrearBanco";}}>Crear Banco</button>
            </div>
        </div>
</div>