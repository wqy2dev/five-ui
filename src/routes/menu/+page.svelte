<script lang="ts">
import { Menu, MenuItem, MenuGroup } from "$lib/index.js";
</script>

<svelte:head>
	<title>Menu</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Menu
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>
<Menu>
    <MenuGroup title="Action">
        <MenuItem>New</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Export</MenuItem>
        <MenuItem>Import</MenuItem>
    </MenuGroup>
    <MenuItem>Copy</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Export</MenuItem>
    <MenuItem>Import</MenuItem>
</Menu>
