<script lang="ts">
import { Select, Option } from "$lib/index.js";

const sizes = ["sm", "md", "lg"];

</script>

<svelte:head>
    <title>Select</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Select
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-100">
    Base
</h4>

<div class="flex flex-row gap-5">
    <Select
        name="a" 
        onchange={v => console.log("radio a:", v)}
        placeholder="please select"
    >
        <Option
            value="polo"
            label={"菠萝"}
        >
            菠萝
        </Option>
        <Option
            value="juezi"
            label={"橘子A"}
            disabled
        >
            橘子
        </Option>
        <Option
            value="apple"
            label={"苹果B"}
        >
            苹果
        </Option>
    </Select>
</div>