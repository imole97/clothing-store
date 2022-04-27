import DirectoryItem from '../directory-item/directory-item.component'
import './directories.styles.scss'


const Directories = ({categories}) => {
    
    return(
        <div className='directories-container'>
            {categories.map((category) => (
                <DirectoryItem category={category} key={category.id}/>
            ))}
        </div>
    )
}

export default Directories