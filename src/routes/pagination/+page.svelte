<script lang="ts">
import { Pagination } from "$lib/index.js";

const variants = ["flat", "outline", "ghost"];
const radius = ["lg", "md", "sm", "full", "none"];
const sizes = ["sm", "md", "lg"];

</script>
<svelte:head>
    <title>Pagination</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Pagination
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<Pagination pages={50} onchange={(page) => console.log(page)} />

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Variant
</h4>

<div class="flex flex-col flex-wrap gap-5">
    {#each variants as variant}
        <Pagination pages={50} variant={variant as any} onchange={(page) => console.log(page)} />
    {/each}
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Radius
</h4>

<div class="flex flex-col flex-wrap gap-5">
    {#each radius as rds}
        <Pagination pages={50} radius={rds as any} onchange={(page) => console.log(page)} />
    {/each}
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Size
</h4>

<div class="flex flex-col flex-wrap gap-5">
    {#each sizes as size}
        <Pagination pages={50} size={size as any} onchange={(page) => console.log(page)} />
    {/each}
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Control
</h4>

<div class="flex flex-col flex-wrap gap-5">
    <Pagination pages={50} onchange={(page) => console.log(page)} />
    <Pagination pages={50} control={false} onchange={(page) => console.log(page)} />
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100 ">
    Siblings
</h4>

<div class="flex flex-col flex-wrap gap-5">
    <Pagination pages={50} siblings={3} onchange={(page) => console.log(page)} />
    <Pagination pages={50} siblings={4} onchange={(page) => console.log(page)} />
    <Pagination pages={50} siblings={5} onchange={(page) => console.log(page)} />
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Boundaries
</h4>

<div class="flex flex-col flex-wrap gap-5">
    <Pagination pages={50} boundaries={2} onchange={(page) => console.log(page)} />
    <Pagination pages={50} boundaries={3} onchange={(page) => console.log(page)} />
    <Pagination pages={50} boundaries={4} onchange={(page) => console.log(page)} />
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Disabled
</h4>

<Pagination pages={50} disabled onchange={(page) => console.log(page)} />
