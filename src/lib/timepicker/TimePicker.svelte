<script lang="ts" module>
import { type Snippet } from "svelte";
import { type VariantProps, tv } from "tailwind-variants";
import type { FullAutoFill } from "svelte/elements";
import { twMerge } from "tailwind-merge";

const timePickerVariants = tv({
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

export type Size = VariantProps<typeof timePickerVariants>["size"];
export type Radius = VariantProps<typeof timePickerVariants>["radius"];

export type TimePickerProps = {
	id?:string;
	class?:string;
	name?:string;
	value?:string;
	size?:Size;
	radius?:Radius;
	placeholder?:string;
	autocomplete?:FullAutoFill;
	readonly?:boolean;
    disabled?:boolean;
	maxlength?:number;
	clearable?:boolean;
	head?:Snippet;
	ref?:{(el:HTMLElement):void};
	onchange?:{(value?:string):void};
	onkeypress?:{(code:string, key:string):void};
	onfocus?:{(e:FocusEvent):void};
	onblur?:{(e:FocusEvent):void};
}

</script>

<script lang="ts">
import { Popper, Input } from "$lib/index.js";
import Clock from "$lib/icons/Clock.svelte";
import TimePanel from "./TimePanel.svelte";

let {
	id,
    ref,
    head,
    name,
    class:className,
    value,
    size,
	radius,
    disabled,
	maxlength,
	clearable = true,
	readonly,
	placeholder,
	onfocus,
	onblur,
    onchange,
	onkeypress,
}:TimePickerProps = $props();

</script>

<Popper 
    class={{
        outline: "bg-white rounded-lg shadow-outline-lg",
        content: "bg-inherit rounded-lg",
        arrow: "bg-inherit shadow-outline-lg",
    }}
    trigger="toggle"
    placement="bottomStart"
    useArrow={true}
>
    {#snippet target(popperRef)}
        <Input
            id={id}
            ref={(el:HTMLElement) => {
                ref?.(el), popperRef(el);
            }}
            class={twMerge(" w-48", className)}
            type="text"
            value={value}
            head={head}
            size={size}
            radius={radius}
            readonly={false}
            clearable={clearable}
            placeholder={value ? value : placeholder}
            onchange={onchange}
            onkeypress={onkeypress}
            onfocus={onfocus}
            onblur={onfocus}
        >
            {#snippet tail()}
                <Clock/>
            {/snippet}
        </Input>
    {/snippet}

    <TimePanel value="12:03:06"/>
</Popper>
