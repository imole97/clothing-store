import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

// export const setCategories = (categoriesArray) => 
// createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categoriesArray)

export const fetchCategoriesStart = () => 
createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categoriesArray) => 
createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)

export const fetchCategoriesFailure = (error) => 
createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)

//async action performed in our thunk
export const fetchCategoriesAsync = () => async (dispatch) => {

    dispatch(fetchCategoriesStart())
    try {
        const categoriesArray = await getCategoriesAndDocuments('categories')
        dispatch(fetchCategoriesSuccess(categoriesArray))
        
    } catch (error) {
        dispatch(fetchCategoriesFailure(error))
    }
}