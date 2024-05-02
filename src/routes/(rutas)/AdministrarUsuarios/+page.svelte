<script lang="ts">
	import { onMount } from 'svelte';
	import type DTOAdministrarUsuarios from './DTOAdministrarUsuarios.js';
	import { ServicioAdministrarUsuarios } from './ServicioAdministrarUsuarios.js';
    
    let error = "";
    let permisos : string[] = [];

    let dto : DTOAdministrarUsuarios[] = [{
        idUsuario: 0,
        nombre: "",
        correo: "",
        rol: "",
        estado: ""
	}]

    onMount(async () => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);

        if(!permisos.includes("ADMIN_USUARIOS")) {
            window.location.href = "/";
        }

        getUsuarios();

    });

    async function getUsuarios() {
        let response = await ServicioAdministrarUsuarios.getUsuarios();
        if (typeof response === "string") {
            error = response;
            return;
        }

        dto = response;
    }

    async function ver(idUsuario: number) {

        window.location.href = `/AdministrarUsuarios/VerCuentasBancariasUsuario/${idUsuario}`;
    }
    
</script>

<div class="container w-100 h-100">
    <h2 class="text-center text-dark text-bold text-bigger">Lista de usuarios</h2>
    
    <table class="w-100">
        <thead>
            <tr>
                <th>N.°</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Info</th>
            </tr>
        </thead>
        <tbody>
            {#each dto as d}
                <tr>
                    <td>{d.idUsuario}</td>
                    <td>{d.nombre}</td>
                    <td>{d.correo}</td>
                    <td>{d.rol}</td>
                    <td>{d.estado}</td>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <td><img src="/eye.svg" alt="Ver" class="clickable" on:click={() => {ver(d.idUsuario)}}></td>
                </tr>
            {/each}
        </tbody>
    </table>

    <span class="d-block w-100 text-center text-dark text-medium">{error}</span>


</div>


<style>
    
</style>