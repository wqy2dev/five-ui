<script lang="ts">
import { hasContext, onMount } from "svelte";

if(!hasContext("tabscontext")) {
    throw new Error("TabContent not in the TabsContext!");
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

let el: HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<div 
    aria-label="TabContent"
    bind:this={el}
    id={id}
    class={className}
>
    {@render children()}
</div>
