<script lang="ts" module>
import { type VariantProps, tv } from "tailwind-variants";
import { onMount, type Snippet } from "svelte";
import { Overlay } from "$lib/index.js";
import { type Backdrop } from "$lib/overlay/Overlay.svelte";

const modalVariants = tv({
	base: "flex flex-col w-full px-5 text-gray-900 border-solid border-gray-200 border bg-white shadow-sm overflow-hidden",
	variants: {
		size: {
			xs: "max-w-xs rounded-lg",
			sm: "max-w-sm rounded-lg",
			md: "max-w-md rounded-lg",
			lg: "max-w-lg rounded-lg",
			xl: "max-w-xl rounded-lg",
			"2xl": "max-w-2xl rounded-lg",
			"3xl": "max-w-3xl rounded-lg",
			"4xl": "max-w-4xl rounded-lg",
			"5xl": "max-w-5xl rounded-lg",
			"6xl": "max-w-6xl rounded-lg",
			full: "w-screen h-screen",
		},
		placement: {
			top: "",
			center: "",
			bottom: "",
		},
	},
	defaultVariants: {
		size: "md",
		placement: "top",
	},
});

type Size = VariantProps<typeof modalVariants>["size"];
type Placement = VariantProps<typeof modalVariants>["placement"];

type ModalProps = {
	id?:string;
    class?: string;
    ref?: {(el:HTMLElement):void};
	title?: string | Snippet;
    size?: Size;
	placement?: Placement;
	backdrop?: Backdrop;
	overlayStyle?: string;
	overlayClosable?: boolean;
	okText?: string;
	cancelText?: string;
	onok?: {():void};
	oncancel?: {():void};
    children: Snippet;
}

</script>

<script lang="ts">
import { Button, Icon } from "$lib/index.js";

let {
	id,
    class:className,
	title,
	size,
	placement,
	overlayStyle,
	overlayClosable,
	backdrop = "opaque",
	oncancel,
	onok,
	okText = "OK",
	cancelText = "Cancel",
    ref,
    children,
}:ModalProps = $props();

let el: HTMLElement;

onMount(() => {
    ref?.(el);
});

function onOverlay(ev:MouseEvent) {
	if(overlayClosable && (ev.target as Element).contains(el)) {
		oncancel?.();
	}
}

</script>

<Overlay
	style={overlayStyle}
	backdrop={backdrop}
	onclick={onOverlay}
>
	<div 
		bind:this={el}
		id={id}
		class={modalVariants({size, placement, className})}
	>
		{#if title}
			<div class="flex flex-row py-3 text-lg font-semibold">
				<div class="grow">
					{#if typeof title === "string"}
						{title}
					{:else}
						{@render title()}
					{/if}
				</div>

				<button
					class="ml-auto flex items-center justify-center rounded-lg w-7 h-7 text-gray-500 hover:bg-gray-100"
					type="button"
					onclick={oncancel}
				>
					<Icon 
						variant="Close"
						size="20px"
					/>
				</button>
			</div>
		{/if}
	
		<div class="grow text-sm">
			{@render children()}
		</div>

		<div class="flex justify-end py-3 gap-4">
			<Button 
				variant="outline"
				onclick={oncancel}
			>
				{cancelText}
			</Button>
			<Button
				onclick={onok}
			>
				{okText}
			</Button>
		</div>
	</div>
</Overlay>
