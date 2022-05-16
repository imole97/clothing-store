import {createSelector} from 'reselect'

//get category slice of redux store
const selectCategoryReducer = (state) => state.categories

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories  
)


export const selectCategoriesMap = createSelector(  
    [selectCategories],
    (categories) =>
        categories.reduce((acc,category) => {
        const {title, items} = category
        acc[title.toLowerCase()] = items
        // console.log(acc);
        return acc

    }, {})
)

//createSelector creates a memoized selector