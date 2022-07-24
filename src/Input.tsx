import React, { useState } from "react";
import styled from "styled-components";
import { Table, TBody, Tr } from "./CommonStyled";
import { CSV2Struct } from "./CSV2Struct";

export const Input: React.FC<{}> = () => {
	const [value, setValue] = useState<string>('');
	const [isError, setError] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const res = CSV2Struct(e.target.value)
		setError(false)
		setValue(res.struct)

		if (res.error) {
			setError(true)
			setValue(res.error.message)
		}
	}

	const handleCopy = (e: any) => {
		e.target.select()
		navigator.clipboard.writeText(value)
	}

	return (
		<>
			<Table>
				<TBody>
					<Tr>
						<SideTh>CSV</SideTh>
						<CenterTh>&#8594;</CenterTh>
						<SideTh>Go</SideTh>
					</Tr>
				</TBody>
			</Table >
			<Table>
				<TBody>
					<Tr>
						<Td><InputTextArea name='input' placeholder="Paste CSV here" onChange={handleChange}></InputTextArea></Td>
						<Td>
							<OutputTextArea name='output' placeholder="Go will appear here" value={value} onClick={handleCopy} readOnly isError={isError}></OutputTextArea>
						</Td>
					</Tr>
				</TBody>
			</Table >
		</>
	);
}

const TextArea = styled.textarea`
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
-o-box-sizing: border-box;
box-sizing: border-box;

white-space: pre;
width: 100%;
display: block;
padding: 3%;
font: 14px/1.5em 'Consolas', 'Menlo', 'Monaco', 'Courier New', monospace;
outline: none;
border: none;
resize: vertical;
height: 500px;
height: 65vh;
overflow: scroll;
tab-size: 4;
`

const InputTextArea = styled(TextArea)`
background: #ECF2F5;
border-right: 2px solid #AAA;
`

const OutputTextArea = styled(TextArea) <{ isError: boolean }>`
background: #E0EBF5;
color: ${({ isError }) => isError ? '#FF0000' : '#000000'};
`

const Td = styled.td`
width: 50%;
vertical-align: top;
`

const Th = styled.th`
font: inherit;
padding: 15px;
background: #375EAB;
text-align: center;
color: #FFF;
font-size: 20px;
`

const SideTh = styled(Th)`
width: 45%
`

const CenterTh = styled(Th)`
width: 10%
`

