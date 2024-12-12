<script lang="ts">
import { onMount, type Component } from "svelte";

type LoadProps = {
    icon:string;
}

let {
    icon,
}:LoadProps = $props();

let C = $state<null|Component>(null);

async function load(icon:string) {
    C = (await import(`$lib/icons/${icon}.svelte`)).default;
}

onMount(() => {
    load(icon);
});

</script>

{#if C}
    <C/>
{/if}
