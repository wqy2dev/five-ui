<script lang="ts" module>
import { getContext, onMount, type Snippet } from "svelte";
import { type VariantProps, tv } from "tailwind-variants";
import { Close } from "$lib/icons/index.js";
import type { FullAutoFill } from "svelte/elements";
import type { FormFieldContext } from "$lib/form/FormField.svelte";

const inputVariants = tv({
	slots: {
		base: "w-full align-top inline-flex flex-row items-center pr-2 bg-white border border-solid border-slate-200 overflow-hidden transition-all",
		input: "grow shrink min-w-5 h-full pl-2 text-sm text-slate-700 disabled:text-slate-400 placeholder:text-slate-400 bg-transparent cursor-inherit outline-none",
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
				slot: "justify-start ml-2",
				input: "pl-0",
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
	pattern?:RegExp;
	head?:Snippet;
	tail?:Snippet;
	ref?:{(el:HTMLElement):void};
	refInput?:{(el:HTMLElement):void};
	oninput?:{(value?:string):void};
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
	refInput,
    head,
    tail,
    name,
    class:className,
    value = "",
    size,
	radius,
    disabled,
	maxlength,
	showCount,
	clearable = true,
	readonly,
	autocomplete,
	type,
	placeholder,
	pattern,
	onfocus,
	onblur,
	oninput,
    onchange,
	onkeypress,
}:InputProps = $props();

// first reading context
const fieldContext = getContext<FormFieldContext>("formField");
if(fieldContext) {
    name = fieldContext.name;
    onchange = fieldContext.onchange;

	value = "";
	if(typeof fieldContext.value === "string") {
        value = fieldContext.value;
    }
}

let focus = $state(false);
let hover = $state(false);
let count = $derived.by(() => value.length);

let cache = "";

let refresh = $derived.by(() => {
	if(!pattern || pattern.test(value)) {
		return cache = value, {update:false, cache};
	}
	return {update:true, cache};
});

let el:HTMLElement;
let inner:HTMLInputElement;

onMount(() => {
    ref?.(el), refInput?.(inner);
});

// Erase input
function onErase(_:MouseEvent) {
    value = "", focus = true;

	if(inner) {
		inner.focus();
	}

    onchange?.("");
}

function onFocus(e:FocusEvent) {
    if(!disabled) {
        focus = e.type === "focus", focus ? onfocus?.(e) : onblur?.(e);
    }
}

function onHover(e:Event) {
    hover = e.type === "mouseenter";
}

function onInput(e:Event & {currentTarget: EventTarget & HTMLInputElement}) {
	let v = e.currentTarget.value;

	// truncation
	if(typeof maxlength === "number" && v.length > maxlength) {
		v = v.slice(0, maxlength);
	}

	value = v, oninput?.(value);
}

function onChange() {
	if(refresh.update) {
		value = refresh.cache;
	}

    onchange?.(refresh.cache);
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
{value}
<div
	bind:this={el}
	id={id}
	role="form"
	class={base({disabled, focus:focus && !disabled, className})}
    onmouseenter={onHover}
    onmouseleave={onHover}
>
	{#if head}
		<div class={slot({slot:"head"})}>
			{@render head()}
		</div>
	{/if}

	<input
		bind:this={inner}
		name={name}
		value={value}
		type={type}
		class={input(head?{slot:"head"}:{})}
		placeholder={placeholder}
		maxlength={maxlength}
		disabled={disabled}
		onfocus={onFocus}
		onblur={onFocus}
		oninput={onInput}
		onchange={onChange}
		onkeypress={onKeyPress}
		readonly={readonly}
		autocomplete={autocomplete}
	/>

	{#if !disabled && clearable && hover && value }
		<div class={slot({slot:"erase"})}>
			<button 
				type="button"
			    onmouseup={onErase}
				class="outline-none border-none bg-transparent"
			>
				<Close size={15} class="pointer-events-none"/>
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
