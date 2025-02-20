<script lang="ts" module>
import { type VariantProps, tv } from "tailwind-variants";
import { onMount, type Snippet } from "svelte";
import { Overlay, Button } from "$lib/index.js";
import { Close } from "$lib/icons/index.js";
import { type Backdrop } from "$lib/overlay/Overlay.svelte";

const modalVariants = tv({
	slots: {
		base: "flex flex-col w-full text-slate-900 border-solid border-slate-200 border bg-white shadow-sm overflow-hidden",
		overlay: "flex justify-center py-14",
		content: "px-5 grow text-sm",
	},
	variants: {
		overflowScroll: {
			inside: {
				base: "max-h-full",
				overlay: "overflow-hidden",
				content: "overflow-y-auto",
			},
			outside: {
				overlay: "overflow-y-auto",
			},
		},
		size: {
			xs: {
				base: "max-w-xs rounded-lg",
			},
			sm: {
				base: "max-w-sm rounded-lg",
			},
			md: {
				base: "max-w-md rounded-lg",
			},
			lg: {
				base: "max-w-lg rounded-lg",
			},
			xl: {
				base: "max-w-xl rounded-lg",
			},
			"2xl": {
				base: "max-w-2xl rounded-lg",
			},
			"3xl": {
				base: "max-w-3xl rounded-lg",
			},
			"4xl": {
				base: "max-w-4xl rounded-lg",
			},
			"5xl": {
				base: "max-w-5xl rounded-lg",
			},
			"6xl": {
				base: "max-w-6xl rounded-lg",
			},
			full: {
				base: "w-screen h-screen max-h-screen",
			}
		},
		placement: {
			top: {
				overlay: "items-start",
			},
			center: {
				overlay: "items-center",
			},
			bottom: {
				overlay: "items-end",
			}
		},
	},
	defaultVariants: {
		size: "md",
		placement: "center",
		overflowScroll: "inside",
	},
});

type Size = VariantProps<typeof modalVariants>["size"];
type Placement = VariantProps<typeof modalVariants>["placement"];
type OverflowScroll = VariantProps<typeof modalVariants>["overflowScroll"];

type ModalProps = {
	id?:string;
    class?: string;
    ref?: {(el:HTMLElement):void};
	title?: string | Snippet;
    size?: Size;
	backdrop?: Backdrop;
	placement?: Placement;
	overflowScroll?: OverflowScroll;
	overlayStyle?: string;
	overlayClosable?: boolean;
	okText?: string;
	cancelText?: string;
	onok?: {():void};
	oncancel?: {():void};
	footer?: Snippet;
    children: Snippet;
}

</script>

<script lang="ts">

let {
	id,
    class:className,
	title,
	size,
	overlayStyle,
	overlayClosable,
	overflowScroll,
	backdrop = "opaque",
	placement,
	oncancel,
	onok,
	okText = "OK",
	cancelText = "Cancel",
	footer,
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

const { 
	base, 
	overlay,
	content,
} = modalVariants({
	placement,
	overflowScroll,
	size,
});

</script>

<Overlay
	style={overlayStyle}
	backdrop={backdrop}
	onclose={onOverlay}
	class={overlay()}
>
	<div 
		aria-label="Modal"
		bind:this={el}
		id={id}
		class={base({className})}
	>
		{#if title}
			<div class="flex flex-row px-5 py-3 text-lg text-slate-700">
				<div class="grow">
					{#if typeof title === "string"}
						{title}
					{:else}
						{@render title()}
					{/if}
				</div>

				<button
					class="ml-auto flex items-center justify-center rounded-lg w-7 h-7 text-slate-500 hover:bg-slate-100"
					type="button"
					onclick={oncancel}
				>
					<Close 
						size={18}
					/>
				</button>
			</div>
		{/if}
	
		<div class={content()}>
			{@render children()}
		</div>

		<div class="px-5 flex justify-end py-3 gap-4">
			{#if footer}
				{@render footer()}
			{:else}
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
			{/if}
		</div>
	</div>
</Overlay>
