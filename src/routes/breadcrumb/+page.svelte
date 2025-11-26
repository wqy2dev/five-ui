<script lang="ts">
import { Breadcrumb, BreadcrumbItem } from "$lib/index.ts";

</script>

<svelte:head>
	<title>Breadcrumb</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Breadcrumb
</h2>

<h4 class="text-base indent-2 bg-slate-100 my-3">
    Default
</h4>

<div>
    <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Goods</BreadcrumbItem>
        <BreadcrumbItem>Order</BreadcrumbItem>
    </Breadcrumb>
</div>

<div>
    <Breadcrumb
        separator=">"
    >
        <BreadcrumbItem href="/breadcrumb#">Home</BreadcrumbItem>
        <BreadcrumbItem href="/breadcrumb#">Goods</BreadcrumbItem>
        <BreadcrumbItem>Order</BreadcrumbItem>
    </Breadcrumb>
</div>
