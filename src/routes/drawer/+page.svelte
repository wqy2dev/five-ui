<script lang="ts">
import { Drawer, Button } from "$lib/index.js";

let show = $state(false);
let showWhenOverlayClicked = $state(false);
let showWithPlacement = $state({
    show: false,
    size: "",
    placement: "",
});

</script>

<svelte:head>
	<title>Drawer</title>
</svelte:head>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-50">
        Default
    </h4>

    <Button onclick={() => show = true}> 
        Open Drawer
    </Button>

    {#if show}
    <Drawer
        class="test-class"
    >
        <Button 
            variant="danger"
            onclick={() => show = false}
        > 
            Close Drawer
        </Button>
    </Drawer>
    {/if}

    <h4 class="text-base indent-2 bg-slate-50">
        Close when overlay clicked
    </h4>

    <Button 
        onclick={() => showWhenOverlayClicked = true}
    > 
        Close when overlay clicked
    </Button>

    {#if showWhenOverlayClicked}
    <Drawer
        onclose={() => showWhenOverlayClicked = false}
        overlayClosable
    >
        Displays a dialog with a custom content that requires attention or provides additional information.
    </Drawer>
    {/if}

    <h4 class="text-base indent-2 bg-slate-50">
        Placement & Size
    </h4>

    <!-- 
        xs 20rem  max-h-80
        sm 24rem  max-h-96
        md 28rem 
        lg 32rem
        xl 36rem
    -->
    <div class="flex flex-row flex-wrap gap-2">
        {#each ["top", "bottom", "left", "right"] as placement}
            {#each ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as size}
                <Button onclick={() => showWithPlacement = { show: true, size, placement }}> 
                    {placement} & {size}
                </Button>
            {/each}
        {/each}
    </div>

    {#if showWithPlacement.show}
        <Drawer
            size={showWithPlacement.size as any}
            placement={showWithPlacement.placement as any}
        >
            <Button 
                variant="danger"
                onclick={() => showWithPlacement = { show: false, size:"", placement:"" } }
            > 
                Close Drawer
            </Button>
        </Drawer>
    {/if}
</div>