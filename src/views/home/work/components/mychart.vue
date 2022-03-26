<template>
    <el-main>
        <el-row :gutter="15">
            <el-col :lg="8">
                <el-card shadow="never">
                    <scEcharts height="300px" :option="option"></scEcharts>
                </el-card>
            </el-col>
            <el-col :lg="8">
                <el-card shadow="never">
                    <scEcharts height="300px" :option="option2"></scEcharts>
                </el-card>
            </el-col>
            <el-col :lg="8">
                <el-card shadow="never">
                    <scEcharts height="300px" :option="option6"></scEcharts>
                </el-card>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
import scEcharts from '@/components/scEcharts';

/**
 * 引入组件 @/components/scEcharts
 * 组件内部会自动加载主题 @/components/scEcharts/echarts-theme-T.js
 * 支持props包括 height，width，option
 * 组件export百度Echarts所有方法，使用方式: new scEcharts[fun]
 */

export default {
    name: 'mychart',
    components: {
        scEcharts
    },
    data() {
        return {
            option: {
                title: {
                    text: 'Bar Demo',
                    subtext: '基础柱状图',
                },
                grid: {
                    top: '80px'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    barWidth: '15px',
                },
                    {
                        data: [110, 180, 120, 120, 60, 90, 110],
                        type: 'bar',
                        barWidth: '15px',
                    }]
            },
            option2: {
                title: {
                    text: 'Line Demo',
                    subtext: '基础折线图',
                },
                grid: {
                    top: '80px'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'line',
                },
                    {
                        data: [110, 180, 120, 120, 60, 90, 110],
                        type: 'line',
                    }]
            },
            option6: {
                title: {
                    text: 'Gauge Demo',
                    subtext: '基础仪表盘',
                },
                series: [{
                    center: ['50%', '60%'],
                    type: 'gauge',
                    anchor: {
                        show: true,
                        showAbove: true,
                        size: 20,
                        itemStyle: {
                            borderWidth: 5
                        }
                    },
                    progress: {
                        show: true
                    },
                    data: [{
                        value: 70
                    }]
                }]
            }
        }
    }
}
</script>

<style>
</style>
