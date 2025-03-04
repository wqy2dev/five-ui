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
import { fly } from "svelte/transition";
import { InfoCircleSolid, SuccessCircleSolid, ErrorCircleSolid, WarnCircleSolid, Close } from "$lib/icons/index.js";
    import { linear } from "svelte/easing";

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
    class="w-full mb-6 flex justify-center bg-transparent"
    transition:fly={{y: -24, easing: linear}}
>
    <div class="flex flex-row items-center shadow-outline-lg rounded-md p-2 bg-white pointer-events-auto">
        <span class="mr-1">
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
    
        <span class="text-slate-700 text-sm">
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
