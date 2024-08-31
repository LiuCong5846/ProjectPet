/**自动生成petSchool代码*/

export default class PetSchoolEntity {
   public type: number;
   public typeDesc: string;
   public schoolName: string;
   public course: string;
   public counts: number;
   public minutes: number;
}

// 可根据情况自定义或继承使用
export interface IPetSchoolEntity {
   type?: number;
   typeDesc?: string;
   schoolName?: string;
   course?: string;
   counts?: number;
   minutes?: number;
}