import DATA, { backgroundColor, borderColor } from "./dummy_data.js"

/**
 * extract the chart labels from our DATA
 * @return {Array} chart labels
 */
function getGraphLabels() {
	return DATA.map((value) => value.period)
}
/**
 * add the total to the data
 * @return {Array} our data with total attribute added
 * @note in the provided data all the item has 4 attributes exclude the period and we have 3 for all the data
 * i kept this function in case we added new sets to the data and they have more than 4 attributes
 */
function addTotalToDATA() {
	// map the provided data and calculate the total attribute and add it the new array
	return DATA.map((value) => {
		let total = Object.keys(value).filter((key) => key !== "period").length
		return {
			...value,
			total: total / 3,
		}
	})
}

/**
 * filter our data and extract the main entities
 * @param {Object} obj item from our data
 * @param {String} filter the excluded attribute
 * @return {Array} array of the main entities of the chart
 */
function filterKeys(obj, filter) {
	return Object.keys(obj).filter((key) => key !== filter)
}

/**
 * create the dataset item
 * @param {String} label dataset item label
 * @param {Array} data
 * @return {Object} dataset item
 */
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

/**
 * generate the chart datasets from the provided data
 * @return {Array} the chart datasets
 */
function generateDatasets() {
	const dataWithTotal = addTotalToDATA()
	const filteredKeys = filterKeys(dataWithTotal[0], "period")
	const datasets = filteredKeys.map((label) => generateDatasetItem(label, dataWithTotal))
	return datasets
}

/**
 * generate the chart config data containing the datasets and labels
 * @return {Object}
 */
function generateGraphData() {
	const labels = getGraphLabels()
	const datasets = generateDatasets()
	return {
		labels,
		datasets,
	}
}

/**
 * create the chart
 * @return {Chart} our chart with the data provided
 */
export function generateGraph(context) {
	const data = generateGraphData()
	return new Chart(context, {
		type: "line",
		data,
	})
}
