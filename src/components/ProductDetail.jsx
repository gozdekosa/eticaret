import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slices/productSlice';
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

function ProductDetail() {
    const {id} = useParams();
    const {products, selectedProduct} = useSelector((store)=> store.product)

    const {price, title, image, description} = selectedProduct;

    const [count, setCount] = useState(0);

    const dispatch = useDispatch();

    const increment = ()=>{
        setCount(count+1);
    }

    const decriment = ()=>{
        if (count > 0) {
            setCount(count - 1);
        }
    }

    const addBasket =()=>{
        const payload = {
            id,
            price,
            title,
            image,
            description,
            count
        }
        dispatch(addToBasket(payload));
        dispatch(calculateBasket());
    }

    useEffect(()=>{
        getProductById();
    }, [])

    const getProductById = ()=>{
        products && products.map((product)=>{
            if(product.id == id){
                dispatch(setSelectedProduct(product))
            }
        })
    }
  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'1rem'}}>
        <div>
            <img className='image' src={image} alt=''/>
        </div>
        <div style={{marginLeft:'2rem'}}>
            <h1>{title}</h1>
            <p>{description}</p>
            <h2 style={{textAlign:'left'}}>{price} ₺</h2>
            <div style={{ display:'flex', alignItems:'center'}}>
                <FaPlusCircle onClick={increment} style={{fontSize:'35px', marginRight:'5px'}}/><span style={{fontSize:'30px'}}>{count}</span><FaMinusCircle onClick={decriment} style={{fontSize:'35px', marginLeft:'5px'}}/>
            </div>
            <div>
                <button onClick={addBasket} style={{marginTop:'15px', padding:'10px', background:'pink', border:'none', cursor:'pointer'}}>Sepete Ekle</button>
            </div>
        </div>
    </div>
  )
}

export default ProductDetail