<script lang="ts">
import "./style.css";

let { children } = $props();

</script>

<div class="flex flex-row w-screen h-screen">
    <div class="w-64 bg-slate-50 pl-2 text-sm">
        <a class="block w-full leading-8" href="/alert">Alert</a>
        <a class="block w-full leading-8" href="/button">Button</a>
        <a class="block w-full leading-8" href="/card">Card</a>
    </div>
    <div class="grow shrink-0 p-5">
        {@render children()}
    </div>
</div>
