import DATA, { backgroundColor, borderColor } from "./dummy_data.js"

function getGraphLabels() {
	return DATA.map((value) => value.period)
}

function addTotalToDATA() {
	return DATA.map((value) => {
		let total = Object.keys(value).filter((key) => key !== "period").length
		return {
			...value,
			total: total / 3,
		}
	})
}

function filterKeys(obj, filter) {
	return Object.keys(obj).filter((key) => key !== filter)
}

function generateDatasetItem(label, data) {
	return {
		label,
		backgroundColor,
		borderColor,
		data: data.map((value) => {
			return value[label]
		}),
	}
}

function generateDatasets() {
	const dataWithTotal = addTotalToDATA()
	const filteredKeys = filterKeys(dataWithTotal[0], "period")
	const datasets = filteredKeys.map((label) => generateDatasetItem(label, dataWithTotal))
	return datasets
}

function generateGraphData() {
	const labels = getGraphLabels()
	const datasets = generateDatasets()
	return {
		labels,
		datasets,
	}
}

export function generateGraph(context) {
	const data = generateGraphData()
	return new Chart(context, {
		type: "line",
		data,
	})
}
