<script lang="ts" module>

export type AccordionOnChange = {(key:string, expand:boolean):void};
export type AccordionShrink = {(key:string, fn:{():void}):void};

export interface AccordionContext {
    expandKeys?:string[];
    disableKeys?:string[];
    shrink:AccordionShrink;
    onchange?:AccordionOnChange;
}

interface AccordionItemProps extends Omit<AccordionContext, "shrink"> {
    id?:string;
    class?:string;
    accordion?:boolean;
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
    disableKeys,
    expandKeys,
    onchange:onChange,
    children
}:AccordionItemProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

const shrinkList:{
    key:string,
    fn:{():void}
}[] = [];

function shrink(key:string, fn:{():void}) {
    if(accordion) {
        shrinkList.push({key, fn});
    }
}

function onchange(key:string, expand:boolean) {
    if(expand && accordion) {
        shrinkList.forEach(item => {
            if(item.key !== key){
                item.fn();
            }
        });
    }

    onChange?.(key, expand);
}

setContext("accordion", {
    disableKeys,
    expandKeys,
    onchange,
    shrink,
});

</script>

<div
    bind:this={el}
    id={id}
    class={twMerge("relative w-full divide-y", className)}
>
    {@render children?.()}
</div>
