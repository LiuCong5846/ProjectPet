/**自动生成petJob代码*/

export default class PetJobEntity {
   public type: number;
   public typeDesc: string;
   public jobType: number;
   public money: number;
   public minutes: number;
   public schoolId: object;
   public level: number;
}

// 可根据情况自定义或继承使用
export interface IPetJobEntity {
   type?: number;
   typeDesc?: string;
   jobType?: number;
   money?: number;
   minutes?: number;
   schoolId?: object;
   level?: number;
}