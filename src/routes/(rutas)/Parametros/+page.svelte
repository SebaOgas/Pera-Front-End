<script lang="ts">
	import { onMount } from "svelte";

    let permisos : string[] = [];

    onMount(() => {
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

</script>


<div class="container w-75 h-100 text-medium">
    <h1 class="text-center text-dark text-bold">Parámetros</h1>
    <div>
        <a href="/ABMCMBNP">Cantidad máxima de bancos para usuarios no premium</a>
    </div>
    <div>
        <a href="/ABMCMCBP">Cantidad máxima de cuentas en cada banco del que un usuario no premium es dueño</a>
    </div>
    <div>
        <a href="/ABMCMCOB">Cantidad máxima de cuentas en total que puede tener un usuario no premium</a>
    </div>
    <div>
        <a href="/ABMConfiguracionRol">Permisos correspondientes a los roles</a>
    </div>
    <div>
        <a href="/ABMCPP">Planes Premium</a>
    </div>
    <div>
        <a href="/ABMMDP">Medios de Pago</a>
    </div>
    <div>
        <a href="/ABMPermiso">Permisos</a>
    </div>
    <div>
        <a href="/ABMRol">Roles</a>
    </div>
    <div>
        <a href="/ABMPSM">Símbolos de Monedas</a>
    </div>

</div>