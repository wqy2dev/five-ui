<script lang="ts" module>
import type { FormFieldContext } from "$lib/form/FormField.svelte";
import type { FullAutoFill } from "svelte/elements";
import { getContext, onMount } from "svelte";
import { tv, type VariantProps } from "tailwind-variants";

const textareaVariants = tv({
	base: "w-full px-1 pt-1 pb-5 rounded-md text-sm bg-white border border-solid border-slate-200 overflow-hidden transition outline-none",
    variants: {
        disabled: {
            true: "cursor-not-allowed bg-slate-50 text-slate-400",
            false: "text-slate-700",
        },
        focus: {
            true: "ring ring-primary-200 border-primary-600",
        },
        radius: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            none: "",
        },
    },
    defaultVariants: {
		radius: "md",
	},
});

type Radius = VariantProps<typeof textareaVariants>["radius"];

export type TextareaProps = {
	id?:string;
	name?:string;
	value?:string;
    class?:string;
	width?:number|string;
    radius?:Radius;
    disabled?:boolean;
	maxlength?:number;
	showCount?:boolean;
	placeholder?:string;
	autocomplete?:FullAutoFill;
	readonly?:boolean;
    rows?:number;
	ref?:{(el:HTMLElement):void};
	onchange?:{(value?:string):void};
    onkeypress?:{(code:string, key:string):void};
	onfocus?:{(e:FocusEvent):void};
	onblur?:{(e:FocusEvent):void};
}

</script>

<script lang="ts">

let {
    name,
    value,
    width,
    class:className,
    disabled,
    radius,
    rows = 3,
    maxlength,
	showCount,
    onfocus,
	onblur,
    onchange,
	onkeypress,
    ref,
    ...restProps
}:TextareaProps = $props();

const fieldContext = getContext<FormFieldContext>("formField");
if(fieldContext) {
    name = fieldContext.name;
    value = fieldContext.value;
    onchange = fieldContext.onchange;
}

let focus = $state(false);
let count = $state(value?.length ?? 0);

function onChange(e:Event & {currentTarget: EventTarget & HTMLTextAreaElement}) {
    let v = e.currentTarget.value;

	// input truncation
	if(typeof maxlength === "number" && v.length > maxlength) {
		v = v.slice(0, maxlength), value = v;
	}

	onchange?.(v), count = v.length;
}

function onFocus(e:FocusEvent) {
    if(!disabled) {
        focus = e.type === "focus", focus ? onfocus?.(e) : onblur?.(e);
    }
}

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<div class="relative w-full h-fit inline-block align-top">
    <textarea
        bind:this={el}
        bind:value={value}
        class={textareaVariants({focus, disabled, radius, className})}
        style:width={width}
        name={name}
        rows={rows}
        maxlength={maxlength}
        disabled={disabled}
        oninput={onChange}
        onfocus={onFocus}
        onblur={onFocus}
        {...restProps}
    ></textarea>

    {#if showCount}
        <span class="absolute bottom-2 right-1 text-sm text-slate-400">
            {count}/{maxlength ?? 0}
        </span>
    {/if}
</div>
