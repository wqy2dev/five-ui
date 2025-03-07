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

<div class="w-full">
    <Menu class="shadow-outline-md">
        <MenuGroup title="Action">
            <MenuItem value="copy">Copy</MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
            <MenuItem value="export">Export</MenuItem>
            <MenuItem value="import">Import</MenuItem>
        </MenuGroup>
        <MenuItem value="Share" disabled>Copy</MenuItem>
        <MenuItem value="About">Delete</MenuItem>
    </Menu>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Trigger
</h4>

<div class="w-full">
    <Menu class="shadow-outline-md">
        <MenuGroup title="Action">
            <MenuItem value="copy">Copy</MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
            <MenuItem value="export">Export</MenuItem>
            <MenuItem value="import">Import</MenuItem>
        </MenuGroup>
        <MenuItem value="Share" disabled>Copy</MenuItem>
        <MenuItem value="About">Delete</MenuItem>
    </Menu>
</div>
