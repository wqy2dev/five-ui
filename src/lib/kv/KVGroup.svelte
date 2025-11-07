<script lang="ts" module>
import { getContext, onMount, type Snippet } from "svelte";
import type { FormFieldContext } from "$lib/form/FormField.svelte";
import KV, { type Radius, type Size} from "$lib/kv/KV.svelte";
    import Button from "$lib/button/Button.svelte";

export type KVGroupProps = {
    class?: {
        base?:string;
        k?:string;
        v?:string;
    };
    placeholder?:{
        k?:string;
        v?:string;
    };
    maxlength?:{
        k?:number;
        v?:number;
    };
	value?:{
        k:string,
        v:string
    }[];
    size?:Size;
    radius?:Radius;
    separator?:Snippet|string;
    empty?:Snippet|string;
	onchange?:{(value:any):void};
}

export type KVGroupInstance = {
    add: {():void};
}

type InnerKV = {
    k:string;
    v:string;
    key:number;
}

function unique() {
    return Math.floor(Math.random() * 10000000000);
}

</script>

<script lang="ts">

let {
    class:className,
    value = [],
    placeholder,
    maxlength,
    size = "md",
    radius,
    separator,
    empty = "Click to add KV",
    onchange,
}:KVGroupProps = $props();

const fieldContext = getContext<FormFieldContext>("formField");
if(fieldContext) {
    value = [], onchange = fieldContext.onchange;

    if(fieldContext.value instanceof Array) {
        value = fieldContext.value;
    }
}

let values = $state<InnerKV[]>([]);

function onChange(key:number, value:{k:string, v:string}) {
    values = values.map<InnerKV>(r => {
        if(r.key === key) {
            return {k: value.k, v: value.v, key};
        }
        return r;
    });
}

function onDelete(key:number) {
    values = values.filter(v => v.key !== key);
}

// Add KV input 
export function add() {
    values = values.concat([{k:"", v:"", key:unique()}]);
}

$effect(() => {
    onchange?.(values.map(value => {
        return {
            k:value.k,
            v:value.v,
        }
    }));
});

onMount(() => {
    let initValues:InnerKV[] = [];
    value.forEach(v => {
        initValues.push({...v, key:unique()});
    });
    values = initValues;
});

</script>

{#if values.length > 0}
<div class="flex flex-col gap-3">
    {#each values as value (value.key)}
        <KV
            class={className}
            key={value.key}
            value={{
                k:value.k,
                v:value.v,
            }}
            size={size}
            radius={radius}
            maxlength={maxlength}
            separator={separator}
            placeholder={placeholder}
            onchange={onChange}
            ondelete={onDelete}
        />
    {/each}
</div>
{:else if empty}
    {#if typeof empty === "string"}
        <div class="w-full h-fit py-5 text-slate-600 text-center text-sm">
            <Button variant="flat" onclick={add}>
                {empty}
            </Button>
        </div>
    {:else}
        {@render empty()}
    {/if}
{/if}
