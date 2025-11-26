<script lang="ts">
import { Menu, MenuItem, MenuGroup, MenuSub  } from "$lib/index.ts";
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
        <MenuItem value="/" link={true}>Terminal</MenuItem>
    </Menu>
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Trigger
</h4>

<div class="w-full">
    <Menu class="shadow-outline-md">
        <MenuGroup title="功能">
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
    SubMenu
</h4>

<div class=" flex flex-row gap-6">
    <div class=" relative w-52 ">
        <Menu class="shadow-outline-md" oncommand={(v, l) => {
            console.log("value:", v, "l:", l);
        }}>
            <MenuSub title="Operation">
                <MenuItem value="copy">Copy</MenuItem>
                <MenuItem value="delete">Delete</MenuItem>
            </MenuSub>

            <MenuSub title="Export/Import">
                <MenuItem value="export">Export</MenuItem>
                <MenuItem value="import">Import</MenuItem>
            </MenuSub>
            <MenuItem value="Share" disabled>Copy</MenuItem>
            <MenuItem value="About">Delete</MenuItem>
        </Menu>
    </div>

    <div class=" relative w-52 ">
        <Menu
            class="shadow-outline-md" 
            oncommand={(v, l) => {
                console.log("value:", v, "l:", l);
            }}
        >
            <MenuSub title="Operation" size="sm">
                <MenuItem value="copy">Copy</MenuItem>
                <MenuItem value="delete">Delete</MenuItem>
            </MenuSub>

            <MenuSub title="Export/Import" size="sm">
                <MenuItem value="export">Export</MenuItem>
                <MenuItem value="import">Import</MenuItem>
            </MenuSub>
            <MenuItem value="Share" disabled>Copy</MenuItem>
            <MenuItem value="About">Delete</MenuItem>
        </Menu>
    </div>
</div>
