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

<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tortor nunc, porttitor eget massa et, pulvinar varius turpis. Aliquam posuere, metus at aliquet iaculis, tellus libero tincidunt arcu, in elementum nisi ligula non neque. Phasellus rutrum ullamcorper venenatis. Fusce mollis viverra nulla at vestibulum. Sed nunc turpis, congue at magna vitae, consectetur volutpat tortor. Aliquam metus felis, viverra vel felis ut, ullamcorper blandit purus. Mauris dictum tempus egestas. Donec id velit odio. Proin semper diam sit amet diam finibus rhoncus. Vestibulum interdum urna sed mauris sollicitudin laoreet. Proin dictum nisi est, vitae mattis metus interdum quis. Praesent metus lacus, lobortis vitae tempus molestie, luctus nec magna. Mauris quis est posuere, efficitur enim eget, consectetur orci. Phasellus dignissim turpis a lorem tempus consequat. Nam rutrum purus id odio ultricies, at aliquet massa consequat.
</p>

<p>
    Nam dictum faucibus quam, eget interdum nulla molestie eu. Donec ultricies quis enim sollicitudin condimentum. Vestibulum venenatis velit id felis sagittis eleifend. Mauris in orci massa. Pellentesque ac erat felis. Donec sed eros quis sem finibus suscipit vitae in ex. Duis id enim metus. Fusce suscipit felis lobortis urna consectetur, eu sollicitudin ante facilisis. Proin laoreet lectus ac tellus sagittis, ut iaculis nulla interdum. Curabitur fringilla purus massa, et lobortis metus tempor ac. Sed sodales, enim eget lobortis hendrerit, orci risus ullamcorper sem, non faucibus turpis tortor in arcu.
</p>

<p>
    In quis augue vulputate, convallis eros ut, sollicitudin nibh. Nunc in malesuada nisi, sed euismod nisl. Nam facilisis mi id finibus pretium. Sed lobortis cursus tortor, et congue ante tempor eget. Nam vitae dui sit amet est tincidunt maximus a eget tellus. Mauris auctor posuere ex, vitae mollis risus sagittis sed. Integer posuere a lectus non lacinia. Nunc eu pretium risus. Vivamus aliquet magna sit amet risus cursus, vel consequat odio aliquam. Integer viverra enim odio. Maecenas euismod odio non nibh fringilla rhoncus.
</p>

<table class="text-darker under" style="width: 50%">
    <thead>
        <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
        </tr>
        <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
        </tr>
        <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
        </tr>
        <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
        </tr>
    </tbody>
</table>


<style>

</style>