<script lang="ts" module>
import { type Snippet } from "svelte";
import { type VariantProps, tv } from "tailwind-variants";
import { Minus } from "$lib/icons/index.js";

const inputVariants = tv({
	slots: {
        base: "w-fit flex flex-row gap-2 items-center",
		input: "shrink-0 h-full text-sm text-slate-700 disabled:text-slate-400 placeholder:text-slate-400 cursor-inherit outline-none px-2 bg-white border border-solid border-slate-200 overflow-hidden transition-all",
        separator: "text-slate-400 text-sm",
	},
	variants: {
		disabled:{
			true: {
				input: "cursor-not-allowed bg-slate-50",
			}
		},
		focus: {
			true: {
				input: "ring ring-primary-100 border-primary-600",
			},
		},
		size: {
			sm: {
				base: "h-8 leading-8",
                input: "leading-8",
			},
			md: {
				base: "h-9 leading-9",
                input: "leading-9",
			},
			lg: {
				base: "h-10 leading-10",
                input: "leading-10",
			},
		},
		radius: {
            full: {
				input: "rounded-full",
			},
            sm: {
				input: "rounded-sm",
			},
            md: {
				input: "rounded-md",
			},
            lg: {
				input: "rounded-lg",
			},
            xl: {
				input: "rounded-xl",
			},
            none: {

			},
        },
        width: {
            k: {
                input: "w-50",
            },
            v: {
                input: "grow",
            },
        }
	},
	defaultVariants: {
		size: "md",
		radius: "md",
        disabled: false,
        focus: false,
	},
});

export type Size = VariantProps<typeof inputVariants>["size"];
export type Radius = VariantProps<typeof inputVariants>["radius"];

export enum KVType {
    Key = "key",
    Value = "value",
}

export type KVProps = {
	class?: {
        base?:string;
        k?:string;
        v?:string;
    };
	value?:{
        k?:string;
        v?:string;
    };
    key:any;
	size?:Size;
	radius?:Radius;
    separator?:Snippet|string;
	placeholder?:{
        k?:string;
        v?:string;
    };
    maxlength?:{
        k?:number;
        v?:number;
    };
    disabled?:boolean;
	onchange?:{(index:number, value:{k:string, v:string}):void};
    ondelete?:{(index:number):void};
}

</script>

<script lang="ts">

let {
    class:className,
    value = {k: "", v: ""},
    key,
    size,
	radius,
    disabled,
	maxlength = {},
    placeholder = {},
    separator = "=",
    onchange,
    ondelete,
}:KVProps = $props();

let {k, v} = value;
let kValue = $state(k ?? "");
let vValue = $state(v ?? "");

let kFocus = $state(false);
let vFocus = $state(false);

function onFocus(e:FocusEvent, type:KVType) {
    if(!disabled) {
        let focus = e.type === "focus";
        
        if(type === KVType.Key) {
            kFocus = focus;
        } else if(type === KVType.Value) {
            vFocus = focus;
        }
    }
}

function onChange(e:Event & {currentTarget: EventTarget & HTMLInputElement}, type:KVType) {
	let v = e.currentTarget.value;

    if(maxlength) {
        if(type === KVType.Key) {
            if(typeof maxlength.k === "number" && v.length > maxlength.k) {
		        v = v.slice(0, maxlength.k), kValue = v;
            }
        } else {
            if(typeof maxlength.v === "number" && v.length > maxlength.v) {
                v = v.slice(0, maxlength.v), vValue = v;
            }
        }
    }

	onchange?.(key, {k:kValue, v:vValue});
}

function onDelete(_:Event) {
    ondelete?.(key);
}

const {
	base,
	input,
} = inputVariants({size, radius, disabled});

</script>

<div
	role="form"
	class={base({className:className?.base})}
>
	<input
        bind:value={kValue}
        type="text"
        class={input({focus:kFocus, className:className?.k, width:"k"})}
		maxlength={maxlength?.k}
        placeholder={placeholder?.k}
		disabled={disabled}
        autocomplete="off"
		onfocus={e => onFocus(e, KVType.Key)}
		onblur={e => onFocus(e, KVType.Key)}
		oninput={e => onChange(e, KVType.Key)}
	/>

    {#if typeof separator === "string"}
        <span >{separator}</span>
    {:else if separator}
        {@render separator()}
    {/if}

    <input
        bind:value={vValue}
        type="text"
        class={input({focus:vFocus, className:className?.v, width:"v"})}
		maxlength={maxlength?.v}
        placeholder={placeholder?.v}
		disabled={disabled}
        autocomplete="off"
        onfocus={e => onFocus(e, KVType.Value)}
		onblur={e => onFocus(e, KVType.Value)}
		oninput={e => onChange(e, KVType.Value)}
	/>

    <button
        type="button"
        onmouseup={onDelete}
    >
        <Minus size={14}/>
    </button>
</div>
