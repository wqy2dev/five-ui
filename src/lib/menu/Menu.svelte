<script lang="ts" module>

export type MenuSize = "sm"|"md"|"lg";

export type MenuContext = {
    value:string;
    size?:MenuSize;
    stateful?:boolean;
    oncommand?:{(value?:string, label?:string, target?:HTMLElement):void};
}

export type MenuProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    children:Snippet;
    value?:string;
    stateful?:boolean;
    size?:MenuSize;
    oncommand?:{(value?:string, label?:string, target?:HTMLElement):void};
}

</script>

<script lang="ts">
import { setContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

let {
    id,
    ref,
    children,
    value,
    size = "md",
    stateful = false,
    class:className,
    oncommand,
}:MenuProps = $props();

function mount(el:HTMLElement) {
    ref?.(el);
}

let context = $state({
    value,
    size,
    stateful,
    oncommand,
});

setContext("menu", context);

</script>

<div
    use:mount
    id={id}
    class={twMerge("w-full h-fit space-y-1 bg-white", className)}
>
    {@render children()}
</div>
