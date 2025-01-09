<script lang="ts">
import { Tooltip, Button } from "$lib/index.js";

const placements = [
    ["topStart", "top", "topEnd"],
    ["bottomStart", "bottom", "bottomEnd"],
    ["leftStart", "left", "leftEnd"],
    ["rightStart", "right", "rightEnd"],
];

const triggers = ["hover", "focus", "click"];
</script>

<svelte:head>
	<title>Tooltip</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Tooltip
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Default
    </h4>
    
    <div class="flex flex-row gap-2">
        <Tooltip>
            {#snippet target(ref)}
                <Button ref={ref}> Tooltip </Button>
            {/snippet}

            This is a tooltip!
        </Tooltip>
    </div>

    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Theme
    </h4>
    
    <div class="flex flex-row gap-2">
        <Tooltip theme="dark">
            {#snippet target(ref)}
                <Button ref={ref}> Dark </Button>
            {/snippet}

            This is a tooltip!
        </Tooltip>

        <Tooltip theme="light">
            {#snippet target(ref)}
                <Button ref={ref}> Light </Button>
            {/snippet}

            This is a tooltip!
        </Tooltip>
    </div>

    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Placement
    </h4>
    
    {#each placements as rows}
        <div class="flex flex-row flex-wrap gap-2">
            {#each rows as row}
                <Tooltip placement={row as any}>
                    {#snippet target(ref)}
                        <Button ref={ref}> {row.toUpperCase()} </Button>
                    {/snippet}
        
                    This is a tooltip!
                </Tooltip>
            {/each}
        </div>
    {/each}

    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Trigger
    </h4>
    
    <div class="flex flex-row gap-2">
        {#each triggers as trigger}
            <Tooltip trigger={trigger as any}>
                {#snippet target(ref)}
                    <Button ref={ref}> 
                        <span>
                            {trigger}
                        </span>    
                    </Button>
                {/snippet}

                This is a tooltip!
            </Tooltip>
        {/each}

        <Tooltip trigger="click" theme="light" placement="bottom">
            {#snippet target(ref)}
                <Button ref={ref}> 
                    <span>
                        Click
                    </span>    
                </Button>
            {/snippet}

            This is a tooltip!
        </Tooltip>
    </div>
</div>
