<script module lang="ts">
import { type VariantProps, tv } from "tailwind-variants";
import { type Snippet, onMount } from "svelte";
import { InfoCircleSolid, SuccessCircleSolid, ErrorCircleSolid, WarnCircleSolid, Close } from "$lib/icons/index.js";

const alertVariants = tv({
	base: "flex rounded-md p-2 text-sm border border-solid border-transparent",
	variants: {
		variant: {
			info: "bg-primary-50 text-primary-600",
			success: "bg-green-50 text-green-600",
			warn: "bg-yellow-50 text-yellow-600",
			error: "bg-red-50 text-red-600",
		},
		border: {
			info: "border-primary-600",
			success: "border-green-600",
			warn: "border-yellow-600",
			error: "border-red-600",
			none: "",
		},
	},
	defaultVariants: {
		variant: "info",
		border: "info",
	},
});

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
	withClose?:boolean;
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
	bind:this={el}
	id={id}
	class={alertVariants({variant, border: withBorder ? variant : "none", className})}
>
	{#if withIcon}
		<span class="mr-2">
			{#if variant === "info"}
				<InfoCircleSolid size={20}/>
			{:else if variant === "success"}
				<SuccessCircleSolid size={20}/>
			{:else if variant === "warn"}
				<WarnCircleSolid size={20}/>
			{:else if variant === "error"}
				<ErrorCircleSolid size={20}/>
			{/if}
		</span>
	{/if}

	<div>
		<div>
			{@render children()}
		</div>
		{#if description}
			{#if typeof description === "string"}
				<div>
					{description}
				</div>
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
			<Close size={16}/>
		</button>
	{/if}
</div>
