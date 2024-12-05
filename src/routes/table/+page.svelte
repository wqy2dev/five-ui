<script lang="ts">
import { Table, Button, Tooltip } from "$lib/index.js";

const dataSource = [
    {
        title: "Trip USA, Inc. 1001 Bayhill Drive, Suite 200 San Bruno, CA 94066 USA",
        no: "202411050098",
        company: "SpaceX Space Exploration Company in the United States",
        progress: "Phase II(68%)",
        duration: "6 Months",
        person: "Elon Musk",
        telphone: "021-5678908",
    },
    {
        title: "Trip USA, Inc. 1001 Bayhill Drive, Suite 200 San Bruno, CA 94066 USA",
        no: "202411050098",
        company: "SpaceX Space Exploration Company in the United States",
        progress: "Phase II(68%)",
        duration: "6 Months",
        person: "Elon Musk",
        telphone: "021-5678908",
    },
    {
        title: "Trip USA, Inc. 1001 Bayhill Drive, Suite 200 San Bruno, CA 94066 USA",
        no: "202411050098",
        company: "SpaceX Space Exploration Company in the United States",
        progress: "Phase II(68%)",
        duration: "6 Months",
        person: "Elon Musk",
        telphone: "021-5678908",
    },
    {
        title: "Trip USA, Inc. 1001 Bayhill Drive, Suite 200 San Bruno, CA 94066 USA",
        no: "202411050098",
        company: "SpaceX Space Exploration Company in the United States",
        progress: "Phase II(68%)",
        duration: "6 Months",
        person: "Elon Musk",
        telphone: "021-5678908",
    },
    {
        title: "Trip USA, Inc. 1001 Bayhill Drive, Suite 200 San Bruno, CA 94066 USA",
        no: "202411050098",
        company: "SpaceX Space Exploration Company in the United States",
        progress: "Phase II(68%)",
        duration: "6 Months",
        person: "Elon Musk",
        telphone: "021-5678908",
    },
    {
        title: "Trip USA, Inc. 1001 Bayhill Drive, Suite 200 San Bruno, CA 94066 USA",
        no: "202411050098",
        company: "SpaceX Space Exploration Company in the United States",
        progress: "Phase II(68%)",
        duration: "6 Months",
        person: "Elon Musk",
        telphone: "021-5678908",
    },
    {
        title: "Trip USA, Inc. 1001 Bayhill Drive, Suite 200 San Bruno, CA 94066 USA",
        no: "202411050098",
        company: "SpaceX Space Exploration Company in the United States",
        progress: "Phase II(68%)",
        duration: "6 Months",
        person: "Elon Musk",
        telphone: "021-5678908",
    },
];

</script>

<svelte:head>
	<title>Table</title>
</svelte:head>

{#snippet titleRender(row:Record<string, any>, index:number)}
    <Tooltip>
        {#snippet target(ref)}
            <span use:ref>
                {row["title"]}
            </span>
        {/snippet}

        {row["title"]}
    </Tooltip>
{/snippet}

{#snippet operateRender(row:Record<string, any>, index:number)}
    <Button size="xs">编辑</Button>
    <Button size="xs">日志</Button>
{/snippet}

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-50">
        Default
    </h4>

    <Table
        columns={[
            {key: "company", label: "Company", width: "160px",  render:titleRender},
            {key: "address", label: "Address"},
            {key: "no", label: "No"},
            {key: "progress", label: "Process"},
            {key: "duration", label: "Time"},
            {key: "person", label: "Contacts", align: "center"},
            {key: "telphone", label: "Telphone"},
            {key: "operate", label: "Action", align: "center", width: "150px",render:operateRender},
        ]}
        source={dataSource}
    >
        
    </Table>
</div>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-50">
        Row with Hover
    </h4>

    <Table
        columns={[
            {key: "company", label: "Company", width: "160px",  render:titleRender},
            {key: "address", label: "Address"},
            {key: "no", label: "No"},
            {key: "progress", label: "Process"},
            {key: "duration", label: "Time"},
            {key: "person", label: "Contacts", align: "center"},
            {key: "telphone", label: "Telphone"},
            {key: "operate", label: "Action", align: "center", width: "150px",render:operateRender},
        ]}
        source={dataSource}
        effect="hover"
    >
        
    </Table>
</div>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-50">
        Striped Row
    </h4>

    <Table
        columns={[
            {key: "company", label: "Company", width: "160px",  render:titleRender},
            {key: "address", label: "Address"},
            {key: "no", label: "No"},
            {key: "progress", label: "Process"},
            {key: "duration", label: "Time"},
            {key: "person", label: "Contacts", align: "center"},
            {key: "telphone", label: "Telphone"},
            {key: "operate", label: "Action", align: "center", width: "150px",render:operateRender},
        ]}
        source={dataSource}
        effect="striped"
    >
        
    </Table>
</div>


<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-50">
        Bordered
    </h4>

    <Table
        columns={[
            {key: "company", label: "Company", width: "160px",  render:titleRender},
            {key: "address", label: "Address"},
            {key: "no", label: "No"},
            {key: "progress", label: "Process"},
            {key: "duration", label: "Time"},
            {key: "person", label: "Contacts", align: "center"},
            {key: "telphone", label: "Telphone"},
            {key: "operate", label: "Action", align: "center", width: "150px",render:operateRender},
        ]}
        source={dataSource}
        bordered
    >
        
    </Table>
</div>


<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-50">
        Overflow Scroll
    </h4>

    <Table
        columns={[
            {key: "company", label: "Company", width: "200px", render:titleRender},
            {key: "address", label: "Address", width: "200px"},
            {key: "no", label: "No", width: "200px"},
            {key: "progress", label: "Process", width: "200px"},
            {key: "duration", label: "Time", width: "200px"},
            {key: "person", label: "Contacts", align: "center", width: "200px"},
            {key: "telphone", label: "Telphone", width: "200px"},
            {key: "operate", label: "Action", align: "center", width: "150px",render:operateRender},
        ]}
        source={dataSource}
    >
        
    </Table>
</div>