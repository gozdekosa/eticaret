import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux'
import { calculateBasket, deleteFromBasket, setDrawer } from './redux/slices/basketSlice'

function App() {

  const {products, drawer, totalAmount} = useSelector((store) => store.basket)

  const dispatch = useDispatch();

  return (
    <>
      <PageContainer>
        <Loading/>
        <Header />
        <RouterConfig/>
        <Drawer anchor='right' open={drawer} onClose={()=> dispatch(setDrawer())}>
          {
            products && products.map((product) => {
              return(
                <div key={product.id}>
                  <div className='flex-row'>
                    <img src={product.image} width={50} height={50}/>
                    <p style={{width:'300px'}}>{product.title}({product.count})</p>
                    <p style={{ width:'50px' }}>{product.price}</p>
                    <button  
                    onClick={() => {
                      dispatch(deleteFromBasket(product));
                      dispatch(calculateBasket());
                    }}
                    style={{ background:'red', padding:'5px', marginLeft:'5px', marginRight:'5px', border:'none', borderRadius:'5px', color:'#fff' }}>Sil</button>
                  </div>
                </div>
              )
            })
          }
          <div>
            <h1>Toplam tutar: {totalAmount}</h1>
          </div>
        </Drawer>
      </PageContainer>
    </>
  )
}

export default App
