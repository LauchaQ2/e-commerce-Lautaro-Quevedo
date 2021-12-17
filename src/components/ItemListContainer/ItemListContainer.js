import React, {useState, useEffect} from 'react';
import '../ItemListContainer/ItemListContainer.css';
import Item from '../Item/Item.js';
import Container from 'react-bootstrap/Nav';
import ItemList from '../ItemList/ItemList';
import { apiURL } from '../../config';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../CategoriesBanner/CategoriesBanner.css';
import { Button } from '@mui/material';



export default function ItemListContainer(){
    const {category} = useParams();
    const [loader, setLoader] = useState(true)
    const [products, setProducts] = useState([])
    const [activeCategory, setActiveCategory] = useState('all')
    const categories = ['vino', 'cerveza']

    useEffect(() => {
        fetch(apiURL)
        .then(response =>{
          return response.json();
        })
        .then(data =>{
          setProducts(data.filter((data) => (category === 'all' || activeCategory === 'all') ? data : data.category === activeCategory))
          setTimeout( () => {
            setLoader(false)
          }, 2000);
          
 
        })
    },[ category, activeCategory ])
 
    return(
        <div>
          <div className='row'>
            <div className="col-md-6 d-flex align-items-center">
              <h2 className='titlehome text-left mb-2'>PRODUCTOS</h2>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <h4 className='text-left mb-2 mr-5'>CATEGORÍAS</h4>
              <h6 className='text-left mb-2 mr-3'>
              <Link style={{color: "#000000"}} onClick={()=>{setActiveCategory('all')}} to={`/category/all`}>
              TODOS
              </Link>
              </h6>
              {
                categories.map((category) => {
                    return(
                      <h6 className='text-left mb-2 mr-3'>
                        <Link style={{color: "#000000"}}
                        onClick={()=>{setActiveCategory(category)}} 
                        to={`/category/${category}`}
                        key={category}>

                             
                            {category}

                        </Link>
                        </h6>
                    )
        
                })
            }
                
            </div>
          </div>
            {
                
            loader
                  ?
                    <div className='text-center'>
                    <CircularProgress />
                    </div>
                  :
                  <><ItemList products={products} />
                  </>
            }
            
        </div>
    )
}