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
        // console.log(categories)
        categories.reduce((acc,category) => {
        const {title, items} = category
        acc[title.toLowerCase()] = items
        // console.log(acc);
        return acc

    }, {})
)


export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categorySlice) => categorySlice.isLoading
)







//createSelector creates a memoized selector