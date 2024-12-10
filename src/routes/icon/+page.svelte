<script lang="ts">
import { Icon, icons, Tooltip } from "$lib/index.js";

let collapsible = $state(false);

</script>

<h2 class="text-lg font-bold leading-10">
    Icon
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-50">
    Base
</h4>

<div class="flex flex-row flex-wrap gap-5">
    {#each icons as icon}
    <Tooltip
        placement="bottom"
    >
        {#snippet target(ref)}
        <div 
            class="w-10 h-10 flex items-center justify-center bg-slate-100"
            use:ref
        >
            <Icon
                variant={icon}
                size={20}
            />
        </div>
        {/snippet}
        {icon}
    </Tooltip>
        
    {/each}
</div>