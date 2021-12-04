
import { Dimensions } from 'react-native';

const deviceWidthDp = Dimensions.get('window').width;
const deviceHeightDp = Dimensions.get('window').height;
console.log('deviceWidthDp', deviceWidthDp, deviceHeightDp);

// 这里的uiWidthPx   uiHeightPx  是你的设计稿的宽高尺寸
let uiWidthPx = 375; 
let uiHeightPx = 667;
console.log('转化比率------', deviceWidthDp / uiWidthPx);

// 如果应用是横屏的用pTd
export const pTd = uiElePx => {
  return (uiElePx * deviceHeightDp) / uiHeightPx;
};

// 如果应用是竖屏的用pTx
export const pTx = uiElePx => {
  return (uiElePx * deviceWidthDp) / uiWidthPx;
};