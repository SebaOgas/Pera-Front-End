<script lang="ts">
    import { onMount } from 'svelte';
    import CheckBox from '$lib/CheckBox.svelte'
    import RadioButton from '$lib/RadioButton.svelte';
	import ComboBox from '$lib/ComboBox.svelte';

    onMount(() => {
        console.log("Hola mundo");
        getRadio();
    })

    let boton = "Botón";

    let radio = "0";
    function getRadio() {
        let el = document.querySelector('input[name="grupo2"]:checked');
        if(el) {
            radio = (<HTMLInputElement>el).value;
        }
    }


    let cbValue: string = "";

    function setCBValue(v: string) {
        cbValue = v;
    }


</script>


<div class="container-fluid bg-darker text-light text-bigger text-bold">
    Welcome to SvelteKit
</div>


<div class="container-fluid bg-light text-darker text-medium">
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</div>

<img src="logo.svg" alt="Logo de Pera">

<a href="/hola">Link</a>



<br>

<input type="email" value="Prueba">

<CheckBox label="Checkbox" name="grupo1"/>
<CheckBox label="Checkbox" name="grupo1" checked/>
<CheckBox label="Checkbox" name="grupo1"/>
<RadioButton label="RadioButton" name="grupo2" value="1"/>
<RadioButton label="RadioButton" name="grupo2" checked value="2"/>

<button on:click={getRadio} class="bg-light text-darker">Calcular</button>

{radio}

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<ComboBox placeholder="Placeholder" value="{cbValue}" width={20}>
    <span on:click={() => setCBValue("AAA")}>AAA</span>
    <span on:click={() => setCBValue("BBB")}>BBB</span>
    <span on:click={() => setCBValue("CCC")}>CCC</span>
</ComboBox>


<style>

</style>