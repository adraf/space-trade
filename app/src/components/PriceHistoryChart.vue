<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
    stationData: {
        type: Object,
        default: () => ({})
    }
});

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    return {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'],
        datasets: [
            {
                label: props.stationData.artifacts ? `Pricing History of ${props.stationData?.artifacts?.[0]?.name}` : 'Pricing History',
                data: Array.isArray(props.stationData?.artifacts?.[0]?.history)
                  ? props.stationData.artifacts[0].history.map(Number)
                  : [],
                backgroundColor: ['#070F2B', '#1B1A55', '#535C91', '#9290C3'],
                borderColor: ['#070F2B', '#1B1A55', '#535C91', '#9290C3'],
                borderWidth: 1
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>

<template>
    <Chart type="bar" :data="chartData" :options="chartOptions" class="w-30rem h-auto bg-white p-2 border-round-lg" />
</template>

