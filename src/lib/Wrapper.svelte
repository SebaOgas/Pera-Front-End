<script>
	import Footer from "./Footer.svelte";
import TitleBar from "./TitleBar.svelte";

</script>

<TitleBar/>

<div class="body d-flex flex-column overflow-auto">
    <div class="wrapper flex-grow-1">
        <slot />
    </div>
    
    <Footer/>
</div>


<style>
    .wrapper {
        padding: 20px;
    }

    .body {
        position: fixed;
        top: 8vh;
        height: 92vh;
        width: 100vw;
    }
</style>