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

<div class="w-32">
    <Menu>
        <MenuGroup title="Action">
            <MenuItem key="copy">Copy</MenuItem>
            <MenuItem key="delete">Delete</MenuItem>
            <MenuItem key="export">Export</MenuItem>
            <MenuItem key="import">Import</MenuItem>
        </MenuGroup>
        <MenuItem key="Share" disabled>Copy</MenuItem>
        <MenuItem key="About">Delete</MenuItem>
    </Menu>
</div>
