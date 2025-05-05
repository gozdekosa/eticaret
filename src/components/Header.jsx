import React, { useState } from 'react'
import '../css/Header.css'
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';

function Header() {
    const [theme, setTheme] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {products} = useSelector((store) => store.basket);

    const changeTheme = () => {
        const root = document.getElementById('root');
       
        if(theme){
            root.style.backgroundColor = '#fff';
            root.style.color = 'black';
        }
        else{
            root.style.backgroundColor = 'black';
            root.style.color = '#fff';
        }

        setTheme(!theme);
    }


    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection:'row'}} className='header'>
            <div className='flex-row' onClick={()=>navigate('/')}>
                <img className='logo' src='/eticaret/logo.png' />
                <p className='logo-text'>GÖZDE A.Ş.</p>
            </div>

            <div className='flex-row'>
                <input className='search-input' type='text' placeholder='Ara..'/>
                <div>
                    { theme ? <FaMoon className='icon' onClick={changeTheme}/> : <CiLight className='icon' onClick={changeTheme}/>}
                    <Badge onClick={()=> dispatch(setDrawer())} badgeContent={products.length} color="primary">
                        <CiShoppingBasket className='icon'/>
                    </Badge>
                </div>
            
            </div>
        </div>
    )
}

export default Header
