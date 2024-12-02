<script lang="ts">
import { Tooltip, Button } from "$lib/index.js";

const placements = [
    "top-start", "top", "top-end", 
    "bottom-start", "bottom", "bottom-end", 
    "left-start", "left", "left-end", 
    "right-start", "right", "right-end"
];

</script>

<h2 class="text-lg font-bold leading-10">
    Tooltip
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        Default
    </h4>
    
    <div class="h-20 flex flex-row gap-2">
        {#each placements as v, i}
            <Tooltip placement={v as any}>
                {#snippet target(ref)}
                    <span use:ref>
                        <Button ref={ref}> {v.toUpperCase()} </Button>
                    </span>
                {/snippet}
    
                This is a tooltip!
            </Tooltip>
        {/each}
    </div>

    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        Theme
    </h4>
    
    <div class="h-20 flex flex-row gap-2">
        <Tooltip theme="dark">
            {#snippet target(ref)}
                <span use:ref>
                    <Button ref={ref}> Dark </Button>
                </span>
            {/snippet}

            This is a tooltip!
        </Tooltip>

        <Tooltip theme="light">
            {#snippet target(ref)}
                <span use:ref>
                    <Button ref={ref}> Light </Button>
                </span>
            {/snippet}

            This is a tooltip!
        </Tooltip>
    </div>
</div>
