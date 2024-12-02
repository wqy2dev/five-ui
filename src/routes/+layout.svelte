<script lang="ts">
import "./style.css";

let { children } = $props();

</script>

<div class="flex flex-row w-screen h-screen">
    <div class="w-56 bg-slate-50 text-sm shrink-0">
        <a class="block w-full leading-8 pl-2 hover:bg-primary-100" href="/alert">Alert</a>
        <a class="block w-full leading-8 pl-2 hover:bg-primary-100" href="/button">Button</a>
        <a class="block w-full leading-8 pl-2 hover:bg-primary-100" href="/card">Card</a>
        <a class="block w-full leading-8 pl-2 hover:bg-primary-100" href="/tooltip">Tooltip</a>
    </div>
    <div class="grow p-5">
        {@render children()}
    </div>
</div>
