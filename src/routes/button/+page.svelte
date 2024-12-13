<script lang="ts">
    import { Download } from "$lib/icons/index.js";
    import TrashOutline from "$lib/icons/TrashOutline.svelte";
import { Button } from "$lib/index.js";
</script>

<svelte:head>
	<title>Button</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Button
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100">
        Default
    </h4>
    
    <Button> Primary Button </Button>
    <Button variant="danger"> Danger Button </Button>
    <Button variant="secondary"> Secondary Button </Button>
    <Button variant="reverse"> Reverse Button </Button>
    <Button variant="outline"> Outline Button </Button>
    <Button variant="ghost"> Ghost Button </Button>

    <h4 class="text-base indent-2 bg-slate-100">
        Size
    </h4>
    
    <Button size="xs"> Xs </Button>
    <Button size="sm"> Small </Button>
    <Button> Default </Button>
    <Button size="lg"> Large </Button>

    <h4 class="text-base indent-2 bg-slate-100">
        Rounded
    </h4>
    
    <Button size="xs" radius="full"> Xs </Button>
    <Button size="sm" radius="full"> Small </Button>
    <Button radius="full"> Default </Button>
    <Button size="lg" radius="full"> Large </Button>

    <h4 class="text-base indent-2 bg-slate-100">
        Disable
    </h4>
    
    <Button size="xs" disabled> xs </Button>
    <Button size="sm" variant="danger" disabled> Danger </Button>
    <Button variant="secondary" disabled> Secondary </Button>
    <Button variant="reverse" size="lg" disabled> Reverse </Button>
    <Button variant="outline" size="lg" disabled> Outline </Button>
    <Button variant="ghost" size="lg" disabled> Ghost </Button>

    <h4 class="text-base indent-2 bg-slate-100">
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
