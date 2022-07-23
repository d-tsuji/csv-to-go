import { useState } from "react";
import styled from "styled-components";
import { Table, TBody, Tr } from "./CommonStyled";
import { CSV2Struct } from "./CSV2Struct";

export const Input: React.FC<{}> = () => {
	const [value, setValue] = useState<string>('');

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(CSV2Struct(e.target.value))
	}

	return (
		<Table>
			<TBody>
				<Tr>
					<Td><InputTextArea name='input' placeholder="Paste CSV here" onChange={handleChange}></InputTextArea></Td>
					<Td><OutputTextArea name='output' placeholder="Go will appear here" value={value} readOnly></OutputTextArea></Td>
				</Tr>
			</TBody>
		</Table >
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

const OutputTextArea = styled(TextArea)`
background: #E0EBF5;
`

const Td = styled.td`
width: 50%;
vertical-align: top;
`
