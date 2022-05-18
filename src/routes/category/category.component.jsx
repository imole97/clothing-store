import './category.styles.scss'
import { useParams } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector'
import ProductCard from '../../components/product-card/product-card.component'
import Spinner from '../../spinner/spinner.component'

const Category = () => {

    const {category}  = useParams()
    console.log('render/re-rendering category component');
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState(categoriesMap[category])
    const isLoading  = useSelector(selectCategoriesIsLoading)

    useEffect(() => {
        console.log('effect fired calling set product');
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {
                isLoading? (
                <Spinner/>
                ) : (
                <div className='category-container'>
                {products &&
                    products.map((product) => <ProductCard key={product.id} product={product} /> )
                }
                </div>
                )
            }
        </Fragment>
    )

}

export default Category