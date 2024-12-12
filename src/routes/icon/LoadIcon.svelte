<script lang="ts">
import type { Component } from "svelte";

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

load(icon);

</script>

{#if C}
    <C/>
{/if}
