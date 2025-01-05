<script lang="ts">
import { Dropdown, Button, Menu, MenuGroup, MenuItem } from "$lib/index.js";

</script>

<svelte:head>
	<title>Dropdown</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Dropdown
</h2>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Default
    </h4>

    <Dropdown>
        {#snippet target(ref)}
            <Button ref={ref}> 
                <span>
                    Dropdown
                </span>    
            </Button>
        {/snippet}

        <Menu
            oncommand={k => {
                console.log("menu key: ", k);
            }}
        >
            <MenuGroup title="Action">
                <MenuItem key="copy">Copy</MenuItem>
                <MenuItem key="delete">Delete</MenuItem>
                <MenuItem key="export">Export</MenuItem>
                <MenuItem key="import">Import</MenuItem>
            </MenuGroup>
            <MenuItem key="Share" disabled>Copy</MenuItem>
            <MenuItem key="About">Delete</MenuItem>
        </Menu>
    </Dropdown>
</div>
