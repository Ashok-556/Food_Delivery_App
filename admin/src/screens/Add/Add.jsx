import { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import {toast} from 'react-toastify'


const Add = ({url}) => {
  
  const [image, setImage] = useState(false);
  const [data,setData] = useState({
    name:'',
    description: '',
    price :'',
    category:"salad"
  })

  const onChangeHandler=(e)=>{
    const name = e.target.name 
    const value = e.target.value 
    setData(data =>({...data, [name]:value}))
  }

  const onSubmitHandler=async (e)=>{
    e.preventDefault() 
    const formData = new FormData()
    formData.append('image',image)
    formData.append('name',data.name)
    formData.append('description',data.description)
    formData.append('price',data.price)
    formData.append('category',data.category)
    const response = await axios.post(`${url}/api/food/add`,formData)
    if(response.data.success){
      setData({
        name:'',
        description:'',
        price:'',
        category:"Salad"
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }

  }


  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} className='flex-col'>
        <div className="add-img-upload flex-col">
          <p>upload image</p>
          <label htmlFor="image">
          <img src={ image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col" >
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" placeholder='write content here' rows="6"></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category" >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add