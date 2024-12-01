<script lang="ts">
    import Icon from "$lib/icon/icon.svelte";
import { Button } from "$lib/index.js";
</script>

<h2 class="text-lg font-bold leading-10">
    Button
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        Default
    </h4>
    
    <Button> Primary Button </Button>
    <Button variant="danger"> Danger Button </Button>
    <Button variant="secondary"> Secondary Button </Button>
    <Button variant="reverse"> Reverse Button </Button>
    <Button variant="outline"> Outline Button </Button>
    <Button variant="ghost"> Ghost Button </Button>

    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        Size
    </h4>
    
    <Button size="mini"> Mini </Button>
    <Button size="sm"> Small </Button>
    <Button> Default </Button>
    <Button size="lg"> Large </Button>

    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        Disable
    </h4>
    
    <Button size="mini" disabled> Mini </Button>
    <Button size="sm" variant="danger" disabled> Danger </Button>
    <Button variant="secondary" disabled> Secondary </Button>
    <Button variant="reverse" size="lg" disabled> Reverse </Button>
    <Button variant="outline" size="lg" disabled> Outline </Button>
    <Button variant="ghost" size="lg" disabled> Ghost </Button>

    <h4 class="text-base indent-2 border-l-solid border-l-blue-600 border-l-2 bg-slate-50">
        With Icon
    </h4>
    
    <Button> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
            <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
        </svg>
        Download 
    </Button>

    <Button variant="danger">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" class="h-4 w-4">
            <path fill="currentColor" d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0Zm-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2h7.5Zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0v-10Zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1Z" />
        </svg>
        Delete
    </Button>
</div>
