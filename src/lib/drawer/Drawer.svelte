<script lang="ts" module>
import { onMount, type Snippet } from "svelte";
import { slide } from "svelte/transition";
import { Overlay } from "$lib/index.js";
import { type VariantProps, tv } from "tailwind-variants";
import { type Backdrop } from "$lib/overlay/Overlay.svelte";

const drawerVariants = tv({
	slots: {
		base: "w-full h-full text-gray-900 bg-white shadow-sm overflow-hidden",
		maxWidth: "",
		maxHeight: "",
		overlay: "flex",
	},
	variants: {
        size: {
            xs: {
				maxWidth: "max-w-xs",
				maxHeight: "max-h-80",
			},
			sm: {
				maxWidth: "max-w-sm",
				maxHeight: "max-h-96",
			},
			md: {
				maxWidth: "max-w-md",
				maxHeight: "max-h-[28rem]",
			},
			lg: {
				maxWidth: "max-w-lg",
				maxHeight: "max-h-[32rem]",
			},
            xl: {
				maxWidth: "max-w-xl",
				maxHeight: "max-h-[36rem]",
			},
			"2xl": {
				maxWidth: "max-w-2xl",
				maxHeight: "max-h-[42rem]",
			},
			"3xl": {
				maxWidth: "max-w-3xl",
				maxHeight: "max-h-[48rem]",
			},
        },
		placement: {
			top: {
				overlay: "items-start",
			},
            bottom: {
				overlay: "items-end",
			},
            left: {
				overlay: "justify-start",
            },
			right: {
				overlay: "justify-end",
			},
		},
	},
	defaultVariants: {
		size: "sm",
		placement: "right",
	},
});

type Size = VariantProps<typeof drawerVariants>["size"];
type Placement = VariantProps<typeof drawerVariants>["placement"];

type DrawerProps = {
	id?:string;
    class?: string;
    ref?: {(el:HTMLElement):void};
    size?: Size;
    style?: string;
	backdrop?: Backdrop;
	placement?: Placement;
	overlayStyle?: string;
	overlayClosable?: boolean;
    onclose?:{():void},
    children: Snippet;
}

</script>    

<script lang="ts">

let {
	id,
    class:className,
	size,
    style,
	overlayStyle,
	overlayClosable,
	backdrop = "opaque",
	placement = "right",
	onclose,
    ref,
    children,
}:DrawerProps = $props();

let el: HTMLElement;

onMount(() => {
    ref?.(el);
});

function onOverlay(ev:MouseEvent) {
	if(overlayClosable && (ev.target as Element).contains(el)) {
		onclose?.();
	}
}

const { 
	base,
	maxWidth,
	maxHeight,
	overlay,
} = drawerVariants({
	size,
	placement,
});

const isX = placement === "left" || placement === "right";
const drawerClass = (isX ? maxWidth() : maxHeight()) +" "+ base({className});

</script>

<Overlay
    style={overlayStyle}
	backdrop={backdrop}
	onclose={onOverlay}
    class={overlay()}
>
    <div
        bind:this={el}
        id={id}
        class={drawerClass}
        style={style}
        transition:slide={{
            duration: 200,
            axis: isX ? "x":"y",
        }}
    >
        {@render children()}
    </div>
</Overlay>
