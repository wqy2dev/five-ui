<script lang="ts">
import "./style.css";

let { children } = $props();

</script>

<div class="flex flex-row w-screen h-screen">
    <div class="w-56 bg-slate-50 text-sm shrink-0">
        <a class="block w-full pl-6 py-2 hover:bg-primary-100" href="/alert">Alert</a>
        <a class="block w-full pl-6 py-2 hover:bg-primary-100" href="/badge">Badge</a>
        <a class="block w-full pl-6 py-2 hover:bg-primary-100" href="/button">Button</a>
        <a class="block w-full pl-6 py-2 hover:bg-primary-100" href="/card">Card</a>
        <a class="block w-full pl-6 py-2 hover:bg-primary-100" href="/layout">Layout</a>
        <a class="block w-full pl-6 py-2 hover:bg-primary-100" href="/modal">Modal</a>
        <a class="block w-full pl-6 py-2 hover:bg-primary-100" href="/tooltip">Tooltip</a>
    </div>
    <div class="grow py-5 px-8 overflow-y-auto">
        {@render children()}
    </div>
</div>
