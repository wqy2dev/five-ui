<script lang="ts">
import { Layout, Side, Header, Content, Button } from "$lib/index.js";

let collapsible = $state(false);

</script>

<h2 class="text-lg font-bold leading-10">
    Layout
</h2>

<h4 class="my-5 text-base indent-2 bg-slate-50">
    Base
</h4>

<Layout 
    style="height:20%;"
    class="w-full"
    layout="col"
>
    <Header
        class="bg-slate-900"
    >

    </Header>
    <Content
        class="bg-slate-100"
    >

    </Content>
</Layout>

<br/>

<Layout 
    style="height:20%;"
    class="w-full"
    layout="col"
>
    <Header
        class="bg-slate-900"
    >

    </Header>

    <Layout>
        <Side 
            class="bg-slate-600"
        >

        </Side>
        <Content
            class="bg-slate-100"
        >

        </Content>
    </Layout>
</Layout>

<br/>

<Layout 
    style="height:20%;"
    class="w-full"
    layout="col"
>
    <Header
        class="bg-slate-900"
    >

    </Header>

    <Layout>
        <Content
            class="bg-slate-100"
        >

        </Content>
        <Side 
            class="bg-slate-600"
        >

        </Side>
    </Layout>
</Layout>

<br/>

<Layout 
    style="height:20%;"
    class="w-full"
>
    <Side 
        class="bg-slate-900"
    />

    <Layout 
        layout="col"
    >
        <Header
            class="bg-slate-600"
        >

        </Header>
        <Content
            class="bg-slate-100"
        >

        </Content>
    </Layout>
</Layout>

<br/>

<h4 class="my-5 text-base indent-2 bg-slate-50">
    Collapsible Side
</h4>

<Layout 
    style="height:20%;"
    class="w-full"
>
    <Side 
        class="bg-slate-900"
        collapsible={collapsible}
    />

    <Layout 
        layout="col"
    >
        <Header
            class="bg-slate-600"
        >
            <Button
                onclick={() => collapsible = !collapsible}
            > 
                Collapsible
            </Button>
        </Header>
        <Content
            class="bg-slate-100"
        >

        </Content>
    </Layout>
</Layout>

