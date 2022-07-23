import styled from 'styled-components'
import { Table, TBody, Tr } from './CommonStyled';

export const Header: React.FC<{}> = () => {
	return (
		<Table>
			<TBody>
				<Tr>
					<SideTh>CSV</SideTh>
					<CenterTh>&#8594;</CenterTh>
					<SideTh>Go</SideTh>
				</Tr>
			</TBody>
		</Table >
	);
}

const Th = styled.th`
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

