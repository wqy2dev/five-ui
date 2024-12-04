<script lang="ts">
    import { Modal } from "$lib/index.js";
</script>
    
<svelte:head>
    <title>Modal</title>
</svelte:head>
    
<h2 class="text-lg font-bold leading-10">
    Modal
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        Default
    </h4>

    <Modal
        title="Title"
    >
        Failure is the mother of success.
    </Modal>
</div>
