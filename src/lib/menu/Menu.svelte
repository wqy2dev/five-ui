<script lang="ts" module>

export type MenuContext = {
    label?:string;
    value?:string|number;
    stateful?:boolean;
}

type MenuProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    children:Snippet;
    value?:string|number;
    stateful?:boolean;
    oncommand?:{(value?:string|number, label?:string):void};
}

</script>

<script lang="ts">
import { onMount, setContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

let {
    id,
    ref,
    class:className,
    children,
    oncommand,
    value,
    stateful = false,
}:MenuProps = $props();

const ctx = $state({
    label: "",
    value,
    stateful,
});

setContext("menu", ctx);

$effect(() => {
    oncommand?.(ctx.value, ctx.label);
});

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<div
    bind:this={el}
    id={id}
    class={twMerge("w-full h-fit space-y-1 bg-white", className)}
>
    {@render children()}
</div>
