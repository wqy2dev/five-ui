<script lang="ts">
import { Table, Button, Tooltip } from "$lib/index.js";

</script>

<svelte:head>
	<title>Table</title>
</svelte:head>

<div class="space-y-4 mt-5">
    <h4 class="text-base indent-2 bg-slate-50">
        Default
    </h4>

    {#snippet project()}
        <div class="flex flex-row items-center justify-start">
            项目名称 
        </div> 
    {/snippet}

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
        <Button size="xs">编辑{index}</Button>
        <Button size="xs">日志</Button>
    {/snippet}

    <Table
        columns={[
            {key: "title", label: project, width: "160px",  render:titleRender},
            {key: "no", label: "工地编号"},
            {key: "company", label: "施工单位"},
            {key: "progress", label: "施工进度"},
            {key: "duration", label: "施工时间"},
            {key: "person", label: "负责人"},
            {key: "telphone", label: "联系电话"},
            {key: "operate", label: "操作", width: "150px",render:operateRender},
        ]}
        source={[
            {
                title: "未来能源安全和应急项目二期升级",
                no: "202411050098",
                company: "美国SpaceX太空探索公司",
                progress: "二期(68%)",
                duration: "6个月",
                person: "艾隆.马斯克",
                telphone: "021-5678908",
            },
            {
                title: "未来能源安全和应急项目二期升级",
                no: "202411050098",
                company: "美国SpaceX太空探索公司",
                progress: "二期(68%)",
                duration: "6个月",
                person: "艾隆.马斯克",
                telphone: "021-5678908",
            },
            {
                title: "未来能源安全和应急项目二期升级",
                no: "202411050098",
                company: "美国SpaceX太空探索公司",
                progress: "二期(68%)",
                duration: "6个月",
                person: "艾隆.马斯克",
                telphone: "021-5678908",
            },
            {
                title: "未来能源安全和应急项目二期升级",
                no: "202411050098",
                company: "美国SpaceX太空探索公司",
                progress: "二期(68%)",
                duration: "6个月",
                person: "艾隆.马斯克",
                telphone: "021-5678908",
            },
            {
                title: "未来能源安全和应急项目二期升级",
                no: "202411050098",
                company: "美国SpaceX太空探索公司",
                progress: "二期(68%)",
                duration: "6个月",
                person: "艾隆.马斯克",
                telphone: "021-5678908",
            },
            {
                title: "未来能源安全和应急项目二期升级",
                no: "202411050098",
                company: "美国SpaceX太空探索公司",
                progress: "二期(68%)",
                duration: "6个月",
                person: "艾隆.马斯克",
                telphone: "021-5678908",
            },
            {
                title: "未来能源安全和应急项目二期升级",
                no: "202411050098",
                company: "美国SpaceX太空探索公司",
                progress: "二期(68%)",
                duration: "6个月",
                person: "艾隆.马斯克",
                telphone: "021-5678908",
            },
        ]}
    >
        {#snippet header()}
        header caption
        {/snippet}

        {#snippet footer()}
        footer caption
        {/snippet}
    </Table>
</div>