<script lang="ts" module>
import { type VariantProps, tv } from "tailwind-variants";
import { onMount, type Snippet } from "svelte";
import { Overlay } from "$lib/index.js";

const modalVariants = tv({
	base: "flex flex-col w-full rounded-xl px-5 bg-white shadow-sm overflow-hidden",
	variants: {
		size: {
			xs: "max-w-xs",
			sm: "max-w-sm",
			md: "max-w-md",
			lg: "max-w-lg",
			xl: "max-w-xl",
			"2xl": "max-w-2xl",
			"3xl": "max-w-3xl",
			"4xl": "max-w-4xl",
			"5xl": "max-w-5xl",
			"6xl": "max-w-6xl",
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
	overlayStyle?: string;
    children: Snippet;
}
</script>

<script lang="ts">
import { Button } from "$lib/button/index.js";

let {
	id,
    class:className,
	title,
	size,
	placement,
	overlayStyle,
    ref,
    children,
}:ModalProps = $props();

let el: HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<Overlay
	style={overlayStyle}
>
	<div 
		bind:this={el}
		id={id}
		class={modalVariants({size, placement, className})}
	>
		{#if title}
			<div class="py-3 font-semibold">
				{#if typeof title === "string"}
					{title}
				{:else}
					{@render title()}
				{/if}
			</div>
		{/if}
	
		<div>
			{@render children()}
		</div>

		<div class="flex justify-end py-3 gap-4">
			<Button variant="outline">取消</Button>
			<Button>确定</Button>
		</div>
	
        <!-- <div class="relative p-5">
          <div class="text-center">
            <div class="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>

            <div>
              <h3 class="text-lg font-medium text-secondary-900">Delete blog post</h3>
              <div class="mt-2 text-sm text-secondary-500">Are you sure you want to delete this post? This action cannot be undone.</div>
            </div>
          </div>

          <div class="mt-5 flex justify-end gap-3">
            <button type="button" class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400">Cancel</button>
            <button type="button" class="flex-1 rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300">Delete</button>
          </div>
        </div> -->
	</div>
</Overlay>
