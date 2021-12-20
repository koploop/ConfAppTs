import React from 'react';

import { EasyToast } from './toast';
import { EasyLoading } from './loading';


export default class HUD {

  // constructor(props) {
  //   super(props);
  //   let timerHandle = 0;
  // }

  static timerHandle = 0;

  static loading() {
    EasyLoading.show();
  }

  static toast(text: string) {
    if (EasyLoading.onShow == false) {
      EasyToast.show(text);
      return;
    }

    // if (EasyLoading.onShow) {
      EasyLoading.dismiss();
      this.timerHandle = setTimeout(() => {
        EasyToast.show(text);
        clearTimeout(this.timerHandle);
      }, 500);
    // }
  }

  static hide() {
    EasyLoading.dismiss();
    EasyToast.hide();
  }
}