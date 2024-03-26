<script>
	import Footer from "$lib/Footer.svelte";

</script>

<div class="body d-flex flex-column overflow-auto">
    <div class="flex-grow-1 main">
        
        <div class="d-flex flex-column flex-md-row w-100 bg-darker justify-content-between text-light">
            <div class="d-flex flex-column justify-content-center align-items-center align-items-md-start logo-container">
                <div class="d-flex flex-row align-items-center">
                    <img src="./logo.svg" alt="Logo" class="logo">
                    <div class="text-gigantic text-bold nombre-servicio">Pera</div>
                </div>
                <div class="text-bigger text-bold text-center text-md-start">
                    Otra forma de organizar tu dinero
                </div>
            </div>
            <div class="d-flex flex-row justify-content-center align-items-center comenzar-button">
                <button class="bg-light text-darker text-bigger" on:click={() => {window.location.href = "/MisCuentasBancarias"}}>Comenzar</button>
            </div>
        </div>
        <div class="bg-darker">
            <img src="./home/wave_1.svg" alt="transicion" class="w-100">
        </div>
        <div class="w-100 d-flex flex-column justify-content-center align-items-center text-bold">
            <h4 class="text-bigger">¿Qué es Pera?</h4>
            <div class="descrip text-big p-1 p-md-0 text-center">
                Pera es un sistema que permite a cualquier persona crear su propio banco virtual. Desde allí, pueden crear su propia moneda ficticia y dársela a otros usuarios, siendo ellos capaces de realizar transferencias entre sí.
            </div>
        </div>
        <div class="bg-lighter">
            <img src="./home/wave_2.svg" alt="transicion" class="w-100">
        </div>
        <div class="w-100 d-flex flex-column justify-content-center align-items-center bg-light text-bold">
            <h4 class="text-bigger">¿Por qué Pera?</h4>
            <div class="descrip text-big p-1 p-md-0 text-center">
                Puede ser útil en diversas situaciones, como:  
                <ul>
                    <li>Pozo común de dinero para compras colectivas</li>
                    <li>Apuestas en juegos de azar</li>
                    <li>Sistema de puntos en un grupo de personas</li>
                </ul>
            </div>
        </div>
        <div class="bg-lighter">
            <img src="./home/wave_3.svg" alt="transicion" class="w-100 bg-light">
        </div>
        <div class="w-100 d-flex flex-column justify-content-center align-items-center bg-dark text-lighter">
            <h4 class="text-bigger">Planes</h4>
            <div class="descrip text-big p-1 p-md-0 text-center">
                Actualmente, ofrecemos un plan gratuito con ciertas limitaciones, como:
                <ul>
                    <li>Cantidad de Bancos de los que se es dueño</li>
                    <li>Cantidad de Cuentas Bancarias de las que se es titular</li>
                </ul>
                Sin embargo, puede quitar estas limitaciones con nuestro plan Premium, por solo $XXX por mes.
                <div class="d-flex flex-row justify-content-center">
                    <button class="text-big" on:click={() => {window.location.href = "/SuscribirseAPremium"}}>Obtener Premium</button>
                </div>
            </div>
        </div>
        <div class="bg-lighter">
            <img src="./home/wave_4.svg" alt="transicion" class="w-100 bg-lighter">
        </div>
        <div class="w-100 d-flex flex-column justify-content-center align-items-center">
            <h4 class="text-bigger">Ayuda</h4>
            <div class="descrip text-big p-1 p-md-0 text-center text-bold">
                <p>
                    Puede acceder a una guía exhaustiva respecto al uso de Pera en el siguiente <a href="/">enlace</a>.
                </p>
                <p>
                    Ante cualquier duda o preocupación, también puede escribirnos a <a href="mailto:mail@gmail.com">mail@gmail.com</a> y le contestaremos tan pronto como nos sea posible.
                </p>
            </div>
        </div>



    </div>
    
    <Footer/>
</div>


<style>

    .body {
        height: 100vh;
        width: 100vw;
    }

    .main>*:nth-child(1) {
        aspect-ratio: 1440/558;
        padding: 52px;
    }

    .main>*:nth-child(2n+1) {
        min-height: 512px;
    }

    .logo {
        width: 64px;
        height: 64px;
    }

    .nombre-servicio {
        line-height: 64px;
    }

    .comenzar-button, .logo-container {
        flex: 1 1 auto;
    }

    @media (min-width: 768px) {
        .logo {
            width: 128px;
            height: 128px;
        }

        .nombre-servicio {
            line-height: 128px;
        }

        .descrip {
            width: 512px;
            text-align: justify !important;
        }
    }

    

    
</style>