<script lang="ts">
import { Tooltip, Button } from "$lib/index.js";

const placements = [
    "topStart", "top", "topEnd", 
    "bottomStart", "bottom", "bottomEnd", 
    "leftStart", "left", "leftEnd", 
    "rightStart", "right", "rightEnd"
];

</script>

<h2 class="text-lg font-bold leading-10">
    Tooltip
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-50">
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

    <h4 class="text-base indent-2 bg-slate-50">
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

    <h4 class="text-base indent-2 bg-slate-50">
        Placement
    </h4>
    
    <div class="flex flex-row flex-wrap gap-2">
        {#each placements as v, i}
            <Tooltip placement={v as any}>
                {#snippet target(ref)}
                    <Button ref={ref}> {v.toUpperCase()} </Button>
                {/snippet}
    
                This is a tooltip!
            </Tooltip>
        {/each}
    </div>

    <h4 class="text-base indent-2 bg-slate-50">
        Trigger
    </h4>
    
    <div class="flex flex-row gap-2">
        <Tooltip trigger="hover">
            {#snippet target(ref)}
                <Button ref={ref}> Hover </Button>
            {/snippet}

            This is a tooltip!
        </Tooltip>

        <Tooltip trigger="focus">
            {#snippet target(ref)}
                <Button ref={ref}> Focus </Button>
            {/snippet}

            This is a tooltip!
        </Tooltip>
    </div>
</div>
