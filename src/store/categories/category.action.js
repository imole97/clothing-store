import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPE } from "./category.types";

export const setCategories = (categoriesArray) => 
createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categoriesArray)

export const fetchCategoriesStart = () => 
createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START)