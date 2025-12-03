<script lang="ts" module>

export type MenuSize = "sm"|"md"|"lg";

export type MenuContext = {
    label?:string;
    value?:string;
    size?:MenuSize;
    stateful?:boolean;
}

export type MenuProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    children:Snippet;
    value?:string;
    stateful?:boolean;
    size?:MenuSize;
    oncommand?:{(value?:string, label?:string):void};
}

</script>

<script lang="ts">
import { onMount, setContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

let {
    id,
    ref,
    children,
    oncommand,
    value,
    size = "md",
    stateful = false,
    class:className,
}:MenuProps = $props();

let version = value;

const ctx = $state({
    label: undefined,
    value,
    size,
    stateful,
});

setContext("menu", ctx);

$effect(() => {
    if(version !== value) {
        ctx.value = version = value;

        if(value === undefined || value === "") {
            ctx.label = undefined;
        }
    }
});

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
