import React from 'react';

import Table from './Components/Table';
import styled from 'styled-components';
import Nav from '../../components/Nav';
import TokenSymbol from '../../components/TokenSymbol';
import { Button } from '@material-ui/core';

const Container = styled.div`
  background-image: url('./background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`;
const Card = styled.div`
  color: white !important;
  width: 80%;
  margin: auto;
  margin-bottom: 1rem;
  backdrop-filter: blur(6px);
  border-radius: 25px;
  border: 2px solid rgba(114, 140, 223, 1);
  padding: 1rem;
  background-color: rgba(35, 40, 75, 0.75);
`;
const Title = styled.h2`
  margin: 1rem 0 0 0;
  text-align: center;
`;
const Dashboard = () => {
  return (
    <Container>
      <Nav />
      <Card variant="outlined">
        <Title>Bomb Finance Summary</Title>
        <hr />

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', margin: 'auto' }}>
          <div style={{ width: '40%' }}>
            <Table />
          </div>
          <div style={{ width: '20%', flexDirection: 'column', textAlign: 'center', color: 'white', padding: '10px' }}>
            <p style={{ fontSize: '16px', margin: '0', fontWeight: '100' }}>Current Epoch</p>
            <p style={{ fontSize: '32px', margin: '0' }}>258</p>
            <hr />
            <p style={{ fontSize: '32px', margin: '0' }}>03:38:36</p>
            <p style={{ fontSize: '16px', margin: '0', fontWeight: '100' }}>Next Epoch in</p>
            <hr />
            <p style={{ fontSize: '16px', margin: '0', fontWeight: '100', padding: '2px' }}>Live TWAP:1.17</p>
            <p style={{ fontSize: '16px', margin: '0', fontWeight: '100', padding: '2px' }}>TVL:$5,002,412</p>
            <p style={{ fontSize: '16px', margin: '0', fontWeight: '100', padding: '2px' }}>Last Epoch TWAP:1.22</p>
          </div>
        </div>
      </Card>

      <Card>
        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '20px', margin: '1px', padding: '1px' }}>
              Bomb Farms
              <br />
              <div style={{ fontSize: '14px', margin: '4px' }}>
                Stake your LP tokens in our farms to start earning $BSHARE
              </div>
              <br />
            </p>
          </div>
          <div style={{ border: '2px solid white', borderRadius: '16px', padding: '4px 32px' }}>Claim All</div>
        </div>
        {/* Bomb btcb */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '20px', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
            <TokenSymbol symbol="BOMB-BNB-LP" size={28} />
            <span style={{ padding: '4px' }}>BOMB-BTCB</span>
            <span
              style={{
                fontSize: '10px',
                background: 'rgba(0, 232, 162, 0.5)',
                padding: '2px',
                borderRadius: '5px',
                height: '12px',
              }}
            >
              Recommended
            </span>
          </div>
          <div style={{ fontSize: '20px', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
            TVL:$1,008,430
          </div>
        </div>
        <hr />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <table style={{ textAlign: 'center', borderSpacing: '12px', width: '40%' }}>
            <th>Daily Returns:</th>
            <th>Your Stack</th>
            <th>Earned:</th>
            <tr>
              <td>2%</td>
              <td>124.21</td>
              <td>6.4413</td>
            </tr>
            <tr>
              <td></td>
              <td>≈ $1171.62</td>
              <td>≈ $298.88</td>
            </tr>
          </table>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            {/* href={buyBombAddress} */}
            <button
              style={{
                margin: '5px',
                padding: '6px 24px 6px 8px',
                borderRadius: '16px',
                background: 'none',
                color: 'white',
                border: ' 2px solid white',
              }}
            >
              Deposit
            </button>
            {/* href={buyBombAddress} */}
            <button
              style={{
                margin: '5px',
                padding: '6px 24px 6px 8px',
                borderRadius: '16px',
                background: 'none',
                color: 'white',
                border: ' 2px solid white',
              }}
            >
              Withdraw
            </button>
            {/* href={buyBombAddress} */}
            <button
              style={{
                margin: '5px',
                padding: '6px 24px 6px 8px',
                borderRadius: '16px',
                background: 'none',
                color: 'white',
                border: ' 2px solid white',
              }}
            >
              Claim Rewards
            </button>
          </div>
        </div>
        <hr style={{ border: '1px solid rgba(0, 173, 232, 1)' }} />

        {/* Bshare -bnb */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px' }}>
          <div style={{ fontSize: '20px', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
            <TokenSymbol symbol="BOMB-BNB-LP" size={28} />
            <span style={{ padding: '4px' }}>BSHARE-BNB</span>
            <span
              style={{
                fontSize: '10px',
                background: 'rgba(0, 232, 162, 0.5)',
                padding: '2px',
                borderRadius: '5px',
                height: '12px',
              }}
            >
              Recommended
            </span>
          </div>
          <div style={{ fontSize: '20px', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
            TVL:$1,008,430
          </div>
        </div>
        <hr />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <table style={{ textAlign: 'center', borderSpacing: '12px', width: '40%' }}>
            <th>Daily Returns:</th>
            <th>Your Stack</th>
            <th>Earned:</th>
            <tr>
              <td>2%</td>
              <td>124.21</td>
              <td>6.4413</td>
            </tr>
            <tr>
              <td></td>
              <td>≈ $1171.62</td>
              <td>≈ $298.88</td>
            </tr>
          </table>

          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            {/* href={buyBombAddress} */}
            <button
              style={{
                margin: '5px',
                padding: '6px 24px 6px 8px',
                borderRadius: '16px',
                background: 'none',
                color: 'white',
                border: ' 2px solid white',
              }}
            >
              Deposit
            </button>
            {/* href={buyBombAddress} */}
            <button
              style={{
                margin: '5px',
                padding: '6px 24px 6px 8px',
                borderRadius: '16px',
                background: 'none',
                color: 'white',
                border: ' 2px solid white',
              }}
            >
              Withdraw
            </button>
            {/* href={buyBombAddress} */}
            <button
              style={{
                margin: '5px',
                padding: '6px 24px 6px 8px',
                borderRadius: '16px',
                background: 'none',
                color: 'white',
                border: ' 2px solid white',
              }}
            >
              Claim Rewards
            </button>
          </div>
        </div>
      </Card>

      <Card>
        <div style={{ float: 'inline-end' }}>
          <TokenSymbol symbol="BBOND" size={40} />
          <span style={{ fontSize: '20px' }}>BONDS <br/></span>
          <span>BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</span>
        </div>
      </Card>
    </Container>
  );
};
export default Dashboard;
