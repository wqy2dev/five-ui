<script lang="ts">
import { Breadcrumb, BreadcrumbItem } from "$lib/index.js";

</script>

<svelte:head>
	<title>Breadcrumb</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Breadcrumb
</h2>

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
