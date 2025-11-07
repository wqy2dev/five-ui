<script lang="ts" module>
import { getContext, onMount, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { type Size, type Radius } from "$lib/input/Input.svelte";
import { type FormFieldContext } from "$lib/form/FormField.svelte";
import { ChevronDown } from "$lib/icons/index.js";
import { Popper, Input, Menu, MenuItem } from "$lib/index.js";

export type SelectOption = {
    value:string|number;
    label:string;
    disabled?:boolean;
    extra?:any;
}

type SelectProps = {
    id?:string;
    ref?:{(el:HTMLElement):void};
    class?:string;
	name?:string;
	value?:string|number;
    disabled?:boolean;
    placeholder?:string;
    size?:Size;
    radius?:Radius
    options?:SelectOption[];
    optionsClass?:string;
    searchable?:boolean;
    clearable?:boolean;
    empty?:Snippet;
    head?:Snippet;
    tail?:Snippet;
    onsearch?:{(value?:string):void};
    onchange?:{(value?:string|number):void};
    onkeypress?:{(code:string):void};
    // option render snippet
    option?:Snippet<[SelectOption]>;
    children?:Snippet;
}

</script>

<script lang="ts">
let {
    id,
    ref:elRef,
    class:className,
    name,
    value,
    disabled,
    placeholder,
    searchable = false,
    clearable = true,
    options = [],
    option:optionRender,
    optionsClass,
    size,
    radius,
    head,
    tail:tailSnippet,
    empty,
    onsearch:onSearch,
    onchange,
    onkeypress,
}:SelectProps = $props();

const fieldContext = getContext<FormFieldContext>("formField");
if(fieldContext) {
    name = fieldContext.name;
    onchange = fieldContext.onchange;

    let t = typeof fieldContext.value;

	if(t === "string" || t === "number") {
        value = fieldContext.value;
    }
}

let overflowRef:HTMLElement;

// popper hide strategy
function when(targetEl:HTMLElement, floatEl:HTMLElement) {
    if(!floatEl.contains(targetEl)) {
        return true;
    }
    return overflowRef.contains(targetEl) && targetEl.tagName === "BUTTON";
}

let selected = $state<{
    label?:string,
    value?:string|number,
}>({label:"", value});

function onselect(value?:string|number, label?:string) {
    selected = {label, value};
}

let focused = $state(false);

function onfocus(e:FocusEvent) {
    focused = e.type === "focus";
}

function onsearch(value?:string) {
    if(value === "" || value === undefined) {
        selected = {label:undefined, value:undefined};

    }

    onSearch?.(value);
}

$effect(() => {
    onchange?.(selected.value);
});

onMount(() => {
    const t = typeof value;

    if(t === "string" || t === "number") {
        for(let i=0;i<options.length;i++) {
            if(options[i].value === value) {
                selected = {value:options[i].value, label:options[i].label};
                break;
            }
        }
    }
});

// fit width for options
let fitWidth = $state("");

</script>

{#snippet tail()}
    <ChevronDown size={15} class={`transition ${focused ? "rotate-180":""}`}/>
{/snippet}

{#if disabled}
    <Input
        id={id}
        ref={(el:HTMLElement) => {
            elRef && elRef(el);
        }}
        class={twMerge("w-80", className)}
        type="text"
        value={selected.label}
        head={head}
        tail={tailSnippet ?? tail}
        size={size}
        radius={radius}
        readonly={true}
        disabled={true}
        clearable={false}
        placeholder={placeholder}
    />
{:else}
    {@const ok = searchable && focused}

    <Popper 
        class={{
            outline: "bg-white rounded-lg shadow-outline-lg",
            content: "bg-inherit rounded-lg",
            arrow: "bg-inherit shadow-outline-lg",
        }}
        when={when}
        trigger="toggle"
        placement="bottom"
        useArrow={true}
    >
        {#snippet target(ref)}
            <Input
                id={id}
                ref={(el:HTMLElement) => {
                    ref(el), elRef?.(el), fitWidth = el.offsetWidth + "px";
                }}
                class={twMerge("w-80", searchable ? "cursor-text":"cursor-pointer", className)}
                type="text"
                value={ok ? "" : selected.label}
                head={head}
                tail={tailSnippet ?? tail}
                size={size}
                radius={radius}
                readonly={!searchable}
                clearable={clearable}
                placeholder={ok && selected.label !== "" ? selected.label : placeholder}
                onchange={onsearch}
                onkeypress={onkeypress}
                onfocus={onfocus}
                onblur={onfocus}
            />
        {/snippet}

        <div
            class="p-1 inline-block"
            style:min-width={fitWidth}
        >
            {#if options && options.length > 0}
                <Menu 
                    class={twMerge("max-h-56 overflow-y-auto overflow-x-hidden", optionsClass)}
                    oncommand={onselect}
                    value={selected.value}
                    stateful={true}
                    ref={ el => overflowRef = el }
                >
                    {#each options as option}
                        <MenuItem
                            value={option.value}
                            label={option.label}
                            disabled={option.disabled}
                        >
                            {#if optionRender}
                                {@render optionRender(option)}
                            {:else}
                                {option.label}
                            {/if}
                        </MenuItem>
                    {/each}
                </Menu>
            {:else}
                <div class="flex items-center justify-center py-5 text-sm text-slate-400">
                    {#if empty}
                        {@render empty()}
                    {:else}
                        Oh, empty data
                    {/if}
                </div>
            {/if}
        </div>
    </Popper>
{/if}

<input 
    type="hidden" 
    name={name}
    bind:value={selected.value}
/>
