import React, { useMemo, useEffect, useCallback } from 'react';
import moment from 'moment';
// import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTP';
import Table from './Components/Table';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import TokenSymbol from '../../components/TokenSymbol';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import ProgressCountdown from '../Boardroom/components/ProgressCountdown';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import uselastEpoch from '../../hooks/useLastEpoch';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import useStatsForPool from '../../hooks/useStatsForPool';

// import { Token } from 'graphql';
import CountUp from 'react-countup';
import { Grid, Typography } from '@material-ui/core';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';
import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';
import useWithdrawCheck from '../../hooks/boardroom/useWithdrawCheck';
import useRedeemOnBoardroom from '../../hooks/useRedeemOnBoardroom';
import useBank from '../../hooks/useBank';

import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useEarnings from '../../hooks/useEarnings';
import useHarvest from '../../hooks/useHarvest';
import useBombStats from '../../hooks/useBombStats';
import useBombFinance from '../../hooks/useBombFinance';
import useShareStats from '../../hooks/usebShareStats';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import Bank from '../../bomb-finance';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBondStats from '../../hooks/useBondStats';
import { useTransactionAdder } from '../../state/transactions/hooks';
import {  BOND_REDEEM_PRICE_BN } from '../../bomb-finance/constants';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
// import

// const cashPrice = useCashPriceInLastTWAP();
// console.log(cashPrice);

// const Data = ({Bank}) => {
//   const earnings = useEarnings(Bank.contract, Bank.earnTokenName, Bank.poolId);
//   const {onReward} = useHarvest(Bank);
//   const bombStats = useBombStats();
//   const tShareStats = useShareStats();

//   const tokenName = Bank.earnTokenName === 'BSHARE' ? 'BSHARE' : 'BOMB';
//   const tokenStats = Bank.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
//   const tokenPriceInDollars = useMemo(
//     () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
//     [tokenStats],
//   );
//   const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
// };
// const history = useHistory();
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
  useEffect(() => window.scrollTo(0, 0));
  const TVL = useTotalValueLocked();
  const cashPrice = useCashPriceInLastTWAP();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const scalingFactor = useMemo(() => (cashPrice ? Number(cashPrice) : null), [cashPrice]);
  const earnings = useEarnings(Bank.contract, Bank.earnTokenName, Bank.poolId);
  const cashStat = useCashPriceInEstimatedTWAP();
  const addTransaction = useTransactionAdder();
  const bombFinance = useBombFinance();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);
  const { onReward } = useHarvest(Bank);
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const bondStat = useBondStats();
  const bombStats = useBombStats();
  const tShareStats = useShareStats();
  const currentEpoch = useCurrentEpoch();
  const lastEpoch =uselastEpoch();

  const bShareBank = useBank('BshareBnbLPBShareRewardPool');
  const bombBTCBBank = useBank('BombBtcbLPBShareRewardPool');

  const statsOnPoolBombBTCB =   useStatsForPool(bombBTCBBank.address);
  console.log(statsOnPoolBombBTCB);
  const statsOnPoolBShare = useStatsForPool(bShareBank);

  const boardroomAPR = useFetchBoardroomAPR();
  const totalStaked = useTotalStakedOnBoardroom();

  const { onRedeem } = useRedeemOnBoardroom();
  const canWithdraw = useWithdrawCheck();

  const liveEpochValue = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);

  const tokenStats = Bank.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
  const tokenPriceInDollars = useMemo(
    () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
    [tokenStats],
  );
  const canClaimReward = useClaimRewardCheck();
  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
  const { to } = useTreasuryAllocationTimes();

  const handleBuyBonds = useCallback(
    async (amount) => {
      try {const tx = await bombFinance?.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
      });}
       catch (err) {
        console.error(err);
      }
    },
    [bombFinance, addTransaction],
  );
  const [approveBSHAREStatus, approveBSHARE] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);
  const [approveBBOMB_BTCBStatus, approveBBOMB_BTCB] = useApprove(bombFinance.BBOMBBTCB, bombFinance.contracts.Boardroom.address);


  const handleRedeemBonds = useCallback(
    async (amount) => {
      try {
      const tx = await bombFinance?.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} BBOND` });
    }
    catch (err) {
      console.error(err);
       
    }},
    [bombFinance, addTransaction],
  );
  // console.log(statsOnPoolBombBTCB.TVL);
  // console.log(statsOnPoolBombBTCB.dailyAPR);
  // console.log(statsOnPoolBombBTCB.yearlyAPR);

  
  return (
    <div>
      <Container>
        <Nav />
        <Card variant="outlined">
          <Title>Bomb Finance Summary</Title>
          <hr />

          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', margin: 'auto' }}>
            <div style={{ width: '40%' }}>
              <Table />
            </div>
            <div
              style={{ width: '20%', flexDirection: 'column', textAlign: 'center', color: 'white', padding: '10px' }}
            >
              <p style={{ fontSize: '16px', margin: '0', fontWeight: '100' }}>Current Epoch</p>
              <Typography>{Number(currentEpoch)}</Typography>
              <p style={{ fontSize: '32px', margin: '0' }}></p>
              <hr />
              <p style={{ fontSize: '32px', margin: '0' }}>
                {' '}
                <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
              </p>
              <p style={{ fontSize: '16px', margin: '0', fontWeight: '100' }}>Next Epoch in</p>
              <hr />
              <p style={{ fontSize: '16px', margin: '0', fontWeight: '100', padding: '2px' }}>
                Live TWAP: {liveEpochValue}
              </p>
              <p style={{ fontSize: '16px', margin: '0', fontWeight: '100', padding: '2px' }}>
                TVL: <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
              </p>
              <p style={{ fontSize: '16px', margin: '0', fontWeight: '100', padding: '2px' }}>
                Last Epoch TWAP: <Typography>{(Number(lastEpoch)/100000000000000).toFixed(5)}</Typography>

              </p>
            </div>
          </div>
        </Card>
        

        <Card style={{ float: 'right', width: '20%', marginRight: '9rem', marginLeft: '2px', height: '23rem' }}>
          <h2>Latest News</h2>
        </Card>

        <span style={{ marginLeft: '9rem', marginBottom: '1rem' }}>
          <div  style={{color:"white",width:"100%",textAlign:"right",marginBottom:"5px"}}>
          <a style={{color:"rgba(158, 230, 255, 1)",padding:"10px"}} href="https://docs.bomb.money/">Read Investment Strategy</a>
          </div>
          <div
            style={{
              cursor: 'pointer',
              color: 'white',
              fontSize: '1.2rem',
              marginLeft: '9rem',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              textAlign: 'center',
              width: '58%',
              backgroundImage: 'linear-gradient(rgba(0, 245, 171, 0.5),rgba(0, 173, 232, 0.5))',
            }}
          >
            <a >Invest Now</a>
          </div>
        </span>
        <div
          style={{
            width: '58%',
            marginTop: '12px',
            display: 'flex',
            marginLeft: '9rem',
            justifyContent: 'space-between',
            textAlign: 'text',
          }}
        >
          <div
            style={{
              cursor: 'pointer',
              fontSize: '1rem',
              textAlign: 'center',
              padding: '16px 40px',
              cursor: 'pointer',
              width: '40%',
              color: 'black',
              backgroundImage: 'linear-gradient(rgba(114, 140, 223, 1),rgba(255, 255, 255, 0.5))',
            }}
          >
            <a style={{color:"white",textDecoration:"none"}} href="https://discord.bomb.money">Chat On Discord</a>
          </div>
          <div
            style={{
              cursor: 'pointer',
              fontSize: '1rem',
              textAlign: 'center',
              padding: '16px 40px',
              width: '40%',
              color: 'black',
              backgroundImage: 'linear-gradient(rgba(114, 140, 223, 1),rgba(255, 255, 255, 0.5))',
            }}
          >
            <a style={{color:"white",textDecoration:"none"}} href="https://discord.bomb.money">Read Docs</a>
          </div>
        </div>
        <Card variant="outlined" style={{ width: '56%', marginLeft: '9rem ', marginTop: '1rem' }}>
          <div className="header">
            <div style={{ flex: 'row', fontSize: '25px' }}>
              {' '}
              <TokenSymbol symbol="BSHARE" size={50} />
              Boardroom
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Stake BSHARE and earn BOMB every epoch</p>
              <div style={{ fontSize: '25px', marginTop: '1.1rem' }}>
                TVL: <CountUp end={TVL} separator="," prefix="$" />
              </div>
            </div>
            <hr style={{ color: 'white' }} />
            <div style={{ textAlign: 'right', margin: '16px' }}>
              Total Staked:
              <TokenSymbol symbol='BSHARE' size={15}/>
              {getDisplayBalance(totalStaked)}
            </div>

            <Grid container rowSpacing={1}>
              <Grid item xs={2}>
                <span style={{ fontSize: '20px' }}>
                  Daily Returns
                  <br />
                  <Typography>{(boardroomAPR / 365).toFixed(2)}%</Typography>
                  <br />
                </span>
              </Grid>
              <Grid item xs={3}>
                <span style={{ fontSize: '20px' }}>
                  Your Stake: <br />
                  {getDisplayBalance(stakedBalance)} {/*To get number of stakes divide by the value of each stake */}
                  <br />≈ ${getDisplayBalance(stakedBalance)}
                </span>
              </Grid>
              <Grid item xs={3}>
                <span style={{ fontSize: '20px' }}>
                  Earned:
                  <br />
                  {getDisplayBalance(earnings)}
                  <br />
                  ≈${earnedInDollars}
                </span>
              </Grid>

              <div style={{ diplay: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      height: '20px',
                      width: '6rem',
                      color: 'white',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      border: '1px solid white',
                      padding: '5px 8px 5px 12px',
                      borderRadius: '20px',
                      margin: '5px',
                      flex: 'row',
                    }}
                    disabled={approveBSHAREStatus !== ApprovalState.NOT_APPROVED}
                    onClick={approveBSHARE}
                  >
                    Deposit &emsp;
                    <TokenSymbol symbol="UP" size={16} />
                  </div>
                  <div
                    style={{
                      height: '20px',
                      width: '6rem',
                      color: 'white',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      border: '1px solid white',
                      padding: '5px 8px 5px 12px',
                      borderRadius: '20px',
                      margin: '5px',
                    }}
                    disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                    onClick={onRedeem}
                  >
                    Withdraw
                    &nbsp;
                    <TokenSymbol symbol="DOWN" size={16} />
                  </div>
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    height: '20px',
                    width: '14rem',
                    color: 'white',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    border: '1px solid white',
                    padding: '5px 8px 5px 10px',
                    borderRadius: '20px',
                    margin: '5px',
                  }}
                  onClick={onReward}
                  disabled={earnings.eq(0) || !canClaimReward}
                >
                  &emsp;Claim Reward
                  &emsp;&emsp;
                    <TokenSymbol symbol="BSHARE" size={18} />
                </div>
              </div>
            </Grid>
          </div>
        </Card>
        <Card>
          <div
            style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between', alignItems: 'center' }}
          >
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
            {/* <div style={{ border: '2px solid white', borderRadius: '16px', padding: '4px 32px' }}>
              Claim All&emsp;
              <TokenSymbol symbol="BSHARE" size={15} />
            </div> */}
            <div
              style={{
                height: '20px',
                color: 'white',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                border: '1px solid white',
                padding: '5px 8px 5px 10px',
                borderRadius: '20px',
                margin: '5px',
              }}
              onClick={onReward}
              disabled={earnings.eq(0) || !canClaimReward}
            >
              Claim All&emsp;
                    <TokenSymbol symbol="BSHARE" size={18} />
            </div>
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
              TVL: 
              <CountUp style={{ fontSize: '25px' }} end={statsOnPoolBombBTCB?.TVL} separator="," prefix="$" />
            </div>
          </div>
          <hr />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ margin: '8px' }}>
                <p></p>
                <p>Daily return:</p>
                <Typography>{statsOnPoolBombBTCB?.dailyAPR}%</Typography>
                <p></p>
              </div>
              <div style={{ margin: '8px' }}>
                <p>Your Stake</p>
                <p>{getDisplayBalance(stakedBalance)}</p>
                <p>≈ ${getDisplayBalance(earnings)}</p>
              </div>
              <div style={{ margin: '8px' }}>
                <p>Earned:</p>
                <p> ${getDisplayBalance(stakedBalance)}</p>
                <p>≈ ${earnedInDollars}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              {/* href={buyBombAddress} */}
              {/* <Button1 text="Deposit" symbol="UP" /> */}
              <div
                style={{
                  height: '20px',
                  color: 'white',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  border: '1px solid white',
                  padding: '5px 8px 5px 10px',
                  borderRadius: '20px',
                  margin: '5px',
                }}
                disabled={approveBBOMB_BTCBStatus !== ApprovalState.NOT_APPROVED}
                onClick={approveBBOMB_BTCB}
              >
                Deposit
                &emsp;
                    <TokenSymbol symbol="UP" size={16} />
              </div>
              {/* href={buyBombAddress} */}
              {/* <Button1 text="Withdraw" symbol="DOWN" />
               */}
              <div
                style={{
                  height: '20px',
                  color: 'white',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  border: '1px solid white',
                  padding: '5px 8px 5px 10px',
                  borderRadius: '20px',
                  margin: '5px',
                }}
                disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                onClick={onRedeem}
              >
                Withdraw
                &emsp;
                    <TokenSymbol symbol="DOWN" size={15} />
              
              </div>
              {/* href={buyBombAddress} */}
              {/* <Button1 text="Claim Rewards" symbol="BSHARE" /> */}
              <div
                style={{
                  height: '20px',
                  color: 'white',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  border: '1px solid white',
                  padding: '5px 8px 5px 10px',
                  borderRadius: '20px',
                  margin: '5px',
                }}
                onClick={onReward}
                disabled={earnings.eq(0) || !canClaimReward}
              >
                Claim Reward
                &emsp;
                    <TokenSymbol symbol="BSHARE" size={16} />
              
              </div>
            </div>
          </div>
          <hr style={{ border: '1px solid rgba(0, 173, 232, 1)' }} />

          {/* Bshare -bnb */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px' }}>
            <div style={{ fontSize: '20px', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
              <TokenSymbol symbol="BSHARE-BNB-LP" size={28} />
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
              TVL: <CountUp style={{ fontSize: '25px' }} end={statsOnPoolBShare?.TVL} separator="," prefix="$" />
            </div>
          </div>
          <hr />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ margin: '12px' }}>
                <p></p>
                <p>Daily return:</p>
                <Typography>{statsOnPoolBShare?.dailyAPR}%</Typography>
              </div>
              <div style={{ margin: '12px' }}>
                <p>Your Stake</p>
                <p>{getDisplayBalance(stakedBalance)}</p>
                <p>≈ ${getDisplayBalance(earnings)}</p>
              </div>
              <div style={{ margin: '12px' }}>
                <p>Earned:</p>
                <p> ${getDisplayBalance(stakedBalance)}</p>
                <p>≈ ${earnedInDollars}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              {/* href={buyBombAddress} */}
              {/* <Button1 text="Deposit" symbol="UP" /> */}
              <div
                style={{
                  height: '20px',
                  color: 'white',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  border: '1px solid white',
                  padding: '5px 8px 5px 10px',
                  borderRadius: '20px',
                  marginBottom: '5px',
                }}
                disabled={approveBSHAREStatus !== ApprovalState.NOT_APPROVED}
                onClick={approveBSHARE}
              >
                Deposit
                &emsp;
                    <TokenSymbol symbol="UP" size={16} />
              </div>
              {/* href={buyBombAddress} */}
              {/* <Button1 text="Withdraw" symbol="DOWN" /> */}
              <div
                style={{
                  height: '20px',
                  color: 'white',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  border: '1px solid white',
                  padding: '5px 8px 5px 10px',
                  margin: '5px',
                  borderRadius: '20px',
                }}
                disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                onClick={onRedeem}
              >
                Withdraw
                &emsp;
                    <TokenSymbol symbol="DOWN" size={15} />
              
              </div>
              {/* href={buyBombAddress} */}
              {/* <Button1 text="Claim Rewards" symbol="BSHARE" /> */}
              <div
                style={{
                  height: '20px',
                  color: 'white',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  border: '1px solid white',
                  padding: '5px 8px 5px 10px',
                  margin: '5px',
                  borderRadius: '20px',
                }}
                onClick={onReward}
                disabled={earnings.eq(0) || !canClaimReward}
              >
                Claim Reward&emsp;
                    <TokenSymbol symbol="BSHARE" size={16} />
              
              </div>
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
              <p style={{ fontSize: '20px', fontWeight: '500' }}>{Number(scalingFactor / 100000000000000)} BTCB</p>
            </div>
            <div style={{ margin: '0 1px', textAlign: 'center', width: '33%' }}>
              <p style={{ fontWeight: 'lighter' }}>Available to redeem:</p>
              <p style={{ fontSize: '30px', fontWeight: '100' }}>
                <TokenSymbol symbol="BBOND" size={36} />
                456
              </p>
            </div>
            <div style={{ width: '33%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '0 8px' }}>
                  <span>Purchase BBond</span>
                  <span>Bom is over peg</span>
                </div>
                <div
                  style={{
                    height: '20px',
                    color: 'white',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    border: '1px solid white',
                    padding: '5px 8px 5px 10px',
                    borderRadius: '20px',
                  }}
                  onClick={handleBuyBonds}
                  disabled={!bondStat || isBondRedeemable}
                >
                  Purchase
                  &emsp;
                    <TokenSymbol symbol="PURCHASE" size={16} />

                </div>
                <hr></hr>
                <div
                  style={{
                    height: '20px',
                    color: 'white',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    border: '1px solid white',
                    padding: '5px 8px 5px 10px',
                    borderRadius: '20px',
                  }}
                  onClick={handleRedeemBonds}
                  disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
                >
                  Redeem
                  &emsp;
                    <TokenSymbol symbol="DOWN" size={16} />
              
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Footer />
      </Container>
    </div>
  );
};
export default Dashboard;
