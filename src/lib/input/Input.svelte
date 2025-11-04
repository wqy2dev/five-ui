<script lang="ts" module>
import { getContext, onMount, type Snippet } from "svelte";
import { type VariantProps, tv } from "tailwind-variants";
import { Close } from "$lib/icons/index.js";
import type { FullAutoFill } from "svelte/elements";
import type { FormFieldContext } from "$lib/form/FormField.svelte";

const inputVariants = tv({
	slots: {
		base: "w-full align-top inline-flex flex-row items-center px-2 bg-white border border-solid border-slate-200 overflow-hidden transition-all",
		input: "grow shrink min-w-5 h-full text-sm text-slate-700 disabled:text-slate-400 placeholder:text-slate-400 bg-transparent cursor-inherit outline-none",
		slot: "min-w-6 shrink-0 flex items-center text-sm text-slate-400 z-1 cursor-inherit",
	},
	variants: {
		disabled:{
			true: {
				base: "cursor-not-allowed bg-slate-50",
			}
		},
		focus: {
			true: {
				base: "ring ring-primary-100 border-primary-600",
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
	value?:string;
    type?:"text"|"password";
	size?:Size;
	radius?:Radius;
	placeholder?:string;
	autocomplete?:FullAutoFill;
	readonly?:boolean;
    disabled?:boolean;
	maxlength?:number;
	showCount?:boolean;
	clearable?:boolean;
	head?:Snippet;
	tail?:Snippet;
	ref?:{(el:HTMLElement):void};
	onchange?:{(value?:string):void};
	onkeypress?:{(code:string, key:string):void};
	onfocus?:{(e:FocusEvent):void};
	onblur?:{(e:FocusEvent):void};
}

</script>

<script lang="ts">

let {
	id,
    ref,
    head,
    tail,
    name,
    class:className,
    value,
    size,
	radius,
    disabled,
	maxlength,
	showCount,
	clearable = true,
	onfocus,
	onblur,
    onchange,
	onkeypress,
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
let count = $state(value?.length ?? 0);

// erase input
function onErase(_:MouseEvent) {
    value = undefined, focus = true, count = 0;

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
	let v = e.currentTarget.value;

	// input truncation
	if(typeof maxlength === "number" && v.length > maxlength) {
		v = v.slice(0, maxlength), value = v;
	}

	onchange?.(v), count = v.length;
}

function onKeyPress(e:KeyboardEvent) {
    onkeypress?.(e.code, e.key);
}

const {
	base,
	slot,
	input,
} = inputVariants({size, radius});

</script>

<div
	bind:this={el}
	id={id}
	role="form"
	class={base({disabled, focus:focus && !disabled, className})}
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
		maxlength={maxlength}
		disabled={disabled}
		onfocus={onFocus}
		onblur={onFocus}
		oninput={onChange}
		onkeypress={onKeyPress}
		{...restProps}
	/>

	{#if !disabled && clearable && hover && value }
		<div class={slot({slot:"erase"})}>
			<button onmouseup={onErase}>
				<Close size={15}/>
			</button>
		</div>
	{/if}

	{#if showCount}
		<div class={slot({slot:"tail"})}>
			{count}/{maxlength ?? 0}
		</div>
	{/if}

	{#if tail}
        <div class={slot({slot:"tail"})}>
	        {@render tail()}
		</div>
	{/if}
</div>
