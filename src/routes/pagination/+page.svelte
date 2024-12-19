<script lang="ts">
import { Pagination } from "$lib/index.js";

</script>
<svelte:head>
    <title>Pagination</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Pagination
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<Pagination pages={20}/>