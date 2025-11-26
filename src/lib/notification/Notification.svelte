<script lang="ts" module>
import { onMount, type Snippet } from "svelte";

export interface NotificationProps {
    title:string;
    content:string|Snippet;
    variant?:"success"|"error"|"warn"|"info";
    duration?:number;
    onclose?:{():void};
}

</script>

<script lang="ts">
import { InfoCircleSolid, SuccessCircleSolid, ErrorCircleSolid, WarnCircleSolid, Close } from "$lib/icons/index.ts";

let {
    title,
    content,
    variant = "info",
    duration = 5000,
    onclose,
}:NotificationProps = $props();

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

<div 
    class="flex flex-row w-96 shadow-outline-lg rounded-md p-3 bg-white pointer-events-auto"
>
    <div class="mr-2 shrink-0">
        {#if variant === "info"}
            <InfoCircleSolid size={26} class="text-primary-600"/>
        {:else if variant === "success"}
            <SuccessCircleSolid size={26} class="text-green-600"/>
        {:else if variant === "warn"}
            <WarnCircleSolid size={26} class="text-yellow-600"/>
        {:else if variant === "error"}
            <ErrorCircleSolid size={26} class="text-red-600"/>
        {/if}
    </div>
    <div class="grow">
        <div class="flex flex-row">
            <div class="grow text-base text-slate-700">
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
