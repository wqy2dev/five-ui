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

const ctr:Record<string, HTMLElement|null> = {};

function portal(name:Exclude<Placement, undefined>):HTMLElement {
    if(name in ctr && ctr[name]) {
        return ctr[name];
    }

    const el = document.createElement("div");
    el.className = "fixed left-2 right-2 pointer-events-none box-border ";

    if(name.slice(0, 3) === "top") {
        el.className += "top-2";
    } else {
        el.className += "bottom-2";
    }

    return document.body.appendChild(el), ctr[name] = el;
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

let queue = $state<MessagePayload<NotificationOption>[]>([]);

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

function mount(node:HTMLElement, placement:Placement) {
    portal(placement!).appendChild(node);
}

onMount(() => {
    store.subscribe(q => {
        queue = q;
    });

    return () => {
        try {
            for(let name in ctr) {
                document.body.removeChild(ctr[name]!), ctr[name] = null;
            }
        } catch {

        }
    }
});

$effect(() => {
    store.limit(max);
});

</script>

{#each queue as item (item.id)}
    {@const { onclose, placement = "bottomEnd", ...restProps } = item.option}
    <div
        class={variants({placement})}
        transition:fade
        use:mount={placement}
    >
        <Notification 
            {...restProps}
            onclose={() => {
                destory(item.id), onclose?.();
            }}
        />
    </div>
{/each}
