import axios from 'axios'
import { useEffect, useState } from 'react'

const AllProducts = () => {
  
  const comapany = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
  const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"]

  const [data, setData] = useState([])
  const [category, setCategory] = useState(categories[0])
  
  const getAllProducts = async () => { 
    
    const res = await axios.get(`http://localhost:8000/categories/${category}/products`)
    const data = res.data
    console.log(data)
    return data;
  } 

  useEffect(() => { 
    getAllProducts().then((data) => setData(data));
  },[category])

  return (
    <div>
      <h1 className='font-bold text-3xl'>All Products</h1>

      <div className='gap-2'>
        {categories.map((categor: any) => (
          <button className='m-2 px-4 p-2 bg-gray-200' onClick={() => setCategory(categor)}>{categor}</button>
        )) }
      </div>

      <div className='flex w-full flex-wrap justify-between'>
        {data.map((product: any) => (
          <div key={product.id} className='w-72 bg-slate-100 m-5 p-10 cursor-pointer'>
            <h2><span className='font-bold'>Title:</span> {product.productName}</h2>
            <h4><span className='font-bold'>Price: Rs.</span> {product.price}</h4>
            <p><span className='font-bold'>Discount: Rs.</span> {product.discount}</p>
            <p><span className='font-bold'>Availability:</span> {product.availability}</p>
            <p><span className='font-bold'>Rating:</span> {product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllProducts