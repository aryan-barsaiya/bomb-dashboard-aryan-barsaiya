import React,{useMemo} from 'react';
// import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTP';
import Table from './Components/Table';
import styled from 'styled-components';
import Nav from '../../components/Nav';
import TokenSymbol from '../../components/TokenSymbol';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
// import Button from './Components/Button';
import { Token } from 'graphql';
import BombImage from '../../assets/img/bomb-512.png';
import CountUp from 'react-countup';
import {Box,Button,Grid,Typography,} from '@material-ui/core';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
// const cashPrice = useCashPriceInLastTWAP();
// console.log(cashPrice);

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
  const TVL = useTotalValueLocked();
  const cashPrice = useCashPriceInLastTWAP();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const scalingFactor = useMemo(() => (cashPrice ? Number(cashPrice) : null), [cashPrice]);
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
      <Button className='button'style={{width:'59%'}}>Zap In</Button>
          <Grid container rowSpacing={1} >
            <Grid item xs={8}> 
                <Button className='button1' style={{width:'49%',marginTop:'30px',marginRight:'5px'}}>Chat On Discord</Button>
                <Button className='button1' style={{width:'49%',marginTop:'30px'}}>Read Docs</Button>
                <Card>
          <img src={BombImage} alt="Bomb.money" style={{ maxHeight: '40px',float:'left',padding:'7px' }} />
          <div className='header'>
          <h3 >Boardroom</h3>
           <p>Stake BSHARE and earn BOMB every epoch&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TVL:  <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" /></p>
           

           <hr  style={{color:'white'}} />
           <Typography style={{marginLeft:'360px'}}>Total Staked: <img src={BombImage} alt="Bomb.money" style={{ maxHeight: '20px',float:'left',marginTop:'0px' }} /></Typography>
         
              <Grid container rowSpacing={1} >
  <Grid item xs={2}>
  <span style={{ fontSize: '20px' }}>
                 Daily Returns<br />
               2% <br />
           
              </span>
  </Grid>
  <Grid item xs={3}>
  <span style={{fontSize: '20px'}}>
              Your Stake: <br />
            6.0000      <br />
             ≈ ${getDisplayBalance(stakedBalance)}
              </span>
  </Grid>
  <Grid item xs={3}>
  <span style={{fontSize: '20px'}}>
  Earned: 
 <br />
1660.4413      <br />
≈ $298.88
              </span>
  </Grid>
  <Grid item xs={4}>
 <Button className='button1' style={{width:'100px',marginTop:'0px',marginRight:'5px'}}>
                  Deposit
                </Button>
                <Button className='button1' style={{width:'100px',marginTop:'0px'}}>
                  Withdraw
                </Button>
                 <Button className='button1' style={{width:'200px',marginTop:'10px'}}>
                  Claim Rewards
                </Button>
  </Grid>
  </Grid>
  </div>
  </Card>
  </Grid>
  </Grid>
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
          <div style={{ border: '2px solid white', borderRadius: '16px', padding: '4px 32px' }}>Claim All&emsp;
          <TokenSymbol symbol='BSHARE' size={15}/></div>
        </div>
        {/* Bomb btcb */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '20px', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
            <TokenSymbol symbol="BOMB-BNB-LP" size={28} />
            <span style={{ padding: '4px' }}>BOMB-BTCB</span>&emsp;
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
            <Button text="Deposit" symbol="UP"/>
            {/* href={buyBombAddress} */}
            <Button text="Withdraw" symbol="DOWN"/>
            {/* href={buyBombAddress} */}
            <Button text="Claim Rewards" symbol="BSHARE"/>
          </div>
        </div>
        <hr style={{ border: '1px solid rgba(0, 173, 232, 1)' }} />

        {/* Bshare -bnb */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px' }}>
          <div style={{ fontSize: '20px', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
            <TokenSymbol symbol="BOMB-BNB-LP" size={28} />
            <span style={{ padding: '4px' }}>BSHARE-BNB</span>
            &emsp;
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
            <Button text="Deposit" symbol="UP"/>
            {/* href={buyBombAddress} */}
            <Button text="Withdraw" symbol="DOWN"/>
            {/* href={buyBombAddress} */}
            <Button text="Claim Rewards" symbol="BSHARE"/>
          </div>
        </div>
      </Card>

      <Card>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TokenSymbol symbol="BBOND" size={40} />
          <div>
            <p style={{ fontSize: '20px', margin: '4px', fontWeight: '400' }}>Bonds </p>
            <p style={{ margin: '4px' }}>
              BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ margin: '0 4px', width: '33%' }}>
            <p style={{ fontWeight: 'lighter' }}>Current Price:(Bomb)^2</p>
            <p style={{ fontSize: '20px', fontWeight: '500' }}>{Number(scalingFactor/100000000000000)} BTCB</p>
          </div>
          <div style={{ margin: '0 4px', textAlign: 'center', width: '33%' }}>
            <p style={{ fontWeight: 'lighter' }}>Available to redeem:</p>
            <p style={{ fontSize: '20px', fontWeight: '500' }}>
              <TokenSymbol symbol="BBOND" size={24} />
              456
            </p>
          </div>
          <div style={{ width: '33%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', margin: '0 8px' }}>
                <span>Purchase BBond</span>
                <span>Bom is over peg</span>
              </div>
              <Button text="Purchase" symbol="PURCHASE"/>

            </div>
            <hr></hr>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ margin: '8px' }}>Redeem Bomb</span>
              <Button text="Redeem" symbol="DOWN"/>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};
export default Dashboard;
