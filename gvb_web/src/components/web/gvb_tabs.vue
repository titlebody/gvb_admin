<!--  -->
<template>
	<a-card title="标签云" style="width: 430px" class="mt-3">
		<div id="wordCloud" style="height: 100px;"></div>
	</a-card>
	
</template>
 
<script>
import * as echarts from 'echarts/core';
import 'echarts-wordcloud';

export default {
	data() {
		return {
			echartsData: [
				{ value: '1', name: 'Golang' },
				{ value: '2', name: 'Web' },
				{ value: '3', name: 'VUE' },
				{ value: '4', name: 'GORM' },
			]
		};
	},
	mounted: function () {
		this.initChart();
	},
	methods: {
		initChart() {
			var myChart = echarts.init(document.getElementById('wordCloud'));
			const option = {
				title: {
					text: '',
					x: "center"
				},
				backgroundColor: "rgba(255, 255, 255, 0.1)",
				// tooltip: {
				//   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
				// },
				series: [
					{
						type: "wordCloud",
						//用来调整词之间的距离
						gridSize: 10,
						//用来调整字的大小范围
						// Text size range which the value in data will be mapped to.
						// Default to have minimum 12px and maximum 60px size.
						sizeRange: [14, 30],
						// Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
						//用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
						// rotationRange: [-45, 0, 45, 90],
						// rotationRange: [ 0,90],
						rotationRange: [0, 0],
						//随机生成字体颜色
						// maskImage: maskImage,
						textStyle: {
							color: function () {
								return (
									"rgb(" +
									Math.round(Math.random() * 255) +
									", " +
									Math.round(Math.random() * 255) +
									", " +
									Math.round(Math.random() * 255) +
									")"
								);
							}
						},
						//位置相关设置
						// Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
						// Default to be put in the center and has 75% x 80% size.
						left: "center",
						top: "center",
						right: null,
						bottom: null,
						width: "100%",
						height: "100%",
						//数据
						data: this.echartsData
					}
				]
			};
			myChart.setOption(option);
			// 点击某个字
			myChart.on('click', function (params) {
				console.log('myChart----click---:', params, '------', params.data)
			});
		}
 
	}
 
}
 
</script>
<style lang='scss' scoped>

</style>