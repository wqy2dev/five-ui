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
    {path: "/calendar", title: "Calendar"},
    {path: "/card", title: "Card"},
    {path: "/carousel", title: "Carousel"},
    {path: "/cascader", title: "Cascader"},
    {path: "/datepicker", title: "DatePicker"},
    {path: "/drawer", title: "Drawer"},
    {path: "/form", title: "Form"},
    {path: "/icon", title: "Icon"},
    {path: "/input", title: "Input"},
    {path: "/layout", title: "Layout"},
    {path: "/message", title: "Message"},
    {path: "/modal", title: "Modal"},
    {path: "/notification", title: "Notification"},
    {path: "/pagination", title: "Pagination"},
    {path: "/radio", title: "Radio"},
    {path: "/select", title: "Select"},
    {path: "/slider", title: "Slider"},
    {path: "/steps", title: "Steps"},
    {path: "/switch", title: "Switch"},
    {path: "/table", title: "Table"},
    {path: "/tabs", title: "Tabs"},
    {path: "/tag", title: "Tag"},
    {path: "/timeline", title: "Timeline"},
    {path: "/timepicker", title: "TimePicker"},
    {path: "/tooltip", title: "Tooltip"},
    {path: "/watermark", title: "WaterMark"},
];

</script>

<div class="flex flex-row w-screen h-screen">
    <div class="w-56 h-full bg-slate-100 text-sm shrink-0 overflow-y-auto">
        {#each routes as route}
            <a class="block w-full pl-6 py-2 hover:bg-primary-100" href={route.path}>{route.title}</a>
        {/each}
    </div>
    <div class="relative grow py-5 px-8 overflow-y-auto">
        {@render children()}
    </div>
</div>
