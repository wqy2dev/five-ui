<script lang="ts">
    import Button from "$lib/button/Button.svelte";
import { List } from "$lib/index.js";
</script>

<svelte:head>
	<title>List</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    List
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<List
    data={[
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
    ]}
>

</List>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Bordered
</h4>

<List
    bordered
    data={[
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
    ]}
>

</List>


<h4 class="my-5 text-base indent-2 bg-slate-100">
    Action
</h4>

<List
    bordered
    data={[
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
    ]}
>
    {#snippet action(i, item)}
        <Button variant="primary" size="xs"> 查看 </Button>
        <Button variant="danger" size="xs"> 删除 </Button>
    {/snippet}
</List>


<h4 class="my-5 text-base indent-2 bg-slate-100">
    Render
</h4>

<List
    bordered
    data={[
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
    ]}
>
    {#snippet render(i, item)}
        <div class="flex flex-row">
            <div class="w-28">编号: {i}</div>
            <div> {item} </div>
        </div>
    {/snippet}
</List>


<h4 class="my-5 text-base indent-2 bg-slate-100">
    Header & Footer
</h4>

<List
    bordered
    data={[
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
        "SvelteKit is a framework for rapidly developing robust, performant web applications using Svelte.",
    ]}
>
    {#snippet render(i, item)}
        <div class="flex flex-row">
            <div class="w-28">编号: {i}</div>
            <div> {item} </div>
        </div>
    {/snippet}

    {#snippet action(i, item)}
        <Button variant="primary" size="xs"> 查看 </Button>
        <Button variant="danger" size="xs"> 删除 </Button>
    {/snippet}

    {#snippet header()}
        SvelteKit
    {/snippet}

    {#snippet footer()}
        Footer
    {/snippet}
</List>
