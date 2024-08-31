/**自动生成items代码*/

export default class ItemsEntity {
   public itemName: string;
   public type: number;
   public dataType: string;
   public desc: object;
   public value: number;
   public shop: number;
   public resName: string;
}

// 可根据情况自定义或继承使用
export interface IItemsEntity {
   itemName?: string;
   type?: number;
   dataType?: string;
   desc?: object;
   value?: number;
   shop?: number;
   resName?: string;
}