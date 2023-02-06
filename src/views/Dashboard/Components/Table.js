



import TokenSymbol from '../../../components/TokenSymbol';
import * as React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import '../Dashboard.css';
// import usebShareStats from '../../../hooks/usebShareStats';

import { roundAndFormatNumber } from '../../../0x';
// import TokenSymbol from '../../../components/TokenSymbol';
import useBombStats from '../../../hooks/useBombStats';
import usebShareStats from '../../../hooks/usebShareStats'

import useBondStats from '../../../hooks/useBondStats';

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
  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const tBondStats = useBondStats();
  const bombPriceInDollars = useMemo(
      () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
      [bombStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);
  const bShareCirculatingSupply = useMemo(
      () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
      [bShareStats],
  );
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);


  const tBondPriceInDollars = useMemo(
      () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
      [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
      () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
      [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);


  return (
    <div>
    <Table>
      <Tr>
        <th></th>
        <Th></Th>
        <Th>Current Supply</Th>
        <Th>Total Supply</Th>
        <Th>Price</Th>
      </Tr>
      <Tr>
        <td><TokenSymbol symbol="BOMB" size={28} /></td>
        <Td>$BOMB</Td>
        <Td>{roundAndFormatNumber(bombCirculatingSupply, 2)}</Td>
        <Td>{roundAndFormatNumber(bombTotalSupply, 2)}</Td>
        <Td> ${bombPriceInBNB ? bombPriceInBNB : '-.----'} BTC<br></br>${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'} / BOMB</Td>
        <td><TokenSymbol symbol="META" size={28} /></td>
      </Tr>
      <Tr>
        <td><TokenSymbol symbol="BSHARE" size={28} /></td>
        <Td>$BSHARE</Td>
        <Td>{roundAndFormatNumber(bShareCirculatingSupply, 2)}</Td>
                    <Td>{roundAndFormatNumber(bShareTotalSupply, 2)}</Td>
                    <Td>
                        ${bombPriceInBNB ? bombPriceInBNB : '-.----'} BTC<br></br>  ${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'} / BOMB
                    </Td>
        <td><TokenSymbol symbol="META" size={28} /></td>
      </Tr>
      <Tr>
        <td><TokenSymbol symbol="BBOND" size={28} /></td>
        <Td>$BBOND</Td>
        <Td>{roundAndFormatNumber(tBondCirculatingSupply, 2)} </Td>
                    <Td>{roundAndFormatNumber(tBondTotalSupply, 2)}</Td>
                    <Td>
                        {tBondPriceInBNB ? tBondPriceInBNB : '-.----'} BTC<br></br> ${tBondPriceInDollars ? tBondPriceInDollars : '-.--'} / BBOND
                    </Td>
        <td><TokenSymbol symbol="META" size={28}  /></td>

      </Tr>
    </Table>
  </div>
  );
}
