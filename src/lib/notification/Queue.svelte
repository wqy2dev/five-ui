<script lang="ts" module>
import Notification, { type NotificationOption } from "./Notification.svelte";

export type NotificationInstance = {
    push: {(msg:string, option?:NotificationOption):number};
    remove: {(id:number):void};
}

</script>

<script lang="ts">
import { onMount } from "svelte";
import { twMerge } from "tailwind-merge";
import { Store, type MessagePayload } from "../message/store.js";

type NotificationProps = {
    id?:string;
    class?:string;
    max?:number;
}

const {
    id,
    class:className,
    max = 0,
}:NotificationProps = $props();

let queue = $state<MessagePayload<any>[]>([]);

const store = new Store(max);

export function push(option:NotificationOption) {
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
            <Notification 
                {...item.option}
                onclose={() => {
                    destory(item.id), item.option.onclose?.();
                }}
            />
        {/each}
    </div>
{/if}
