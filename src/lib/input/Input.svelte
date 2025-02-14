<script lang="ts" module>
import { onMount, type Snippet } from "svelte";
import { type VariantProps, tv } from "tailwind-variants";
import { Close } from "$lib/icons/index.js";
import type { FullAutoFill } from "svelte/elements";

const inputVariants = tv({
	slots: {
		base: "w-full align-top inline-flex flex-row items-center px-2 bg-white border border-solid border-slate-200 overflow-hidden transition-all",
		input: "grow shrink min-w-5 h-full text-sm text-slate-700 disabled:text-slate-400 placeholder:text-slate-400 bg-transparent cursor-inherit outline-none",
		slot: "w-5 shrink-0 flex items-center justify-center text-slate-600 z-1 cursor-inherit",
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

type Size = VariantProps<typeof inputVariants>["size"];
type Radius = VariantProps<typeof inputVariants>["radius"];

export type InputProps = {
	id?:string;
	width?:string|number;
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
	oninput?:{(value?:string):void};
	onchange?:{(value?:string):void};
	onkeypress?:{(code:string):void};
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
	width,
    disabled,
    oninput,
    onchange,
	onkeypress,
    ref,
    ...restProps
}:InputProps = $props();

let el:HTMLElement;
let inner:HTMLInputElement;

onMount(() => {
    ref?.(el);
});

// const fieldContext = getContext<FormFieldContext>("tc-form-field");
// if(fieldContext) {
//     name = fieldContext.name;
//     value = fieldContext.value;
//     onchange = fieldContext.onchange;
// }

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
        focus = e.type === "focus";
    }
}

function onHover(e:Event) {
    hover = e.type === "mouseenter";
}

function onInput(e:Event & {currentTarget: EventTarget & HTMLInputElement}) {
    if(e.type === "input") {
        oninput?.(e.currentTarget.value);
    }
    else if(e.type === "change") {
        onchange?.(e.currentTarget.value);
    }
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
	style:width={width}
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
		oninput={onInput}
		onchange={onInput}
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
