<script lang="ts" module>

async function load(icon:string) {
    return (await import(`$lib/icons/${icon}.svelte`)).default;
}

</script>

<script lang="ts">
import { onMount, type Component } from "svelte";

type LoadProps = {
    icon:string;
}

let {
    icon,
}:LoadProps = $props();

let C = $state<null|Component>(null);

$effect(() => {
    load(icon).then(c => {
        C = c;
    });

    return () => {
        C = null;
    }
});

</script>

{#if C}
    <C size={22}/>
{/if}
