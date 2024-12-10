<script lang="ts">
import "./style.css";

let { children } = $props();

const routes = [
    {path: "/accordion", title: "Accordion"},
    {path: "/alert", title: "Alert"},
    {path: "/avatar", title: "Avatar"},
    {path: "/badge", title: "Badge"},
    {path: "/breadcrumb", title: "Breadcrumb"},
    {path: "/button", title: "Button"},
    {path: "/drawer", title: "Drawer"},
    {path: "/form", title: "Form"},
    {path: "/icon", title: "Icon"},
    {path: "/card", title: "Card"},
    {path: "/layout", title: "Layout"},
    {path: "/message", title: "Message"},
    {path: "/modal", title: "Modal"},
    {path: "/pagination", title: "Pagination"},
    {path: "/steps", title: "Steps"},
    {path: "/table", title: "Table"},
    {path: "/tag", title: "Tag"},
    {path: "/timeline", title: "Timeline"},
    {path: "/tooltip", title: "Tooltip"},
];

</script>

<div class="flex flex-row w-screen h-screen">
    <div class="w-56 bg-slate-100 text-sm shrink-0">
        {#each routes as route}
            <a class="block w-full pl-6 py-2 hover:bg-primary-100" href={route.path}>{route.title}</a>
        {/each}
    </div>
    <div class="grow py-5 px-8 overflow-y-auto">
        {@render children()}
    </div>
</div>
