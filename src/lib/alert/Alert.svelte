<script module lang="ts">
import { type VariantProps, tv } from "tailwind-variants";
import { type Snippet, onMount } from "svelte";
import { Icon } from "$lib/icon/index.js";

const alertVariants = tv({
	base: "flex rounded-md p-4 text-sm",
	variants: {
		variant: {
			info: "bg-primary-50 text-primary-500",
			success: "bg-green-50 text-green-500",
			warning: "bg-yellow-50 text-yellow-500",
			error: "bg-red-50 text-red-500",
		}
	},
	defaultVariants: {
		variant: "info",
	},
});

const iconsMap = {
	info: "CircleFillInfo",
	success: "CircleFillSuccess",
	warning: "FillWarning",
	error: "CircleFillError",
};

type Variant = VariantProps<typeof alertVariants>["variant"];

type AlertProps = {
    id?:string;
    class?: string;
    ref?: {(el:HTMLElement):void};
	description?: Snippet | string;
	onclick?: {():void};
    variant?: Variant;
	withIcon?: boolean;
    children: Snippet;
}

</script>

<script lang="ts">

let {
	ref,
    variant,
	withIcon,
    class:className,
	description,
	onclick,
    children
}:AlertProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<div class={alertVariants({variant, className})}>
	{#if withIcon}
		<Icon 
			variant={iconsMap[variant ?? "info"] as any} 
			class="mr-2"
			size="18px"
		/>
	{/if}

	<div>
		<p>
			{@render children()}
		</p>
		{#if description}
			{#if typeof description === "string"}
				<p>
					{description}
				</p>
			{:else}
				{@render description()}
			{/if}
		{/if}
	</div>

	<button 
		aria-label="button"
		type="button" 
		class="ml-auto"
		onclick={onclick}
	>
		<Icon variant="Close"/>
	</button>
</div>
