<script lang="ts">
import Icon from "$lib/icon/icon.svelte";
import { Button } from "$lib/index.js";
</script>

<svelte:head>
	<title>Button</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Button
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-50">
        Default
    </h4>
    
    <Button> Primary Button </Button>
    <Button variant="danger"> Danger Button </Button>
    <Button variant="secondary"> Secondary Button </Button>
    <Button variant="reverse"> Reverse Button </Button>
    <Button variant="outline"> Outline Button </Button>
    <Button variant="ghost"> Ghost Button </Button>

    <h4 class="text-base indent-2 bg-slate-50">
        Size
    </h4>
    
    <Button size="mini"> Mini </Button>
    <Button size="sm"> Small </Button>
    <Button> Default </Button>
    <Button size="lg"> Large </Button>

    <h4 class="text-base indent-2 bg-slate-50">
        Disable
    </h4>
    
    <Button size="mini" disabled> Mini </Button>
    <Button size="sm" variant="danger" disabled> Danger </Button>
    <Button variant="secondary" disabled> Secondary </Button>
    <Button variant="reverse" size="lg" disabled> Reverse </Button>
    <Button variant="outline" size="lg" disabled> Outline </Button>
    <Button variant="ghost" size="lg" disabled> Ghost </Button>

    <h4 class="text-base indent-2 bg-slate-50">
        With Icon
    </h4>
    
    <Button> 
        <Icon variant="Download"/>
        Download 
    </Button>

    <Button variant="danger">
        <Icon variant="Delete"/>
        Delete
    </Button>
</div>
