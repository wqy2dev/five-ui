<script lang="ts">
import { Modal, Button } from "$lib/index.js";

let show = $state(false);

</script>
    
<svelte:head>
    <title>Modal</title>
</svelte:head>
    
<h2 class="text-lg font-bold leading-10">
    Modal
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-50">
        Default
    </h4>

    <Button onclick={() => show = true}> Show Modal </Button>

    {#if show}
    <Modal
        title="Title"
    >
        Failure is the mother of success.
    </Modal>
    {/if}
</div>
