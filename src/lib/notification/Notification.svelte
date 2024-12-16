<script lang="ts" module>
import { type VariantProps, tv } from "tailwind-variants";
import { onMount, type Snippet } from "svelte";

const notificationVariants = tv({
    base: "flex flex-row shadow-outline-md rounded-lg px-3 py-2 bg-white",
    variants: {
        placement: {
            top: {
                base: "items-center",
            },
            topStart: {
                base: "items-start",
            },
            topEnd: {
                base: "items-end",
            },
            bottom: {
                base: "items-center",
            },
            bottomStart: {
                base: "items-start",
            },
            bottomEnd: {
                base: "items-end",
            }
        },

    },
    defaultVariants: {
        placement: "bottomEnd",
    },
});

type Placement = VariantProps<typeof notificationVariants>["placement"];

export type NotificationOption = {
    title:string;
    content:string|Snippet;
    variant?:"success"|"error"|"warn"|"info";
    placement?:Placement;
    duration?:number;
    onclose?:{():void};
}

</script>

<script lang="ts">
import { InfoCircleSolid, SuccessCircleSolid, ErrorCircleSolid, WarnCircleSolid, Close } from "$lib/icons/index.js";

let {
    title,
    content,
    variant = "info",
    placement,
    duration = 5000,
    onclose,
}:NotificationOption = $props();

let timerId:number;

function handleClose() {
    if(timerId) {
        clearTimeout(timerId);
    }
    onclose?.();
}

onMount(() => {
    if(duration && duration > 0){ 
        timerId = setTimeout(() => {
            onclose?.();
        }, duration);
    }
});

</script>

<div class={notificationVariants({placement})}>
    <div class="mr-2 shrink-0">
        {#if variant === "info"}
            <InfoCircleSolid size={24} class="text-primary-600"/>
        {:else if variant === "success"}
            <SuccessCircleSolid size={24} class="text-green-600"/>
        {:else if variant === "warn"}
            <WarnCircleSolid size={24} class="text-yellow-600"/>
        {:else if variant === "error"}
            <ErrorCircleSolid size={24} class="text-red-600"/>
        {/if}
    </div>
    <div class="grow">
        <div class="flex flex-row">
            <div class="grow text-base text-slate-900">
                {title}
            </div>

            <button
                class="flex items-center ml-3 text-slate-400"
                onclick={handleClose}
            >
                <Close size={16}/>
            </button>
        </div>
        <div class="text-sm text-slate-600 leading-5">
            {#if typeof content === "string"}
                {content}
            {:else}
                {@render content()}
            {/if}
        </div>
    </div>
</div>
