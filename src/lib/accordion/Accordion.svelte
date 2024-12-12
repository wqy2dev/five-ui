<script lang="ts" module>

export type AccordionOnChange = {(key:string, expand:boolean):void};

export interface AccordionContext {
    accordion?:boolean;
    disableKeys?:string[];
    onchange?:AccordionOnChange;
}

interface AccordionItemProps extends AccordionContext {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    children?:Snippet;
}

</script>

<script lang="ts">
import { onMount, setContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

let {
	id,
	ref,
    class:className,
    accordion,
    onchange,
    children
}:AccordionItemProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

setContext("accordion", {
    accordion,
    onchange,
});

</script>

<div
  class={twMerge("relative w-full", className)}
>
    {@render children?.()}
</div>
