<script lang="ts" module>
import { getContext, onMount, type Snippet } from "svelte";
import { type VariantProps, tv } from "tailwind-variants";
import { Close } from "$lib/icons/index.js";
import type { FullAutoFill } from "svelte/elements";
import type { FormFieldContext } from "$lib/form/FormField.svelte";

const inputVariants = tv({
	slots: {
		base: "w-full align-top inline-flex flex-row items-center px-2 bg-white border border-solid border-slate-200 overflow-hidden transition-all",
		input: "grow shrink min-w-5 h-full text-sm text-slate-900 disabled:text-slate-400 placeholder:text-slate-400 bg-transparent cursor-inherit outline-none",
		slot: "w-5 shrink-0 flex items-center justify-center text-slate-400 z-1 cursor-inherit",
	},
	variants: {
		disabled:{
			true: {
				base: "cursor-not-allowed bg-slate-50",
			}
		},
		focus: {
			true: {
				base: "ring ring-primary-200 border-primary-600",
			},
		},
		size: {
			sm: {
				base: "h-8 leading-8",
				slot: "h-8",
			},
			md: {
				base: "h-9 leading-9",
				slot: "h-9",
			},
			lg: {
				base: "h-10 leading-10",
				slot: "h-10",
			},
		},
		radius: {
            full: {
				base: "rounded-full",
			},
            sm: {
				base: "rounded-sm",
			},
            md: {
				base: "rounded-md",
			},
            lg: {
				base: "rounded-lg",
			},
            xl: {
				base: "rounded-xl",
			},
            none: {

			},
        },
		slot: {
			head: {
				slot: "justify-start",
			},
			tail: {
                slot: "justify-end",
			},
			erase: {
				slot: "justify-end cursor-pointer",
			},
		},
	},
	defaultVariants: {
		size: "md",
		radius: "md",
	},
});

export type Size = VariantProps<typeof inputVariants>["size"];
export type Radius = VariantProps<typeof inputVariants>["radius"];

export type InputProps = {
	id?:string;
	class?:string;
	name?:string;
	value?:string|number;
    type?:"text"|"password"|"number";
	size?:Size;
	radius?:Radius;
	minlength?:number;
	maxlength?:number;
	placeholder?:string;
	autocomplete?:FullAutoFill;
	readonly?:boolean;
    disabled?:boolean;
	head?:Snippet;
	tail?:Snippet;
	ref?:{(el:HTMLElement):void};
	onchange?:{(value?:string):void};
	onkeypress?:{(code:string):void};
	onfocus?:{(e:FocusEvent):void};
	onblur?:{(e:FocusEvent):void};
	// input number
	min?:number;
	max?:number;
	step?:number;
}

</script>

<script lang="ts">

let {
	id,
    head,
    tail,
    name,
    class:className,
    value,
    size,
    disabled,
	onfocus,
	onblur,
    onchange,
	onkeypress,
    ref,
    ...restProps
}:InputProps = $props();

// first reading context
const fieldContext = getContext<FormFieldContext>("formField");
if(fieldContext) {
    name = fieldContext.name;
    value = fieldContext.value;
    onchange = fieldContext.onchange;
}

let el:HTMLElement;
let inner:HTMLInputElement;

onMount(() => {
    ref?.(el);
});

let focus = $state(false);
let hover = $state(false);

// erase input
function onErase(_:MouseEvent) {
    value = "", focus = true;

	if(inner) {
		inner.focus();
	}

    if(onchange) {
        onchange("");
    }
}

function onFocus(e:FocusEvent) {
    if(!disabled) {
        focus = e.type === "focus", focus ? onfocus?.(e) : onblur?.(e);
    }
}

function onHover(e:Event) {
    hover = e.type === "mouseenter";
}

function onChange(e:Event & {currentTarget: EventTarget & HTMLInputElement}) {
	onchange?.(e.currentTarget.value);
}

const {
	base,
	slot,
	input,
} = inputVariants();

</script>

<div
	bind:this={el}
	id={id}
	role="form"
	class={base({size, focus:focus && !disabled, disabled, className})}
    onmouseenter={onHover}
    onmouseleave={onHover}
    {...{size}}
>
	{#if head}
		<div class={slot({slot:"head"})}>
			{@render head()}
		</div>
	{/if}

	<input
		bind:this={inner}
		bind:value={value}
		class={input()}
		name={name}
		disabled={disabled}
		onfocus={onFocus}
		onblur={onFocus}
		oninput={onChange}
		{...restProps}
	/>

	{#if !disabled && hover && value }
		<div class={slot({slot:"erase"})}>
			<button onmouseup={onErase}>
				<Close size={15}/>
			</button>
		</div>
	{/if}

	{#if tail}
        <div class={slot({slot:"tail"})}>
	        {@render tail()}
		</div>
	{/if}
</div>
