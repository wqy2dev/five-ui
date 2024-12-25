<script lang="ts">
import { onMount, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

type MenuItemProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    children:Snippet;
    key?:string;
    disabled?:boolean;
}

let {
    id,
    class:className,
    ref,
    children,
    key,
    disabled,
}:MenuItemProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<button
    bind:this={el}
    id={id}
    type="button"
    disabled={disabled}
    class={twMerge("flex flex-row w-full h-fit truncate hover:bg-slate-100 text-sm text-left text-slate-700 p-2 rounded-md", className)}
>
    {@render children()}
</button>
