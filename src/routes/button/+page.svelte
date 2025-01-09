<script lang="ts">
import { Download, TrashOutline } from "$lib/icons/index.js";
import { Button } from "$lib/index.js";

const variants = ["primary", "danger", "secondary", "reverse", "outline", "ghost", "flat"];
const sizes = ["xs", "sm", "md", "lg"];
const radius = ["full", "sm", "md", "lg", "xl", "none"];

</script>

<svelte:head>
	<title>Button</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Button
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Default
    </h4>

    <div class="flex flex-wrap gap-2">
        {#each variants as variant}
            <Button variant={variant as any}> {variant} </Button>
        {/each}
    </div>

    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Size
    </h4>
    
    <div class="flex flex-wrap gap-2">
        {#each sizes as size}
            <Button size={size as any}> {size} </Button>
        {/each}
    </div>

    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Rounded
    </h4>
    
    {#each radius as radius}
        <div class="flex flex-wrap gap-2">
            {#each sizes as size}
                <Button radius={radius as any} size={size as any}> 
                    radius: {radius}
                </Button>
            {/each}
        </div>
    {/each}

    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Disable
    </h4>
    
    <div class="flex flex-wrap gap-2">
        {#each variants as variant}
            <Button variant={variant as any} disabled> {variant} </Button>
        {/each}
    </div>

    <h4 class="text-base indent-2 bg-slate-100 my-3">
        With Icon
    </h4>
    
    <Button> 
        <Download/>
        Download 
    </Button>

    <Button variant="danger">
        <TrashOutline/>
        Delete
    </Button>
</div>
