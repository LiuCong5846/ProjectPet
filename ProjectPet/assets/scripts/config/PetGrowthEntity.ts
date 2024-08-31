/**自动生成petGrowth代码*/

export default class PetGrowthEntity {
   public exp: number;
   public hungry: number;
   public clean: number;
   public mood: number;
   public health: number;
}

// 可根据情况自定义或继承使用
export interface IPetGrowthEntity {
   exp?: number;
   hungry?: number;
   clean?: number;
   mood?: number;
   health?: number;
}