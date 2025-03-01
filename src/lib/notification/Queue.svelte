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

let topEl:HTMLElement;
let topStartEl:HTMLElement;
let topEndEl:HTMLElement;
let bottomEl:HTMLElement;
let bottomStartEl:HTMLElement;
let bottomEndEl:HTMLElement;

function mount(node:HTMLElement, { placement }: { placement:Placement } ) {
    document.body.appendChild(node);

    switch(placement) {
        case "top":
            topEl = node;
            break;
        case "topStart":
            topStartEl = node;
            break;
        case "topEnd":
            topEndEl = node;
            break;
        case "bottom":
            bottomEl = node;
            break;
        case "bottomStart":
            bottomStartEl = node;
            break;
        case "bottomEnd":
            bottomEndEl = node;
            break;
    }

    return {
        update: () => {

        },
        destory: () => {
            document.body.removeChild(node);
        }
    }
}

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

    return () => {
        try {
            if(document.body.contains(topEl)) {
                document.body.removeChild(topEl);
            }

            if(document.body.contains(topStartEl)) {
                document.body.removeChild(topStartEl);
            }

            if(document.body.contains(topEndEl)) {
                document.body.removeChild(topEndEl);
            }
    
            if(document.body.contains(bottomEl)) {
                document.body.removeChild(bottomEl);
            }

            if(document.body.contains(bottomStartEl)) {
                document.body.removeChild(bottomStartEl);
            }

            if(document.body.contains(bottomEndEl)) {
                document.body.removeChild(bottomEndEl);
            }
        } catch {

        }
    }
});

$effect(() => {
    store.limit(max);
});

</script>

{#if topList.length > 0}
    <div 
        class="fixed left-2 right-2 top-2 pointer-events-none box-border"
        use:mount={{ placement: "top" }}
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
        class="fixed left-2 right-2 top-2 pointer-events-none box-border"
        use:mount={{ placement: "topStart" }}
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
        class="fixed left-2 right-2 top-2 pointer-events-none box-border"
        use:mount={{ placement: "topEnd" }}
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
        class="fixed left-2 right-2 bottom-2 pointer-events-none box-border"
        use:mount={{ placement: "bottom" }}
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
        class="fixed left-2 right-2 bottom-2 pointer-events-none box-border"
        use:mount={{ placement: "bottomStart" }}
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
        class="fixed left-2 right-2 bottom-2 pointer-events-none box-border"
        use:mount={{ placement: "bottomEnd" }}
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
