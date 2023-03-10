import React from 'react';

//Graveyard ecosystem logos
import bombLogo from '../../assets/img/bomb.png';
import tShareLogo from '../../assets/img/bshares.png';
import bombLogoPNG from '../../assets/img/bomb.png';
import xbombLogo from '../../assets/img/xbomb.png';
import busmLogo from '../../assets/img/busm-256.png'
import tShareLogoPNG from '../../assets/img/bshares.png';
import tBondLogo from '../../assets/img/bbond.png';

import bombFtmLpLogo from '../../assets/img/bomb-bitcoin-LP.png';
import bshareFtmLpLogo from '../../assets/img/bshare-bnb-LP.png';
import busmBusdLpLogo from '../../assets/img/busm-busd-lp.png';
import upwardLogo from '../../assets/img/upward.png';
import downwardLogo from '../../assets/img/down-arrow.png';
import docsLogo from '../../assets/img/docs.png';
import discordLogo from '../../assets/img/discord.png';

import purchaseLogo from '../../assets/img/cart.png';



import bnbLogo from '../../assets/img/bnb.png';
import btcLogo from '../../assets/img/BCTB-icon.png';

import metamaskLogo from '../../assets/img/metamask.png';


const logosBySymbol: {[title: string]: string} = {
  //Real tokens
  //=====================
  BOMB: bombLogo,
  BOMBPNG: bombLogoPNG,
  BSHAREPNG: tShareLogoPNG,
  XBOMB: xbombLogo,
  BSHARE: tShareLogo,
  BBOND: tBondLogo,
  BUSM: busmLogo,
  WBNB: bnbLogo,
  BOO: bnbLogo,
  SHIBA: bnbLogo,
  ZOO: bnbLogo,
  CAKE: bnbLogo,
  SUSD: bnbLogo,
  SBTC: btcLogo,
  BTCB: btcLogo,
  BTC: btcLogo,
  SVL: bnbLogo,
  META : metamaskLogo,
  UP :upwardLogo,
  DOWN:downwardLogo,
  PURCHASE:purchaseLogo,
  DISCORD: discordLogo,
  DOCS : docsLogo,
  'BOMB-BNB-LP': bombFtmLpLogo,
  'BOMB-BTCB-LP': bombFtmLpLogo,
    '80BOMB-20BTCB-LP': bombFtmLpLogo,

  'BSHARE-BOMB-LP': bombFtmLpLogo,
  'BOMB-BSHARE-LP': bombFtmLpLogo,
  'BUSM-BUSD-LP': busmBusdLpLogo,

  'BSHARE-BNB-LP': bshareFtmLpLogo,
    '80BSHARE-20WBNB-LP': bshareFtmLpLogo,
  'BSHARE-BNB-APELP': bshareFtmLpLogo,
  'BOMB-BTCB-APELP': bombFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({symbol, size = 64}) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
