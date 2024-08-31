/**自动生成pet代码*/

export default class PetEntity {
   public sex: number;
   public value: object;
   public remark: object;
}

// 可根据情况自定义或继承使用
export interface IPetEntity {
   sex?: number;
   value?: object;
   remark?: object;
}