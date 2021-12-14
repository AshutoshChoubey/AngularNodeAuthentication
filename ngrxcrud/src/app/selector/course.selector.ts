import { createSelector } from "@ngrx/store";
interface courseInterface {
    cName: string, cDes?: string, cPrice: number, cOffer?: number, cId: string
}

export const cName =(state: courseInterface) => state.cName;
export const cDes =(state: courseInterface) => state.cDes;

export const cNameSe= createSelector(
    cName,
    cDes,
    (cName: string, cDes: string) => {
        
          return {cName,cDes};
        
      }
)