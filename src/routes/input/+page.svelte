<script lang="ts">
import { Calendar, Search } from "$lib/icons/index.js";
import { Input, } from "$lib/index.js";

const sizes = ["sm", "md", "lg"];
</script>

<svelte:head>
    <title>Input</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Input
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<div class="w-full">
    <Input
        placeholder="search keywords"
        onchange={v => {
            console.log("change:", v);
        }}
        oninput={v => {
            console.log("input:", v);
        }}
    />
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Disabled
</h4>

<div class="w-full">
    <Input value="2024" disabled/>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Icon
</h4>

<div class="w-full flex flex-col gap-5">
    <Input>
        {#snippet head()}
            <Calendar/>
        {/snippet}
    </Input>

    <Input>
        {#snippet tail()}
            <Search/>
        {/snippet}
    </Input>

    <Input>
        {#snippet head()}
            <Calendar/>
        {/snippet}
        {#snippet tail()}
            <Search/>
        {/snippet}
    </Input>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Size
</h4>

<div class="w-full flex flex-col gap-5">
    {#each sizes as size}
        <Input size={size as any}>
            {#snippet head()}
                <Calendar/>
            {/snippet}
        </Input>
    {/each}
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Password
</h4>

<div class="w-full">
    <Input type="password" value="2024"/>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Number
</h4>

<div class="w-full">
    <Input type="number" step={10} value="2024" disabled/>
</div>
