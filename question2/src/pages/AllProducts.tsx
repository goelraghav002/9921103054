import axios from 'axios'
import { useEffect, useState } from 'react'

const AllProducts = () => {

  const [data, setData] = useState([])

  const getAllProducts = async () => { 

    const res = await axios.get(`http://localhost:8000/categories/Laptop/products`)
    const data = res.data
    console.log(data)
    return data;
  } 

  useEffect(() => { 
    // getAllProducts().then((data) => setData(data));
  },[])

  return (
    <div>
      <h1 className='font-bold text-3xl'>All Products</h1>

      <div className='flex w-full flex-wrap justify-between'>
        {data.map((product: any) => (
          <div key={product.id} className='w-72 bg-slate-100 m-5 p-10'>
            <h2>Title: {product.productName}</h2>
            <h4>Price: {product.price}</h4>
            <p>Discount: {product.discount}</p>
            <p>Availability: {product.availability}</p>
            <p>Rating: {product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllProducts