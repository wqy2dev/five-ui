<script lang="ts">
import { SuccessCircleSolid } from "$lib/icons/index.js";
import { Layout, Side, Header, Content } from "$lib/index.js";

import "./style.css";

let { children } = $props();

const routes = [
    {path: "/accordion", title: "Accordion", achieve: true},
    {path: "/alert", title: "Alert", achieve: true},
    {path: "/avatar", title: "Avatar", achieve: true},
    {path: "/badge", title: "Badge", achieve: true},
    {path: "/breadcrumb", title: "Breadcrumb", achieve: true},
    {path: "/button", title: "Button", achieve: true},
    {path: "/calendar", title: "Calendar"},
    {path: "/card", title: "Card", achieve: true},
    {path: "/carousel", title: "Carousel", achieve: true},
    {path: "/cascader", title: "Cascader"},
    {path: "/datepicker", title: "DatePicker"},
    {path: "/drawer", title: "Drawer", achieve: true},
    {path: "/dropdown", title: "Dropdown"},
    {path: "/form", title: "Form"},
    {path: "/icon", title: "Icon", achieve: true},
    {path: "/input", title: "Input"},
    {path: "/layout", title: "Layout", achieve: true},
    {path: "/message", title: "Message", achieve: true},
    {path: "/modal", title: "Modal", achieve: true},
    {path: "/notification", title: "Notification", achieve: true},
    {path: "/pagination", title: "Pagination", achieve: true},
    {path: "/radio", title: "Radio"},
    {path: "/select", title: "Select"},
    {path: "/slider", title: "Slider"},
    {path: "/steps", title: "Steps"},
    {path: "/switch", title: "Switch"},
    {path: "/table", title: "Table", achieve: true},
    {path: "/tabs", title: "Tabs", achieve: true},
    {path: "/tag", title: "Tag", achieve: true},
    {path: "/timeline", title: "Timeline"},
    {path: "/timepicker", title: "TimePicker"},
    {path: "/tooltip", title: "Tooltip", achieve: true},
    {path: "/watermark", title: "WaterMark", achieve: true},
];

</script>

<Layout
    class="w-screen h-screen"
>
    <Side
        class="flex flex-col h-full bg-slate-100 text-sm shrink-0"
        width="260px"
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
    
                    {#if route.achieve}
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

        </Header>
        <Content
            class="h-0 px-5 overflow-y-auto pb-20"
        >
            {@render children()}
        </Content>
    </Layout>
</Layout>

