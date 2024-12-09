<script module lang="ts">
import { type VariantProps, tv } from "tailwind-variants";
import { type Snippet, onMount } from "svelte";
import { Icon } from "$lib/icon/index.js";

const alertVariants = tv({
	base: "flex rounded-md p-4 text-sm border border-solid border-transparent",
	variants: {
		variant: {
			info: "bg-primary-50 text-primary-600",
			success: "bg-green-50 text-green-600",
			warning: "bg-yellow-50 text-yellow-600",
			error: "bg-red-50 text-red-600",
		},
		border: {
			info: "border-primary-600",
			success: "border-green-600",
			warning: "border-yellow-600",
			error: "border-red-600",
			none: "",
		},
	},
	defaultVariants: {
		variant: "info",
		border: "info",
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
    class?:string;
    ref?:{(el:HTMLElement):void};
	description?:Snippet | string;
	onclose?:{():void};
    variant?:Variant;
	withIcon?:boolean;
	withBorder?:boolean;
	withClose?:boolean,
    children:Snippet;
}

</script>

<script lang="ts">

let {
	id,
	ref,
    variant = "info",
	withIcon,
	withBorder,
	withClose,
    class:className,
	description,
	onclose,
    children
}:AlertProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<div
	id={id}
	class={alertVariants({variant, border: withBorder ? variant : "none", className})}
>
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

	{#if withClose}
		<button 
			type="button" 
			class="ml-auto"
			onclick={onclose}
		>
			<Icon variant="Close"/>
		</button>
	{/if}
</div>
