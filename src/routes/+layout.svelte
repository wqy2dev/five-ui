<script lang="ts">
import { Badge } from "$lib/index.js";

import "./style.css";

let { children } = $props();

const routes = [
    {path: "/accordion", title: "Accordion"},
    {path: "/alert", title: "Alert", achieve: true},
    {path: "/avatar", title: "Avatar", achieve: true},
    {path: "/badge", title: "Badge", achieve: true},
    {path: "/breadcrumb", title: "Breadcrumb", achieve: true},
    {path: "/button", title: "Button", achieve: true},
    {path: "/calendar", title: "Calendar"},
    {path: "/card", title: "Card"},
    {path: "/carousel", title: "Carousel"},
    {path: "/cascader", title: "Cascader"},
    {path: "/datepicker", title: "DatePicker"},
    {path: "/drawer", title: "Drawer", achieve: true},
    {path: "/form", title: "Form"},
    {path: "/icon", title: "Icon", achieve: true},
    {path: "/input", title: "Input"},
    {path: "/layout", title: "Layout", achieve: true},
    {path: "/message", title: "Message"},
    {path: "/modal", title: "Modal", achieve: true},
    {path: "/notification", title: "Notification"},
    {path: "/pagination", title: "Pagination"},
    {path: "/radio", title: "Radio"},
    {path: "/select", title: "Select"},
    {path: "/slider", title: "Slider"},
    {path: "/steps", title: "Steps"},
    {path: "/switch", title: "Switch"},
    {path: "/table", title: "Table", achieve: true},
    {path: "/tabs", title: "Tabs"},
    {path: "/tag", title: "Tag", achieve: true},
    {path: "/timeline", title: "Timeline"},
    {path: "/timepicker", title: "TimePicker"},
    {path: "/tooltip", title: "Tooltip", achieve: true},
    {path: "/watermark", title: "WaterMark", achieve: true},
];

</script>

<div class="flex flex-row w-screen h-screen">
    <div class="w-56 h-full bg-slate-100 text-sm shrink-0 overflow-y-auto">
        {#each routes as route}
            <a class="flex flex-row w-full pl-6 py-2 hover:bg-primary-100" href={route.path}>
                <span class="grow">
                    {route.title}
                </span>

                {#if route.achieve}
                    <span class="ml-auto text-red-600 px-3">
                        <Badge 
                            variant="pink"
                            content="✔"
                        />
                    </span>
                {/if}
            </a>
        {/each}
    </div>
    <div class="relative grow py-5 px-8 overflow-y-auto">
        {@render children()}
    </div>
</div>
