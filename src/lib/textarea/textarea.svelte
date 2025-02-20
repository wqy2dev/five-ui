<script lang="ts" module>
import type { FormFieldContext } from "$lib/form/FormField.svelte";
import { type FullAutoFill } from "svelte/elements";
import { getContext, onMount } from "svelte";

import { tv, type VariantProps } from "tailwind-variants";

const textareaVariants = tv({
	base: "w-full align-top inline-flex flex-row items-center p-1 rounded-md bg-white border border-solid border-slate-200 overflow-hidden transition outline-none",
    variants: {
        disabled: {
            true: "cursor-not-allowed bg-slate-50",
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
	value?:string|number;
    class?:string;
	width?:number|string;
    radius?:Radius;
    disabled?:boolean;
	minlength?:number;
	maxlength?:number;
	placeholder?:string;
	autocomplete?:FullAutoFill;
	readonly?:boolean;
    rows?:number;
	ref?:{(el:HTMLElement):void};
	onchange?:{(value?:string):void};
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
    onchange,
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

function onChange(e:Event & {currentTarget: EventTarget & HTMLTextAreaElement}) {
    onchange?.(e.currentTarget.value);
}

function onFocus(e:FocusEvent) {
    if(!disabled) {
        focus = e.type === "focus";
    }
}

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

</script>

<textarea
    class={textareaVariants({disabled, radius, className})}
    style:width={width}
    bind:this={el}
    bind:value={value}
    name={name}
    disabled={disabled}
    oninput={onChange}
    onfocus={onFocus}
    onblur={onFocus}
    {...restProps}
>
</textarea>
