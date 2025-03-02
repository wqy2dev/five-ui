<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";
import Notification, { type NotificationProps } from "./Notification.svelte";

const variants = tv({
    base: "flex w-full z-40",
    variants: {
        placement: {
            top: "justify-center mb-3",
            topStart: "justify-start mb-3",
            topEnd: "justify-end mb-3",
            bottom: "justify-center mt-3",
            bottomStart: "justify-start mt-3",
            bottomEnd: "justify-end mt-3",
        },
    },
    defaultVariants: {
        placement: "bottomEnd",
    },
});

type Placement = VariantProps<typeof variants>["placement"];

type NotificationOption = NotificationProps & {
    placement?:Placement;
}

export type NotificationInstance = {
    push: {(option:NotificationOption):number};
    destory: {(id:number):void};
    clear: {():void};
}

</script>

<script lang="ts">
import { onMount } from "svelte";
import { Store, type MessagePayload } from "../message/store.js";
import { fade } from "svelte/transition";

const {
    max = 0,
}:{
    max?:number;
} = $props();

let topList = $state<MessagePayload<NotificationOption>[]>([]);
let topStartList = $state<MessagePayload<NotificationOption>[]>([]);
let topEndList = $state<MessagePayload<NotificationOption>[]>([]);
let bottomList = $state<MessagePayload<NotificationOption>[]>([]);
let bottomStartList = $state<MessagePayload<NotificationOption>[]>([]);
let bottomEndList = $state<MessagePayload<NotificationOption>[]>([]);

const store = new Store<NotificationOption>(max);

export function push(option:NotificationOption) {
    return store.push(option);
}

export function destory(id:number) {
    store.destory(id);
}

export function clear() {
    store.clear();
}

let topEl:HTMLElement|null = $state(null);
let topStartEl:HTMLElement|null  = $state(null);
let topEndEl:HTMLElement|null  = $state(null);
let bottomEl:HTMLElement|null  = $state(null);
let bottomStartEl:HTMLElement|null = $state(null);
let bottomEndEl:HTMLElement|null = $state(null);

onMount(() => {
    store.subscribe(items => {
        const t:MessagePayload<NotificationOption>[] = [];
        const tS:MessagePayload<NotificationOption>[] = [];
        const tE:MessagePayload<NotificationOption>[] = [];
        const b:MessagePayload<NotificationOption>[] = [];
        const bS:MessagePayload<NotificationOption>[] = [];
        const bE:MessagePayload<NotificationOption>[] = [];

        items.forEach(item => {
            switch(item.option.placement ?? "bottomEnd") {
                case "top":
                    t.push(item);
                    break;
                case "topStart":
                    tS.push(item);
                    break;
                case "topEnd":
                    tE.push(item);
                    break;
                case "bottom":
                    b.push(item);
                    break;
                case "bottomStart":
                    bS.push(item);
                    break;
                case "bottomEnd":
                    bE.push(item);
                    break;
            }
        });

        topList = t;
        topStartList = tS;
        topEndList = tE;
        bottomList = b;
        bottomStartList = bS;
        bottomEndList = bE;
    });
});

$effect(() => {
    store.limit(max);
});

$effect(() => {
    if(topEl) {
        document.body.appendChild(topEl);
    }

    return () => {
        if(topEl && topEl.parentNode) {
            topEl.parentNode.removeChild(topEl);
        }
    }
});

$effect(() => {
    if(topStartEl) {
        document.body.appendChild(topStartEl);
    }

    return () => {
        if(topStartEl && topStartEl.parentNode) {
            topStartEl.parentNode.removeChild(topStartEl);
        }
    }
});

$effect(() => {
    if(topEndEl) {
        document.body.appendChild(topEndEl);
    }

    return () => {
        if(topEndEl && topEndEl.parentNode) {
            topEndEl.parentNode.removeChild(topEndEl);
        }
    }
});


$effect(() => {
    if(bottomEl) {
        document.body.appendChild(bottomEl);
    }

    return () => {
        if(bottomEl && bottomEl.parentNode) {
            bottomEl.parentNode.removeChild(bottomEl);
        }
    }
});

$effect(() => {
    if(bottomStartEl) {
        document.body.appendChild(bottomStartEl);
    }

    return () => {
        if(bottomStartEl && bottomStartEl.parentNode) {
            bottomStartEl.parentNode.removeChild(bottomStartEl);
        }
    }
});

$effect(() => {
    if(bottomEndEl) {
        document.body.appendChild(bottomEndEl);
    }

    return () => {
        if(bottomEndEl && bottomEndEl.parentNode) {
            bottomEndEl.parentNode.removeChild(bottomEndEl);
        }
    }
});

</script>

{#if topList.length > 0}
    <div
        bind:this={topEl}
        class="fixed left-2 right-2 top-2 pointer-events-none box-border"
    >
        {#each topList as item (item.id)}
            {@const { onclose, ...restProps } = item.option}

            <div
                class={variants({placement: "top"})}
                transition:fade
            >
                <Notification 
                    {...restProps}
                    onclose={() => {
                        destory(item.id), onclose?.();
                    }}
                />
            </div>
        {/each}
    </div>
{/if}

{#if topStartList.length > 0}
    <div
        bind:this={topStartEl}
        class="fixed left-2 right-2 top-2 pointer-events-none box-border"
    >
        {#each topStartList as item (item.id)}
            {@const { onclose, ...restProps } = item.option}

            <div
                class={variants({placement: "topStart"})}
                transition:fade
            >
                <Notification 
                    {...restProps}
                    onclose={() => {
                        destory(item.id), onclose?.();
                    }}
                />
            </div>
        {/each}
    </div>
{/if}

{#if topEndList.length > 0}
    <div
        bind:this={topEndEl}
        class="fixed left-2 right-2 top-2 pointer-events-none box-border"
    >
        {#each topEndList as item (item.id)}
            {@const { onclose, ...restProps } = item.option}

            <div
                class={variants({placement: "topEnd"})}
                transition:fade
            >
                <Notification 
                    {...restProps}
                    onclose={() => {
                        destory(item.id), onclose?.();
                    }}
                />
            </div>
        {/each}
    </div>
{/if}

{#if bottomList.length > 0}
    <div
        bind:this={bottomEl}
        class="fixed left-2 right-2 bottom-2 pointer-events-none box-border"
    >
        {#each bottomList as item (item.id)}
            {@const { onclose, ...restProps } = item.option}
            <div
                class={variants({placement: "bottom"})}
                transition:fade
            >
                <Notification 
                    {...restProps}
                    onclose={() => {
                        destory(item.id), onclose?.();
                    }}
                />
            </div>
        {/each}
    </div>
{/if}

{#if bottomStartList.length > 0}
    <div
        bind:this={bottomStartEl}
        class="fixed left-2 right-2 bottom-2 pointer-events-none box-border"
    >
        {#each bottomStartList as item (item.id)}
            {@const { onclose, ...restProps } = item.option}
            <div
                class={variants({placement: "bottomStart"})}
                transition:fade
            >
                <Notification 
                    {...restProps}
                    onclose={() => {
                        destory(item.id), onclose?.();
                    }}
                />
            </div>
        {/each}
    </div>
{/if}

{#if bottomEndList.length > 0}
    <div
        bind:this={bottomEndEl}
        class="fixed left-2 right-2 bottom-2 pointer-events-none box-border"
    >
        {#each bottomEndList as item (item.id)}
            {@const { onclose, ...restProps } = item.option}
            <div
                class={variants({placement: "bottomEnd"})}
                transition:fade
            >
                <Notification 
                    {...restProps}
                    onclose={() => {
                        destory(item.id), onclose?.();
                    }}
                />
            </div>
        {/each}
    </div>
{/if}
