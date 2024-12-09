
<script lang="ts">
import { onMount } from "svelte";
import { type Radius, type Size, default as Avatar } from "./Avatar.svelte";

type AvatarGroupItem = {
    text?:string;
    image?:string;
    alt?:string;
    style?:string;
}

type AvatarGroupProps = {
    id?:string;
    class?:string;
    ref?:{(el:HTMLElement):void};
    size?:Size;
    radius?:Radius;
    limit?:number;
    source?:AvatarGroupItem[];
    avatarStyle?:string;
}

let {
    id,
    ref,
    size,
    radius,
    avatarStyle,
    limit = 0,
    source = [],
    class:className = "",
}:AvatarGroupProps = $props();

let el:HTMLElement;

onMount(() => {
    ref?.(el);
});

const data = source ? (limit > 0 ? source.slice(0, limit) : source) : [];
const rest = source.length - limit;

</script>

<div 
    bind:this={el}
    id={id}
    class={"flex flex-row"+(className === "" ? "":" "+className)}
>
    {#each data as item, i}
        <Avatar
            class={i>0 ? "-ml-2":undefined}
            image={item.image}
            alt={item.alt}
            style={item.style}
            size={size}
            radius={radius}
            bordered={true}
        >
            {item.text}
        </Avatar>
    {/each}

    {#if rest > 0}
    <Avatar
        class="-ml-2"
        style={avatarStyle}
        size={size}
        radius={radius}
        bordered={true}
    >
        +{rest}
    </Avatar>
    {/if}
</div>
