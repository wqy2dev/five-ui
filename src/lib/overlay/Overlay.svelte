<script lang="ts" module>
import { onMount, type Snippet } from "svelte";
import { type VariantProps, tv } from "tailwind-variants";
import { fade } from "svelte/transition";

const overlayVariants = tv({
    base: "w-screen h-screen inset-0 z-30",
    variants: {
        position: {
            fixed: "fixed",
            absolute: "absolute",
        },
        backdrop: {
            "opaque": "bg-black/50",
            "blur": "bg-black/50 backdrop-blur-md",
            "transparent": "transparent",
        },
    },
    defaultVariants: {
        position: "fixed",
        backdrop: "opaque",
    },
});

export type Position = VariantProps<typeof overlayVariants>["position"];
export type Backdrop = VariantProps<typeof overlayVariants>["backdrop"];

type OverlayProps = {
    id?:string;
    class?: string;
    position?: Position;
    backdrop?: Backdrop;
    duration?: number;
    style?: string;
    ref?: {(el:HTMLElement):void};
    children: Snippet;
    onclose?:{(e:MouseEvent):void};
}

</script>

<script lang="ts">

let {
    id,
    class:className,
    position,
    backdrop,
    duration = 200,
    style,
    ref,
    children,
    onclose,
}:OverlayProps = $props();

let el:any;

onMount(() => {
    ref?.(el);

    if(el) {
        document.body.appendChild(el);
    }
});

</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore attribute_global_event_reference -->
<div
    bind:this={el}
    id={id}
    class={overlayVariants({position, backdrop, className})}
    style={style}
    onclick={onclose}
    transition:fade={{duration}}
>
    {@render children()}
</div>