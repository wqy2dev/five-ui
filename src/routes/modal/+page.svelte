<script lang="ts">
import { Modal, Button } from "$lib/index.js";

let show = $state(false);
let showModalWithSize = $state({
    show: false,
    size: "",
});
let showModalWithBackdrop = $state({
    show: false,
    backdrop: "",
});
let showWhenOverlayClicked = $state(false);

const sizes = [
    "xs",
	"sm",
	"md",
	"lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "full",
];

const backdrop = ["opaque", "blur", "transparent"];

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
        oncancel={() => show = false}
    >
        Displays a dialog with a custom content that requires attention or provides additional information.
    </Modal>
    {/if}

    <h4 class="text-base indent-2 bg-slate-50">
        Size
    </h4>

    <div class="flex flex-row gap-2">
        {#each sizes as size}
            <Button 
                onclick={() => showModalWithSize = {show: true, size}}
            > 
                size: {size}
            </Button>
        {/each}
    </div>

    {#if showModalWithSize.show}
    <Modal
        title={`Modal Size: ${showModalWithSize.size}`}
        size={showModalWithSize.size as any}
        oncancel={() => showModalWithSize = {show:false, size: ""}}
    >
        Displays a dialog with a custom content that requires attention or provides additional information.
    </Modal>
    {/if}

    <h4 class="text-base indent-2 bg-slate-50">
        Backdrop
    </h4>

    <div class="flex flex-row gap-2">
        {#each backdrop as bd}
            <Button 
                onclick={() => showModalWithBackdrop = {show: true, backdrop: bd}}
            > 
                backdrop: {bd}
            </Button>
        {/each}
    </div>

    {#if showModalWithBackdrop.show}
    <Modal
        title={`Modal Backdrop: ${showModalWithBackdrop.backdrop}`}
        backdrop={showModalWithBackdrop.backdrop as any}
        oncancel={() => showModalWithBackdrop = {show:false, backdrop: ""}}
    >
        Displays a dialog with a custom content that requires attention or provides additional information.
    </Modal>
    {/if}

    <h4 class="text-base indent-2 bg-slate-50">
        Close when overlay clicked
    </h4>

    <div class="flex flex-row gap-2">
        <Button 
            onclick={() => showWhenOverlayClicked = true}
        > 
            Close when overlay clicked
        </Button>
    </div>

    {#if showWhenOverlayClicked}
    <Modal
        title="Close when overlay clicked"
        overlayClosable={true}
        oncancel={() => showWhenOverlayClicked = false}
    >
        Displays a dialog with a custom content that requires attention or provides additional information.
    </Modal>
    {/if}
</div>
