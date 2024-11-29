<script lang="ts">
import { onMount, type Snippet } from "svelte";
import type { HTMLAttributeAnchorTarget } from "svelte/elements";

interface ButtonProps {
    href?: string;
    target?: HTMLAttributeAnchorTarget;
    size?: "sm" | "md" | "lg" | "icon" | "iconsm" | "iconlg";
    variant?: "primary" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    type?: "submit" | "reset" | "button";
    onclick?: {():void};
	ref?: {(el:HTMLElement):void};
    id?:string;
    class?: string;
    disabled?: boolean;
    children: Snippet;
}

let {
    size = "md",
    type = "button",
    variant = "primary",
    class:className,
    ref,
    children,
    ...restProps
}:ButtonProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<svelte:element 
    this={restProps["href"] ? "a":"button"}
    bind:this={el}
    {...{size, variant, type}}
    {...restProps}
>
    {@render children()}
</svelte:element>

<style lang="scss">

.sve-button {
    vertical-align: top;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    white-space: nowrap;
    cursor: pointer;
}

</style>
