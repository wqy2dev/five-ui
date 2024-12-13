<script lang="ts">
import { Card } from "$lib/index.js";
</script>

<svelte:head>
	<title>Card</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Card
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100">
        Default
    </h4>

    <div class="px-10 w-80">
        <Card>
            {#snippet header()}
                Header
            {/snippet}
    
            Body
    
            {#snippet footer()}
                Footer
            {/snippet}
        </Card>
    </div>

    
</div>