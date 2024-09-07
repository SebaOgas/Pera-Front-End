<script lang="ts" context="module">
    export interface item {
        label: string,
        values: number[]
    };
</script>

<script lang="ts">
    export let width = "50vh";
    export let height = "40vh";

    export let content : item[] = [];

    $: max = Math.max(...content.map(o => o.values.reduce((partialSum, a) => partialSum + a, 0)));

    export let xLabel = "";
    export let yLabel = "";

    export let barColors : string[] = ["#9DF069"];
    export let barBorderColors : string[] = ["#76951F"];
    export let valueColors : string[] = ["#76951F"];
</script>






<div class="histogram d-flex flex-row justify-content-start align-items-end m-4" style="height: {height}; width: {width};">
    {#each content as c}
        <div class="bar d-flex flex-column justify-content-end">
            {#each c.values as v, ix}
                <div class="subbar" style="height: {(v !== null ? v : 0 )/max*100}%; background-color: {barColors[ix]}; border-right-color: {barBorderColors[ix]};">
                    <div class="value" style="color: {valueColors[ix]};">
                        {v !== 0 && v !== null ? v : ""}
                    </div>
                </div>
            {/each}
            <div class="label text-dark">
                {c.label}
            </div>
        </div>
    {/each}
    <div class="x-label text-dark">{@html xLabel}</div>
    <div class="y-label text-dark">{@html yLabel}</div>
</div>



<style>
    .histogram {
        border-bottom: 4px solid #142D2D;
        border-left: 4px solid #142D2D;
        position: relative;
    }

    .histogram>.x-label {
        position: absolute;
        top: calc(100% + 2px);
        left: calc(100% + 4px);
        transform: translateY(-50%);
    }

    .histogram>.y-label {
        position: absolute;
        left: 0;
        bottom: calc(100% + 4px);
        transform: translateX(-50%);
    }

    .histogram>.bar {
        flex: 1 1 auto;
        position: relative;
        height: 100%;
    }

    .histogram .subbar {
        border-right: 2px solid #76951F;
        position: relative;
    }

    .histogram .value {
        position: absolute;
        bottom: 100%;
        width: 100%;
        text-align: center;
    }

    .histogram .label {
        position: absolute;
        top: calc(100% + 4px);
        width: 100%;
        text-align: center;
    }
</style>