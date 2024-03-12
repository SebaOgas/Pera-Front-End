<script>
	import Card from "./card.svelte";

</script>

<div class="container w-75 h-100">
    <h1 class="text-center text-dark text-bold">Planes Premium</h1>

    <div class="d-flex flex-row justify-content-around align-items-center w-100 card-list">
        <Card title="Título" value={2999.99}>Disfrute de las ventajas de Premium por 30 días</Card>
        <Card title="Título" value={7999.50}>Aproveche los beneficios por un precio inferior durante tres meses</Card>
        <Card title="Título" value={29999} click={() => {console.log("A")}}>Olvídese de renovar la suscripción por un año</Card>
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