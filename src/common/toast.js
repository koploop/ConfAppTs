import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Toast from 'react-native-root-toast';


export class EasyToast {

  static singleToast = null;

  static show(text) {
    EasyToast.hide();
    EasyToast.singleToast = Toast.show(text, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      }
    });
  }

  static hide() {
    if (EasyToast.singleToast) {
    Toast.hide(EasyToast.singleToast);
    EasyToast.singleToast = null;
    }
  }
  
}


