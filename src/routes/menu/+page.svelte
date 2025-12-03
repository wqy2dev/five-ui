<script lang="ts">
import { Menu, MenuItem, MenuGroup, MenuSub, Tag  } from "$lib/index.js";
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

<div class="w-52">
    <Menu class="shadow-outline-md">
        <MenuGroup title="Action">
            <MenuItem value="copy">
                Copy
                {#snippet extra()}
                <Tag>10</Tag>
                {/snippet}
            </MenuItem>
            <MenuItem value="delete">
                Delete
                {#snippet extra()}
                <Tag variant="red">10</Tag>
                {/snippet}
            </MenuItem>
            <MenuItem value="export">
                Export
                {#snippet extra()}
                <Tag variant="purple">10</Tag>
                {/snippet}
            </MenuItem>
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

<div class="w-52">
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

<div class="flex flex-row w-[800px] gap-7">
    <div class=" relative w-52 ">
        <Menu size="lg" class="shadow-outline-md" oncommand={(v, l) => {
            console.log("value:", v, "l:", l);
        }}>
            <MenuSub title="Operation">
                {#snippet extra()}
                    <Tag variant="red">10</Tag>
                {/snippet}
                <MenuItem value="copy">
                    Copy
                </MenuItem>
                <MenuItem value="delete">Delete</MenuItem>
            </MenuSub>

            <MenuSub title="Export/Import">
                {#snippet extra()}
                    <Tag variant="cyan">99</Tag>
                {/snippet}
                <MenuItem value="export">Export</MenuItem>
                <MenuItem value="import">Import</MenuItem>
            </MenuSub>
            <MenuItem value="Share" disabled>Copy</MenuItem>
            <MenuItem value="About">Delete</MenuItem>
        </Menu>
    </div>
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
            size="sm"
            oncommand={(v, l) => {
                console.log("value:", v, "l:", l);
            }}
        >
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
</div>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Stateful
</h4>

<div class="w-52">
    <Menu class="shadow-outline-md" stateful={true}>
        <MenuGroup title="功能">
            <MenuItem value="copy">Copy</MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
        </MenuGroup>
        <MenuGroup title="操作">
            <MenuItem value="export">Export</MenuItem>
            <MenuItem value="import">Import</MenuItem>
        </MenuGroup>
        <MenuItem value="share" disabled>Copy</MenuItem>
        <MenuItem value="share" link={true} disabled>Disable Link</MenuItem>
        <MenuItem value="/" link={true}>Link</MenuItem>
    </Menu>
</div>
