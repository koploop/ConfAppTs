import React from "react";

// 使用 单例模式 存储全局数据
export class AppManager {

  private static instance: AppManager;

  private constructor(
    public deviceCode?: string,
    public terminalType?: string,
    public version?: string,
    public randomString?: string,

    public publicKey?: string
  ) {};

  public static sharedInstance() {
    if (!this.instance) {
      this.instance = new AppManager();
    }
    return this.instance;
  }
}


// 使用 static 存储全局数据
// export class AppManager2 {
//   static deviceCode: string = '';
//   static terminalType: string = '';
//   static version: string = '';
//   static randomString: string = '';
// }

/*
* 单例模式 与 static 的区别？
* 首先两种方式都可以实现需要的功能，只不过实现的思想和方式有很大的区别。
*
* static的实现方式简单粗暴，不实例对象。无实例、无状态、但是缺点很明显，它并没有保证全局只有一个实例。
* 如果该类中全部为static倒也无所谓，因为不需要实例。但是如果有非static的成员变量或函数，那它就存在使用不当的风险
*
* 单例模式则是面向对象的一种实现方式，有实例。并且能保证实例唯一。
* 
*/