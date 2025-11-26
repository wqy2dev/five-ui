<script lang="ts">

import { Download, SquaresPlus, TrashOutline } from "$lib/icons/index.ts";
import { Button, Editor } from "$lib/index.ts";

const variants = ["primary", "danger", "secondary", "link", "outline", "ghost", "flat"];
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

    <Editor
        value={`
<div class="flex flex-wrap gap-2">
    {#each ["primary", "danger", "secondary", "link", "outline", "ghost", "flat"] as variant}
        <Button variant={variant as any}> {variant} </Button>
    {/each}
</div>
        `}
        readonly
    />

    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Size
    </h4>
    
    <div class="flex flex-wrap gap-2">
        {#each sizes as size}
            <Button size={size as any}> {size} </Button>
        {/each}
    </div>

    <Editor
        value={`
<div class="flex flex-wrap gap-2">
    {#each ["xs", "sm", "md", "lg"] as size}
        <Button size={size as any}> {size} </Button>
    {/each}
</div>
        `}
        readonly
    />

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

            <Editor
        value={`
import { Download, TrashOutline } from "$lib/icons/index.ts";

<Button> 
    <Download/>
    Download 
</Button>

<Button variant="danger">
    <TrashOutline/>
    Delete
</Button>
        `}
        readonly
    />

    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Link
    </h4>
    
    <Button type="link" href="/button" target="_blank"> 
        <Download/> Link 1
    </Button>

    <Button type="link" disabled={true}> 
        <SquaresPlus/> Link 2
    </Button>

        <Editor
        value={`
import { Download, SquaresPlus } from "$lib/icons/index.ts";

<Button type="link" href="/button" target="_blank"> 
    <Download/> Link 1
</Button>

<Button type="link" disabled={true}> 
    <SquaresPlus/> Link 2
</Button>
`}
        readonly
    />
</div>
