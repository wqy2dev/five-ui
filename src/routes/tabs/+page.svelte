<script lang="ts">
import { Tab, TabContent, Tabs, TabBar } from "$lib/index.js";

const radius = ["sm", "md", "lg", "xl", "full"];

const variants = ["solid", "light", "underlined"];
const colors = ["primary", "default"];
const placements = ["top", "bottom", "left","right"];
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

{#each variants as variant}
    <div class="w-full flex flex-col">
        {#each colors as color, i}
        <div>
            variant: {variant}
            color: {color}
        </div>
        <Tabs defaultKey="3">
            <TabBar variant={variant as any} color={color as any}>
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

            <TabContent key="1">
                A
            </TabContent>
            <TabContent key="2">
                B
            </TabContent>
            <TabContent key="3">
                C
            </TabContent>
            <TabContent key="4">
                D
            </TabContent>
        </Tabs>
        {/each}
    </div>
{/each}

<h4 class="text-base indent-2 bg-slate-100 my-3">
    Radius
</h4>

<div class="w-full flex flex-col">
    {#each radius as rds, i}
        <Tabs defaultKey="3">
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
                <Tab key="4">
                    {#snippet title()}
                        Tab AA
                    {/snippet}
                    <p>Tab 4</p>
                </Tab>
            </TabBar>

            <TabContent key="1">
                A
            </TabContent>
            <TabContent key="2">
                B
            </TabContent>
            <TabContent key="3">
                C
            </TabContent>
            <TabContent key="4">
                D
            </TabContent>
        </Tabs>
    {/each}

    {#each radius as rds, i}
        <Tabs defaultKey="3">
            <TabBar radius={rds as any} variant="light">
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

            <TabContent key="1">
                A
            </TabContent>
            <TabContent key="2">
                B
            </TabContent>
            <TabContent key="3">
                C
            </TabContent>
            <TabContent key="4">
                D
            </TabContent>
        </Tabs>
    {/each}
</div>

<h4 class="text-base indent-2 bg-slate-100 my-3">
    Placement
</h4>

<div class="w-full h-[200px] flex flex-col gap-1">
    <Tabs defaultKey="2">
        <TabBar 
            variant="solid" 
            placement="top"
        >
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

        <div class="grow bg-slate-100">
            <TabContent key="1">
                A
            </TabContent>
            <TabContent key="2">
                B
            </TabContent>
            <TabContent key="3">
                C
            </TabContent>
            <TabContent key="4">
                D
            </TabContent>
        </div>
    </Tabs>
</div>


<div class="w-full h-[200px] flex flex-col mt-10  gap-1">
    <Tabs defaultKey="2">
        <div class="grow bg-slate-100">
            <TabContent key="1">
                A
            </TabContent>
            <TabContent key="2">
                B
            </TabContent>
            <TabContent key="3">
                C
            </TabContent>
            <TabContent key="4">
                D
            </TabContent>
        </div>
        
        <TabBar 
            variant="solid" 
            placement="bottom"
        >
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

<div class="w-full h-[200px] flex flex-row mt-10 gap-2">
    <Tabs defaultKey="2">
        <div class="grow bg-slate-100">
            <TabContent key="1">
                A
            </TabContent>
            <TabContent key="2">
                B
            </TabContent>
            <TabContent key="3">
                C
            </TabContent>
            <TabContent key="4">
                D
            </TabContent>
        </div>
        
        <TabBar 
            variant="solid" 
            placement="right"
            class="h-full"
        >
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


<div class="w-full h-[200px] flex flex-row mt-10 gap-2">
    <Tabs defaultKey="2">
        <TabBar 
            variant="solid" 
            placement="left"
            class="h-full"
        >
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

        <div class="grow bg-slate-100">
            <TabContent key="1">
                A
            </TabContent>
            <TabContent key="2">
                B
            </TabContent>
            <TabContent key="3">
                C
            </TabContent>
            <TabContent key="4">
                D
            </TabContent>
        </div>
    </Tabs>
</div>


<div class="w-full h-[200px] flex flex-col">
    <Tabs defaultKey="2">
        <TabBar 
            variant="underlined" 
            placement="top"
            class="w-full flex justify-center"
        >
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

        <div class="grow bg-slate-100">
            <TabContent key="1">
                A
            </TabContent>
            <TabContent key="2">
                B
            </TabContent>
            <TabContent key="3">
                C
            </TabContent>
            <TabContent key="4">
                D
            </TabContent>
        </div>
    </Tabs>
</div>


<div class="w-full h-[200px] flex flex-col mt-10">
    <Tabs defaultKey="2">
        <div class="grow bg-slate-100">
            <TabContent key="1">
                A
            </TabContent>
            <TabContent key="2">
                B
            </TabContent>
            <TabContent key="3">
                C
            </TabContent>
            <TabContent key="4">
                D
            </TabContent>
        </div>
        
        <TabBar 
            variant="underlined" 
            placement="bottom"
            class="w-full flex justify-center"
        >
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

<div class="w-full h-[200px] flex flex-row mt-10">
    <Tabs defaultKey="2">
        <div class="grow bg-slate-100">
            <TabContent key="1">
                A
            </TabContent>
            <TabContent key="2">
                B
            </TabContent>
            <TabContent key="3">
                C
            </TabContent>
            <TabContent key="4">
                D
            </TabContent>
        </div>
        
        <TabBar 
            variant="underlined" 
            placement="right"
            class="h-full"
        >
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


<div class="w-full h-[200px] flex flex-row mt-10">
    <Tabs defaultKey="2">
        <TabBar 
            variant="underlined" 
            placement="left"
            class="h-full"
        >
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

        <div class="grow bg-slate-100">
            <TabContent key="1">
                A
            </TabContent>
            <TabContent key="2">
                B
            </TabContent>
            <TabContent key="3">
                C
            </TabContent>
            <TabContent key="4">
                D
            </TabContent>
        </div>
    </Tabs>
</div>