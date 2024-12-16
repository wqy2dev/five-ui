<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";
import Notification, { type NotificationProps } from "./Notification.svelte";

const variants = tv({
    base: "flex w-full",
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

const ctr:Record<string, HTMLElement> = {};

function container(name:Exclude<Placement, undefined>):HTMLElement {
    if(name in ctr) {
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

type Placement = VariantProps<typeof variants>["placement"];

type NotificationOption = NotificationProps & {
    placement?:Placement;
}

export type NotificationInstance = {
    push: {(option:NotificationOption):number};
    destory: {(id:number):void};
}

</script>

<script lang="ts">
import { onMount } from "svelte";
import { Store, type MessagePayload } from "../message/store.js";
    import { slide } from "svelte/transition";

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

function mount(node:HTMLElement, placement:Placement) {
    container(placement!).appendChild(node);
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

{#each queue as item (item.id)}
    {@const { onclose, placement, ...resetProps } = item.option}
    <div
        class={variants({placement})}
        use:mount={placement}
        transition:slide
    >
        <Notification 
            {...resetProps}
            onclose={() => {
                destory(item.id), onclose?.();
            }}
        />
    </div>
{/each}
