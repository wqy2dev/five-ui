<script lang="ts">
import { Dropdown, Button, Menu, MenuGroup, MenuItem } from "$lib/index.js";

const triggers = ["click", "focus", "hover"];
const placements = [
    ["topStart", "top", "topEnd"],
    ["bottomStart", "bottom", "bottomEnd"],
    ["leftStart", "left", "leftEnd"],
    ["rightStart", "right", "rightEnd"],
];

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

    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Trigger
    </h4>

    {#each triggers as trigger}
        <Dropdown
            trigger={trigger as any}
        >
            {#snippet target(ref)}
                <Button ref={ref}> 
                    <span>
                        dropdown {trigger}
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
    {/each}

    <h4 class="text-base indent-2 bg-slate-100 my-3">
        Placement
    </h4>

    {#each placements as rows}
        <div class="flex flex-row flex-wrap gap-2">
            {#each rows as placement}
                <Dropdown
                    placement={placement as any}
                >
                    {#snippet target(ref)}
                        <Button ref={ref}> 
                            <span>
                                dropdown {placement}
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
            {/each}
        </div>
    {/each}
</div>
