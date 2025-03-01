<script lang="ts" module>
import Message, { type MessageOption } from "./Message.svelte";

export type MessageInstance = {
    push: {(option:MessageOption):number};
    destory: {(id:number):void};
    clear: {():void};
}

</script>

<script lang="ts">
import { onMount } from "svelte";
import { twMerge } from "tailwind-merge";
import { Store, type MessagePayload } from "./store.js";
    import { fly } from "svelte/transition";
    import { linear } from "svelte/easing";

type MessageProps = {
    id?:string;
    class?:string;
    max?:number;
}

const {
    id,
    class:className,
    max = 0,
}:MessageProps = $props();

let queue = $state<MessagePayload<MessageOption>[]>([]);

const store = new Store<MessageOption>(max);

export function push(option:MessageOption) {
    return store.push(option);
}

export function destory(id:number) {
    store.destory(id);
}

export function clear() {
    store.clear();
}

let el:HTMLElement;

function mount(node:HTMLElement) {
    el = node, document.body.appendChild(node);
}

onMount(() => {
    store.subscribe(q => {
        queue = q;
    });

    return () => {
        store.clear();

        if(document.body.contains(el)) {
            document.body.removeChild(el);
        }
    }
});

$effect(() => {
    store.limit(max);
});

</script>

{#if queue.length > 0}
<div
    id={id}
    class={twMerge("fixed left-0 top-6 z-40 w-full pointer-events-none", className)}
    transition:fly={{y: -24, easing: linear}}
    use:mount
>
    {#each queue as item (item.id)}
        {@const { onclose, ...restProps} = item.option}
        <Message 
            {...restProps}
            onclose={() => {
                destory(item.id), onclose?.();
            }}
        />
    {/each}
</div>
{/if}
