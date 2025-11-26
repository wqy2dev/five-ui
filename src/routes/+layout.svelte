<script lang="ts">
import { SuccessCircleSolid } from "$lib/icons/index.js";
import { Layout, Side, Header, Content } from "$lib/index.js";
// import { tweened } from 'svelte/motion';
// import { cubicOut } from 'svelte/easing';

import "./style.css";

let { children } = $props();

const routes = [
    {path: "/accordion", title: "Accordion", ok: true},
    {path: "/alert", title: "Alert", ok: true},
    {path: "/avatar", title: "Avatar", ok: true},
    {path: "/badge", title: "Badge", ok: true},
    {path: "/breadcrumb", title: "Breadcrumb", ok: true},
    {path: "/button", title: "Button", ok: true},
    {path: "/calendar", title: "Calendar"},
    {path: "/card", title: "Card", ok: true},
    {path: "/carousel", title: "Carousel", ok: true},
    {path: "/cascader", title: "Cascader"},
    {path: "/checkbox", title: "Checkbox", ok: true},
    {path: "/datepicker", title: "DatePicker"},
    {path: "/drawer", title: "Drawer", ok: true},
    {path: "/dropdown", title: "Dropdown", ok: true},
    {path: "/editor", title: "Editor", ok: true},
    {path: "/form", title: "Form", ok: true},
    {path: "/icon", title: "Icon", ok: true},
    {path: "/input", title: "Input", ok: true},
    {path: "/kv", title: "KV", ok: true},
    {path: "/layout", title: "Layout", ok: true},
    {path: "/list", title: "List", ok: true},
    {path: "/message", title: "Message", ok: true},
    {path: "/menu", title: "Menu", ok: true},
    {path: "/modal", title: "Modal", ok: true},
    {path: "/notification", title: "Notification", ok: true},
    {path: "/number", title: "Number", ok: true},
    {path: "/pagination", title: "Pagination", ok: true},
    {path: "/radio", title: "Radio", ok: true},
    {path: "/select", title: "Select", ok: true},
    {path: "/slider", title: "Slider"},
    {path: "/space", title: "Space", ok: true},
    {path: "/steps", title: "Steps"},
    {path: "/switch", title: "Switch", ok: true},
    {path: "/table", title: "Table", ok: true},
    {path: "/tabs", title: "Tabs", ok: true},
    {path: "/tag", title: "Tag", ok: true},
    {path: "/textarea", title: "Textarea", ok: true},
    {path: "/timeline", title: "Timeline"},
    {path: "/timepicker", title: "TimePicker", ok: true},
    {path: "/tooltip", title: "Tooltip", ok: true},
    {path: "/watermark", title: "WaterMark", ok: true},
];

</script>

<Layout
    class="w-screen h-screen"
>
    <Side
        class="flex flex-col h-full bg-slate-100 text-sm shrink-0"
    >
        <div class="pl-6 py-5 font-bold">
            FiveUI Components({routes.length})
        </div>
        <div
            class="grow overflow-y-auto"
        >
            {#each routes as route}
                <a class="flex flex-row w-full pl-6 py-2 hover:bg-primary-100" href={route.path}>
                    <span class="grow">
                        {route.title}
                    </span>
    
                    {#if route.ok}
                        <span class="px-3 flex items-center justify-center text-lime-600">
                            <SuccessCircleSolid/>
                        </span>
                    {/if}
                </a>
            {/each}
        </div>
    </Side>
    <Layout
        layout="col"
        class="grow w-0"
    >
        <Header>
            <!-- <button onclick={increase}>Increase Count</button>
            <p>Animated Count: {$count}</p> -->
        </Header>
        <Content
            class="h-0 px-5 overflow-y-auto pb-20"
        >
            {@render children()}
        </Content>
    </Layout>
</Layout>

