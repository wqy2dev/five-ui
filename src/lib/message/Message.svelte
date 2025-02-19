<script lang="ts" module>
import { onMount, type Snippet } from "svelte";

export type MessageOption = {
    message:string|Snippet;
    variant?:"success"|"error"|"warn"|"info"|"loading";
    duration?:number;
    closable?:boolean;
    onclose?:{():void};
}

</script>

<script lang="ts">
import { slide } from "svelte/transition";
import { InfoCircleSolid, SuccessCircleSolid, ErrorCircleSolid, WarnCircleSolid, Close } from "$lib/icons/index.js";

let {
    variant = "info",
    duration = 5000,
    closable = false,
    onclose,
    message,
}:MessageOption = $props();

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
    aria-label="Message"
    class="w-full py-1 mp-1 z-50 flex justify-center bg-transparent"
    transition:slide
>
    <div class="flex flex-row items-center shadow-outline-md text-sm rounded-lg px-3 py-2 bg-white pointer-events-auto">
        <span class="mr-2">
            {#if variant === "info"}
                <InfoCircleSolid size={20} class="text-primary-600"/>
            {:else if variant === "success"}
                <SuccessCircleSolid size={20} class="text-green-600"/>
            {:else if variant === "warn"}
                <WarnCircleSolid size={20} class="text-yellow-600"/>
            {:else if variant === "error"}
                <ErrorCircleSolid size={20} class="text-red-600"/>
            {/if}
        </span>
    
        <span>
            {#if typeof message === "string"}
                {message}
            {:else}
                {@render message()}
            {/if}
        </span>

        {#if closable}
            <button
                class="flex items-center ml-3 text-slate-400"
                onclick={handleClose}
            >
                <Close size={15}/>
            </button>
        {/if}
    </div>
</div>
