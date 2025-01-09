<script lang="ts">
import { getContext, onMount, type Snippet } from "svelte";
import type { TabsContext } from "./Tabs.svelte";

const context = getContext("tabs") as TabsContext;
if(!context) {
    throw new Error("TabContent not in the Tabs!");
}

type TabContentProps = {
    id?:string;
    ref?:{(el:HTMLElement):void};
    class?:string;
    key:string;
    children:Snippet;
}

let {
    id,
    ref,
    key,
    class:className,
    children,
}:TabContentProps = $props();

let open = $state(context.key === key);

function handler(current:string) {
    open = current === key;
}

function mount(el:HTMLElement) {
    ref?.(el);
}

onMount(() => {
    context.install(key, handler);
});

</script>

{#if open}
<div 
    aria-label="TabContent"
    role="tabpanel"
    id={id}
    class={className}
    use:mount
>
    {@render children()}
</div>
{/if}
