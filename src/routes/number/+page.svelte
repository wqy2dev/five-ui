<script lang="ts">
import { Calendar, Search } from "$lib/icons/index.ts";
import { Number, } from "$lib/index.ts";

const sizes = ["sm", "md", "lg"];
const radius = ["full", "sm", "md", "lg", "xl", "none"];

</script>

<svelte:head>
    <title>Number</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Number
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<div class="w-full">
    <Number
        placeholder="search keywords"
        onchange={v => {
            console.log("change:", v);
        }}
    />
</div>


<h4 class="my-5 text-base indent-2 bg-slate-100">
    Min
</h4>

<div class="w-full">
    <Number
        placeholder="min number:10"
        min={10}
        onchange={v => {
            console.log("change:", v);
        }}
    />
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Max
</h4>

<div class="w-full">
    <Number
        placeholder="max number:20"
        max={20}
        onchange={v => {
            console.log("change:", v);
        }}
    />
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Step
</h4>

<div class="w-full">
    <Number
        placeholder="number step"
        step={0.1}
        onchange={v => {
            console.log("change:", v);
        }}
    />
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Disabled
</h4>

<div class="w-full">
    <Number value="2024" disabled/>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Icon
</h4>

<div class="w-full flex flex-col gap-5">
    <Number>
        {#snippet head()}
            <Calendar/>
        {/snippet}
    </Number>

    <Number>
        {#snippet tail()}
            <Search/>
        {/snippet}
    </Number>

    <Number>
        {#snippet head()}
            <Calendar/>
        {/snippet}
        {#snippet tail()}
            <Search/>
        {/snippet}
    </Number>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Size
</h4>

<div class="w-full flex flex-col gap-5">
    {#each sizes as size}
        <Number size={size as any}>
            {#snippet head()}
                <Calendar/>
            {/snippet}
        </Number>
    {/each}
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Radius
</h4>

<div class="w-full flex flex-col gap-5">
    {#each radius as rds}
        <Number radius={rds as any}>
            {#snippet head()}
                <Calendar/>
            {/snippet}
        </Number>
    {/each}
</div>
