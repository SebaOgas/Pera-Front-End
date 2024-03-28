<script lang="ts">
	import { onMount } from "svelte";
	import Card from "./card.svelte";
	import { ServicioSuscribirseAPremium } from "./ServicioSuscribirseAPremium";
	import type DTOPlanPremium from "./DTOPlanPremium";

    let planes : DTOPlanPremium[] = [];
    let permisos : string[] = [];
    let error :string = "";
        
    onMount(async () => {
        let permisosString = localStorage.getItem("permisos");
        if (permisosString === null) {
            window.location.href = "/LoguearUsuario";
            return;
        }
        permisos = JSON.parse(permisosString);
        if(!permisos.includes("SUSCRIPCION_PREMIUM")) {
            window.location.href = "/Usuario";
        }


        //Obtener planes
        let response = await ServicioSuscribirseAPremium.obtenerPlanes();

        if (typeof response === "string") {
            error = response;
            if (error === "") window.location.href = "/LoguearUsuario";
            return;
        }

        planes = response;

    });

    function elegirPlan(idPlan : number) {
        window.location.href = `SuscribirseAPremium/${idPlan}`;
    }

</script>

<div class="container w-75 h-100">
    <h1 class="text-center text-dark text-bold">Planes Premium</h1>

    <div class="d-flex flex-row justify-content-around align-items-center w-100 card-list">
        {#each planes as plan}
            <Card title={plan.nombre} value={plan.precio} click={() => {elegirPlan(plan.id)}}>{plan.descrip}</Card>
        {/each}
    </div>
    
    <div class="text-center text-darker">
        {error}
    </div>
    
    <div class="text-center text-darker">
        <h4 class="text-center text-dark text-bold">Beneficios:</h4>
        <p>Ser dueño de cuantos bancos desee</p>
        <p>Ser titular de todas las cuentas bancarias que quiera</p>
        <p>Sus bancos podrán tener tantas cuentas vigentes como se quiera</p>
        <p>Posibilidad de elegir el símbolo de la moneda de sus bancos</p>
    </div>
</div>

<style>
    .card-list {
        flex-wrap: wrap;
    }
</style>