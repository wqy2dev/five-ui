<script lang="ts">
import Button from "$lib/button/Button.svelte";
import Space from "$lib/space/Space.svelte";

const sizes = ["xs","sm", "md", "lg", "xl"];

</script>

<svelte:head>
    <title>Space</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Space
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Default (Layout: Col)
</h4>

<div class="flex flex-row gap-5">
    <Space>
        <Button> B1 </Button>
        <Button> B2 </Button>
        <Button> B3 </Button>
    </Space>
</div>


<h4 class="my-5 text-base indent-2 bg-slate-100">
    Layout: Col
</h4>

<div class="flex flex-row gap-5">
    <Space layout="col">
        <Button> M1 </Button>
        <Button> M2 </Button>
        <Button> M3 </Button>
    </Space>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Size
</h4>

<div class="flex flex-col gap-5">
{#each sizes as size}
    <div>{size}</div>
    <Space size={size as any}>
        <Button> G1 </Button>
        <Button> G2 </Button>
        <Button> G3 </Button>
    </Space>
{/each}
</div>
