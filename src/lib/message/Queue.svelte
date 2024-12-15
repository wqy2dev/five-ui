<script lang="ts" module>

export type MessageInstance = {
    push: {(msg:string, option?:MessageOption):number};
    remove: {(id:number):void};
}

</script>

<script lang="ts">
import { onMount } from "svelte";
import { twMerge } from "tailwind-merge";
import { Controller, type MessageOption, type MessagePayload } from "./controller.js";
import Message from "./Message.svelte";

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

let queue = $state<MessagePayload[]>([]);

const ctrol = new Controller(max);

export function push(msg:string, option?:MessageOption) {
    return ctrol.push(msg, option);
}

export function remove(id:number) {
    ctrol.remove(id);
}

onMount(() => {
    ctrol.subscribe(q => {
        queue = q;
    });
});

</script>

{#if queue}
    <div
        id={id}
        class={twMerge("fixed left-0 top-5 w-full", className)}
    >
        {#each queue as item (item.id)}
            <Message 
                {...item.option}
                onclose={() => {
                    remove(item.id), item.option?.onclose?.();
                }}
            >
                {item.message}
            </Message>
        {/each}
    </div>
{/if}
