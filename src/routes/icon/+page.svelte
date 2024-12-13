<script lang="ts">
import { Tooltip } from "$lib/index.js";
import { icons } from "$lib/icons/index.js";
import LoadIcon from "./LoadIcon.svelte";

</script>

<svelte:head>
	<title>Icon</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Icon
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<div class="flex flex-row flex-wrap gap-5">
    {#each icons as icon}
    <Tooltip
        placement="bottom"
    >
        {#snippet target(ref)}
        <div 
            class="w-10 h-10 flex items-center justify-center bg-slate-100 text-slate-600"
            use:ref
        >
            <LoadIcon icon={icon}/>
        </div>
        {/snippet}
        {icon}
    </Tooltip>
        
    {/each}
</div>