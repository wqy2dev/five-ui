<script lang="ts">
import { Tab, TabContent, Tabs, TabBar } from "$lib/index.js";

const radius = ["sm", "md", "lg", "xl", "full"];

</script>

<svelte:head>
	<title>Tabs</title>
</svelte:head>

<h2 class="text-lg font-bold leading-10">
    Tabs
</h2>

<h4 class="text-base indent-2 bg-slate-100 my-3">
    Default
</h4>

<div class="flex flex-col gap-5">
    <Tabs defaultKey="1">
        <TabBar>
            <Tab key="1" title="Tab 1">
                <p>Tab 1</p>
            </Tab>
            <Tab key="2" title="Tab 2">
                <p>Tab 2</p>
            </Tab>
            <Tab key="3" title="Tab 3">
                <p>Tab 3</p>
            </Tab>
            <Tab key="4">
                {#snippet title()}
                    Tab AA
                {/snippet}
                <p>Tab 4</p>
            </Tab>
        </TabBar>
    </Tabs>
    
    <Tabs defaultKey="1">
        <TabBar variant="light">
            <Tab key="1" title="Tab 1">
                <p>Tab 1</p>
            </Tab>
            <Tab key="2" title="Tab 2">
                <p>Tab 2</p>
            </Tab>
            <Tab key="3" title="Tab 3">
                <p>Tab 3</p>
            </Tab>
            <Tab key="4">
                {#snippet title()}
                    Tab AA
                {/snippet}
                <p>Tab 4</p>
            </Tab>
        </TabBar>
    </Tabs>

    <Tabs defaultKey="1">
        <TabBar variant="underlined">
            <Tab key="1" title="Tab 1">
                <p>Tab 1</p>
            </Tab>
            <Tab key="2" title="Tab 2">
                <p>Tab 2</p>
            </Tab>
            <Tab key="3" title="Tab 3">
                <p>Tab 3</p>
            </Tab>
            <Tab key="4">
                {#snippet title()}
                    Tab AA
                {/snippet}
                <p>Tab 4</p>
            </Tab>
        </TabBar>
    </Tabs>
</div>


<h4 class="text-base indent-2 bg-slate-100 my-3">
    Radius
</h4>

<div class="space-y-4 mt-5">
    {#each radius as rds}
        <Tabs defaultKey="1">
            <TabBar radius={rds as any}>
                <Tab key="1" title="Tab 1">
                    <p>Tab 1</p>
                </Tab>
                <Tab key="2" title="Tab 2">
                    <p>Tab 2</p>
                </Tab>
                <Tab key="3" title="Tab 3">
                    <p>Tab 3</p>
                </Tab>
                <Tab key="4" title="Tab 4">
                    <p>Tab 4</p>
                </Tab>
            </TabBar>

            <TabContent key="1">
                <p>Tab 1</p>
            </TabContent>

            <TabContent key="2">
                <p>Tab 2</p>
            </TabContent>

            <TabContent key="3">
                <p>Tab 3</p>
            </TabContent>

            <TabContent key="4">
                <p>Tab 4</p>
            </TabContent>
        </Tabs>
    {/each}
</div>