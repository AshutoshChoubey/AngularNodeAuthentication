import { createReducer, createSelector, on } from "@ngrx/store";
import { addCourse, getAllCourse, deleteCourse } from "../action/course.action";

interface courseInterface {
    cName: string, cDes?: string, cPrice: number, cOffer?: number, cId: string
}

const initialState: courseInterface[] = [{ cName: "Angular", cPrice: 5000, cId: "1" }]

export const _courseReducer = createReducer(initialState,
    on(addCourse, (state, course) => {
        return [...state, course];
    }),
    on(getAllCourse, state => [...state]),
    on(deleteCourse, (state, { cId }) => {
        return state.filter(val => val.cId !== cId)
    }),
);
export function courseReducer(init, action) {
    return _courseReducer(init, action)
}
//  export courseSelector = createSelector()