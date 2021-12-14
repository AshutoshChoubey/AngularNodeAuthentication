import { createAction, props } from "@ngrx/store";
interface courseInterface {
    cName: string, cDes?: string, cPrice: number, cOffer?: number, cId: string
}
export const addCourse = createAction('[course component] addCours', props<courseInterface>())
export const getAllCourse = createAction('[course component] getAllCourse')
export const updateCourse = createAction('[course component] updateCourse', props<courseInterface>())
export const deleteCourse = createAction('[course component] deleteCourse',props<{cId:string}>())
