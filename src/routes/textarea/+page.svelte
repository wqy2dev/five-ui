<script lang="ts">
import { Textarea, } from "$lib/index.js";

const radius = ["sm", "md", "lg", "xl", "none"];

</script>

<svelte:head>
    <title>Textarea</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Textarea
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<div class="w-full">
    <Textarea
        placeholder="search keywords"
        onchange={v => {
            console.log("change:", v);
        }}
    />
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    ShowCount
</h4>

<div class="w-full">
    <Textarea
        placeholder="search keywords"
        maxlength={10}
        showCount={true}
        onchange={v => {
            console.log("change:", v);
        }}
    />
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Disabled
</h4>

<div class="w-full">
    <Textarea value="FiveUI" disabled/>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Radius
</h4>

<div class="w-full space-y-5">
    {#each radius as rds}
        <Textarea value="FiveUI" radius={rds as any}/>
    {/each}
</div>