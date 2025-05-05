import React from 'react'
import '../css/Product.css'
import { useNavigate } from 'react-router-dom';

function Product({product}) {
    const {id, price, title, image, description} = product;
    const navigate = useNavigate();

  return (
    <div className='card'>
        <img className='image' src={image} alt=''/>
        <div>
            <p style={{textAlign:'left', height:'70px'}}>{title}</p>
            <h3 style={{textAlign:'left'}}>{price} ₺</h3>
        </div>
        <div style={{textAlign:'left'}}>
            <button onClick={()=> navigate('/product-detail/' + id)} className='btn'>İncele</button>
        </div>
    </div>
  )
}

export default Product