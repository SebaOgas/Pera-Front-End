<script lang="ts">
	import { onMount } from "svelte";
	import type DTOMisBancos from "./DTOMisBancos";
	import { ServicioMisBancos } from "./ServicioMisBancos";
    

    let dto : DTOMisBancos = {
        id : 0,
        nombre : "",
        ocupacion : "",
        estado : "",
    }

    let permisos : string[] = [];
    let bancos : DTOMisBancos[] = [];

    onMount(async () => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_BANCOS_PROPIOS")) {
            window.location.href = "/";
        }

        //Obtener bancos al cargar la pagina
        let response = await ServicioMisBancos.obtenerBancos();

        if (typeof response === "string") {
            return;
        }

        bancos = response;

    });

    

</script>

<div class="container w-75 h-100">
    <h2 class="text-center text-dark text-bold">Bancos</h2>
    <table class="w-100">
        <thead>
            <tr>
                <td>N.º</td>
                <td>Nombre</td>
                <td>Ocupación</td>
                <td>Estado</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            {#each bancos as b}
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <tr>
                <td>{b.id}</td>
                <td>{b.nombre}</td>
                <td>{b.ocupacion}</td>
                <td>{b.estado}</td>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <td><img src="/right_arrow.svg" alt=">" class="clickable" on:click={() => {window.location.href = `MisBancos/${b.id}`;}}></td>
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