<script lang="ts">
import { Radio, RadioGroup } from "$lib/index.js";

const sizes = ["sm", "md", "lg"];
</script>

<svelte:head>
    <title>Radio</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Radio
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<div class="w-full">
    <div class="flex flex-row gap-5">
        <RadioGroup>
            {#each [
                {label:"A", value:"A"},
                {label:"B", value:"B"},
                {label:"C", value:"C"}
            ] as item}
                <Radio value={item.value}/>
            {/each}
        </RadioGroup>
    </div>
</div>
