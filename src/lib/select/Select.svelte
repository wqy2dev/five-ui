<script lang="ts" module>
import { getContext, onMount, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { type InputProps } from "$lib/input/Input.svelte";
import { type FormFieldContext } from "$lib/form/FormField.svelte";
import { Search } from "$lib/icons/index.js";
import { Popper, Input, Menu, MenuItem } from "$lib/index.js";
import SelectInput from "./SelectInput.svelte";

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
    width?:number|string;
    placeholder?:string;
    disabled?:boolean;
    options?:SelectOption[];
    optionsClass?:string;
    searchProps?:InputProps;
    searchable?:boolean;
    empty?:Snippet;
    head?:Snippet;
    // custom option render
    option?:Snippet<[SelectOption]>;
    children?:Snippet;
    onchange?:{(value?:string|number):void};
}

</script>

<script lang="ts">
let {
    id,
    class:className,
    name,
    value,
    width = "320px",
    optionsClass,
    disabled,
    placeholder,
    searchable,
    searchProps,
    options = [],
    option:optionRender,
    empty,
    head,
    ref:elRef,
    onchange,
}:SelectProps = $props();

const fieldContext = getContext<FormFieldContext>("formField");
if(fieldContext) {
    name = fieldContext.name;
    value = fieldContext.value;
    onchange = fieldContext.onchange;
}

let overflowRef:HTMLElement;

// popper hide strategy
function strategy(targetEl:HTMLElement, floatEl:HTMLElement) {
    if(!floatEl.contains(targetEl)) {
        return true;
    }
    return overflowRef.contains(targetEl) && targetEl.tagName === "BUTTON";
}

let selected = $state({label:"", value});

function onselect(value?:string|number, label?:string) {
    if(label && value) {
        selected = {label, value};
    }
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

</script>

{#if disabled}
    <SelectInput 
        ref={(el:HTMLElement) => {
            elRef && elRef(el);
        }}
        {...selected}
        {...{
            id,
            name, 
            head,
            width,
            disabled,
            placeholder,
            class:className,
        }}
    />
{:else}
    <Popper 
        class={{
            outline: "bg-white rounded-lg shadow-outline-lg",
            content: "bg-inherit rounded-lg",
            arrow: "bg-inherit shadow-outline-lg",
        }}
        trigger="toggle"
        placement="bottom"
        strategy={strategy}
        useArrow={true}
    >
        {#snippet target(ref)}
            <SelectInput 
                ref={(el:HTMLElement) => {
                    ref(el), elRef && elRef(el);
                }}
                {...selected}
                {...{
                    id,
                    name, 
                    head,
                    width,
                    disabled,
                    placeholder,
                    class:className,
                }}
            />
        {/snippet}

        <div
            class="p-1"
            style:width={width}
        >
            {#if searchable}
                <div class="pb-1">
                    <Input
                        {...searchProps}
                    >
                        {#snippet tail()}
                            <Search size={15}/>
                        {/snippet}
                    </Input>
                </div>
            {/if}

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
