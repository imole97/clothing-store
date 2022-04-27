// import Categories from "./components/categories/categories.component";
import { Outlet } from "react-router-dom";
import Directories from "../../components/directory/directories.component";




const Home = () => {



    return (
        <div>
            <Directories/>
            <Outlet/>
        </div>
    );
    }

export default Home;
