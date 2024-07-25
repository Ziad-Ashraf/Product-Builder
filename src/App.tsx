import { ChangeEvent, MouseEvent, useState } from 'react'
import Modal from './components/Modal'
import ProductsCard from './components/ProductsCard'
import { categories, colors, formInputsList, productList } from './components/data'
import { Button, Input } from '@headlessui/react'
import { IProduct } from './components/interfaces'
import { productValidation } from './components/validation/validationFunction'
import Error from './components/Error'
import CircleColor from './components/CircleColor'
import { v4 as uuid } from "uuid"
import SelectDropDown from './components/SelectDropDown'
import { ProductNameTypes } from './components/types'
import toast, {Toaster} from 'react-hot-toast'

function App() {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name : "",
      imageURL: ""
    }
  }

{/*Hooks*/}
  const [products, setProducts] = useState<IProduct[]>(productList);

  const [product, setProduct] = useState<IProduct>(defaultProductObj);
 
  const [edit, setEdit] = useState<IProduct>(defaultProductObj);
  const [editIdx, setEditIdx] = useState<number>(0);
 
  const [errors, setErrors] = useState({ title: "", description: "", imageURL: "", price: ""});
 
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isConfirmModal, setIsConfirmModal] = useState(false)
 
  const [tempColor, setTempColor] = useState<string[]>([]);
 
  const [selected, setSelected] = useState(categories[0]);
  {/*Hooks*/}

{/*Start of Product Functions*/}
const closeModal = () => setIsOpen(false) ;
const openModal = () => setIsOpen(true);

const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const {value, name} = event.target;
  
  setProduct({
    ...product,
    [name]: value,
  })
  
  setErrors({
    ...errors,
    [name] : "",
  })
}
const submitHandler = (event : MouseEvent<HTMLButtonElement>) : void => {
  event.preventDefault();
  const errors = productValidation({
    title : product.title, 
    description : product.description, 
    imageURL: product.imageURL,
    price: product.price
})
  const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");
  if (!hasErrorMsg) {
    setErrors(errors);
    return ;
  } else {
    setProducts(prev => [{...product, id: uuid(), colors: tempColor, category: selected}, ...prev]);
    setProduct(defaultProductObj);
    setTempColor([]);
    closeModal();
    toast("A new product has been added")
  }
}
const onCancelHandler = () => {
  console.log("cancel");
  setProduct(defaultProductObj);
  closeModal();
}
{/*End of Product Functions*/}


{/* Start of Edit Product Functions*/}
const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const {value, name} = event.target;
  
  setEdit({
    ...edit,
    [name]: value,
  });
  
  setErrors({
    ...errors,
    [name] : "",
  })
}
const isCloseModalCheck =() => setIsOpenModal(false);
const isOpenModalCheck = () => setIsOpenModal(true);
const submitEditHandler = (event : MouseEvent<HTMLButtonElement>) : void => {
  event.preventDefault();
  const {title, description, imageURL, price} = edit;
  const errors = productValidation({
    title,
    description,
    imageURL,
    price
})
toast("Product has been edited")
  const hasErrorMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");
  if (!hasErrorMsg) {
    setErrors(errors);
    return;
}
  else {
    const updatedProducts = [...products];
    updatedProducts[editIdx] = {...edit, colors: tempColor.concat(edit.colors)};
    setProducts(updatedProducts);
    setEdit(defaultProductObj);
    setTempColor([]);
    isCloseModalCheck();
  }
}
const onCancelEditHandler = () => {
  console.log("cancel");
  setProduct(defaultProductObj);
  isCloseModalCheck();
}
{/* End of Edit Product Functions*/}

{/* Start of Remove Product Functions*/}
const openCofirmModal = () => setIsConfirmModal(true);
const closeConfirmModal =() => setIsConfirmModal(false);

const removeProductHandler = () => {
  const filtered = products.filter(product => product.id !== edit.id)
  setProducts(filtered);
  closeConfirmModal();
  toast("Product has been removed successfully")
}
{/* End of Remove Product Functions*/}



const renderProductList = products.map((product, idx) => <ProductsCard key={product.id} product={product} setEdit={setEdit} isOpenModalCheck={isOpenModalCheck} idx={idx} setEditIdx={setEditIdx} openConfirmModal={openCofirmModal}/>)

const renderFormInputList = formInputsList.map(input => 

<div className={'flex flex-col'} key={input.id}>
  <label htmlFor={input.id}>{input.label}</label>
  <Input onChange={onChangeHandler} type={input.type} id={input.id} name={input.name} value={product[input.name]} className={'border-2 shadow-md border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-1 focus:ring-indigo-500'}/>
  <Error msg={errors[input.name]} />
</div>
)

const renderProductColors = colors.map(color => <CircleColor key={color} color={color} onClick= {() => {
  if (tempColor.includes(color)) {
    setTempColor(prev => prev.filter(item => item !== color));
    return;
  }
  if (edit.colors.includes(color)) {
    setTempColor(prev => prev.filter(item => item !== color));
    return;
  }
  setTempColor(perv => [...perv, color])}
} />)

const renderProductsEditWithErrMsg = (id: string, label: string, name: ProductNameTypes) => {
  return (
    <div className={'flex flex-col'}>
    <label htmlFor={id}>{label}</label>
    <Input onChange={onChangeEditHandler} type={'text'} id={id} name={name} value={edit[name]} className={'border-2 shadow-md border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-1 focus:ring-indigo-500'}/>
    <Error msg={''} />
    </div>
  )
}
  return (
    <>
    <div className="mt-2 inset-0 flex items-center justify-center">
      <button
        type="button"
        onClick={openModal}
        className="bg-indigo-400 rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white outline-none">
        Add Product
      </button>
    </div>``
    {/*Add Product Modal*/}
    <Modal isOpen={isOpen} closeModal={closeModal} openModal={openModal} title='Add A New Product'>
  
      <form className={"space-y-3"}>
      {renderFormInputList}
      <SelectDropDown selected={selected} setSelected={setSelected}/>
      <div className={"flex items-center gap-2 my-4 justify-center flex-wrap"}>

      {tempColor.map(color => 
        <span key={color} className={'p-1 mr-1 text-xs rounded-md text-white'} style={{backgroundColor : color}}>{color}</span>
      )}
      </div>
      <div className={"flex items-center gap-2 my-4 justify-center"}>
      {renderProductColors}
      </div>
      <div className={'felx items-center space-x-3'}>
      <Button className={"bg-indigo-500 hover:bg-indigo-700 transition rounded-md p-2 text-white"} onClick={submitHandler}>Submit</Button>
      <Button className={"bg-gray-400 hover:bg-gray-700 transition rounded-md p-2 text-white"} onClick={onCancelHandler}>Cancel</Button>
      </div>
      </form>
    </Modal>

    {/*Edit Product Modal*/}
    <Modal isOpen={isOpenModal} closeModal={isCloseModalCheck} openModal={openModal} title='Edit Your Product'>

      <form className={"space-y-3"}>
        {renderProductsEditWithErrMsg("title", "Product Title", "title")}
        {renderProductsEditWithErrMsg("description", "Product Description", "description")}
        {renderProductsEditWithErrMsg("imageURL", "Product Image URL", "imageURL")}
        {renderProductsEditWithErrMsg("price", "Product Price", "price")}
        <SelectDropDown selected={edit.category} setSelected={(value) => {setEdit({...edit, category : value})}}/>      
      <div className={"flex items-center gap-2 my-4 justify-center"}>
      {renderProductColors}
      </div>
        <div className={"flex items-center gap-2 my-4 justify-center flex-wrap"}>
        {tempColor.concat(edit.colors).map(color => 
        <span key={color} className={'p-1 mr-1 text-xs rounded-md text-white'} style={{backgroundColor : color}}>{color}</span>
        )}
      </div>
      <div className={'felx items-center space-x-3'}>
      <Button className={"bg-indigo-500 hover:bg-indigo-700 transition rounded-md p-2 text-white"} onClick={submitEditHandler}>Submit</Button>
      <Button className={"bg-gray-400 hover:bg-gray-700 transition rounded-md p-2 text-white"} onClick={onCancelEditHandler}>Cancel</Button>
      </div>
      </form>
    </Modal>

    {/*Remove Product Modal*/}
    <Modal isOpen={isConfirmModal} closeModal={closeConfirmModal} title='Are You Sure You Want To Remove This Product From Your Store?'>
      <p className='my-3 text-gray-700'>Removing this product will delete it permenantly, are you sure you want to proceed?</p>
      <div className={'felx items-center space-x-3'}>
      <Button className={"bg-indigo-500 hover:bg-indigo-700 transition rounded-md p-2 text-white"} onClick={removeProductHandler}>Yer, Remove</Button>
      <Button className={"bg-gray-400 hover:bg-gray-700 transition rounded-md p-2 text-white"} onClick={closeConfirmModal}>Cancel</Button>
      </div>
    </Modal>

    <main className={'container'}>
    <div className={"m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md"}>
    {renderProductList}
    </div>
    </main>

    <Toaster />
    </>
  )
}

export default App
