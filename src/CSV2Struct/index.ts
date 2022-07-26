import camelcase from "camelcase";
import { parse } from "papaparse";

type column = {
	fieldName: string
	fieldType: string
}

type result = {
	struct: string
	error?: Error
}

const csvParseError = new Error('CSV parse error.')

export const CSV2Struct = (csvText: string): result => {
	if (!csvText) {
		return { struct: '' }
	}

	const res = parse(csvText, {
		dynamicTyping: true,
	});

	if (res.errors.length > 0) {
		return { struct: '', error: csvParseError }
	}

	// The first line is for a CSV field.
	const columnRow = res.data[0] as object
	const columnCount = Object.keys(columnRow).length
	let columns: column[] = new Array(columnCount)

	Object.values(columnRow).forEach((field, i, _) => {
		columns[i] = { fieldName: field as string, fieldType: '' }
	})

	res.data.forEach((r, i, _) => {
		if (i === 0) return

		Object.values(r as object).forEach((v, j, _) => {
			if (columnCount <= j) return

			const typ = goType(v)

			if (!columns[j].fieldType) {
				columns[j].fieldType = typ
				return
			}

			if (typ === columns[j].fieldType) {
				return
			}

			// If there are multiple possible type candidates, use interface{}.
			columns[j].fieldType = 'interface{}'
		})
	})

	// Completion of missing values
	for (let v of columns) {
		if (v.fieldType === '') { v.fieldType = 'interface{}' }
	}

	let output: string = ''
	output = output.concat('type AutoGenerated sturct {\n')

	try {
		for (const value of columns) {
			const x = camelcase(value.fieldName, { pascalCase: true });
			output = output.concat(`\t${x} ${value.fieldType} \`csv:"${value.fieldName}"\``)
			output = output.concat('\n')
		}
	} catch (e) {
		return { struct: '', error: csvParseError }
	}

	output = output.concat('}')

	return { struct: output }
}


// https://github.com/mholt/json-to-go/blob/master/json-to-go.js
const goType = (val: any): string => {
	if (val === null)
		return 'interface{}';

	switch (typeof val) {
		case 'string':
		case 'object':
			// time objects are matched using papaparse-converted strings
			if (/(Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{2}\s+\d{4}\s+\d{2}:\d{2}:\d{2}/.test(val))
				return 'time.Time';
			else
				return 'string';
		case 'number':
			if (val % 1 === 0) {
				if (val > -2147483648 && val < 2147483647)
					return 'int';
				else
					return 'int64';
			}
			else
				return 'float64';
		case 'boolean':
			return 'bool';
		default:
			return 'interface{}';
	}
}
