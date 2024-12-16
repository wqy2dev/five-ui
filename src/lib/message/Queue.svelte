<script lang="ts" module>
import Message, { type MessageOption } from "./Message.svelte";

export type MessageInstance = {
    push: {(option:MessageOption):number};
    destory: {(id:number):void};
}

</script>

<script lang="ts">
import { onMount } from "svelte";
import { twMerge } from "tailwind-merge";
import { Store, type MessagePayload } from "./store.js";

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

onMount(() => {
    store.subscribe(q => {
        queue = q;
    });
});

$effect(() => {
    store.limit(max);
});

</script>

{#if queue}
    <div
        id={id}
        class={twMerge("fixed left-0 top-5 z-50 w-full pointer-events-none", className)}
    >
        {#each queue as item (item.id)}
            <Message 
                {...item.option}
                onclose={() => {
                    destory(item.id), item.option.onclose?.();
                }}
            />
        {/each}
    </div>
{/if}
