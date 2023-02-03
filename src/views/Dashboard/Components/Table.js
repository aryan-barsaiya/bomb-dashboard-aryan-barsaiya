import * as React  from 'react';
// import { useMemo } from 'react';
import styled from 'styled-components';
import '../Dashboard.css';

import usebShareStats from '../../../hooks/usebShareStats';
import { roundAndFormatNumber } from '../../../0x';

import TokenSymbol from '../../../components/TokenSymbol';

const Table = styled.table`
  color: white;
  padding: 10px;
`;

const Th = styled.th`
  color: white;
  padding: 10px;
  border-style: solid;
  border-color: white;
  border-width: 0 0 1px 0;
`;

const Td = styled.td`
  text-align: center;
  color: white;
  padding: 10px;
  border-style: solid;
  border-color: white;
  border-width: 0 0 1px 0;
`;
const Tr = styled.tr`
  color: white;
  padding: 10px;
  border-style: solid;
  border-color: white;
  border-width: 0 0 1px 0;
`;
// const Item = style(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));
console.log("Aryan.Barsaiya");
// const bShareStats = usebShareStats();
console.log("Aryan.Barsaiya");
// const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

export default function BasicTable() {
  return (
    <div>
    <Table>
      <Tr>
        <Th></Th>
        <Th>Current Supply</Th>
        <Th>Total Supply</Th>
        <Th>Price</Th>
      </Tr>
      <Tr>
        <Td>
          <TokenSymbol symbol="BOMB" size={28} />
          $BOMB
        </Td>
        <Td>8.66M</Td>
        <Td>1.69</Td>
        <Td>
          $0.24 <br></br>1.05BTCB
        </Td>
      </Tr>
      <Tr>
        <Td>
          <TokenSymbol symbol="BSHARE" size={28} />
          $BSHARE
        </Td>
        <Td>11.43K</Td>
        <Td>111</Td>
        <Td>
          $300 <br></br> 13000 BTCB
        </Td>
      </Tr>
      <Tr>
        <Td>
          <TokenSymbol symbol="BBOND" size={28} />
          $BBOND
        </Td>
        <Td>20.00K</Td>
        <Td>175K</Td>
        <Td>
          0.28 <br></br> 1.15BTCB
        </Td>
      </Tr>
    </Table>
  </div>
  );
}
