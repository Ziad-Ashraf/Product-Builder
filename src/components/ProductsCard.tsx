import { txtSlicer } from '../utilities/function';
import Button from './Button';
import CircleColor from './CircleColor';
import Image from './Image';
import { IProduct } from './interfaces';

interface Iprops {
    product: IProduct,
    setEdit: (product: IProduct) => void,
    isOpenModalCheck: () => void,
    idx: number,
    setEditIdx: (value: number) => void,
    openConfirmModal: () => void
}

const ProductsCard = ({product, setEdit, isOpenModalCheck, idx ,setEditIdx, openConfirmModal} : Iprops) => {
    const {title, description, imageURL, price, colors, category} = product;
    const renderProductColors = colors.map(color => (<CircleColor key={color} color={color} /> ))
    if (<CircleColor key={''} color=''/>) { 

    }
    const onEdit = () => {
        setEdit(product);
        isOpenModalCheck();
        setEditIdx(idx);
    }
    
    const onRemove = () => {
        openConfirmModal();
        setEdit(product);
    }

    return (
        <>
        <div className={'max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col text-center'}>
            <Image imageURL={imageURL} alt={category.name} className={'rounded-md mb-2 h-52 w-full lg:object-cover'} />
            <h2 className={'font-bold'}>{title}</h2>
            <p>{txtSlicer(description)}</p>

        <div className={"flex items-center gap-2 my-4 justify-center"}>
        {renderProductColors.length > 0 ? renderProductColors : <span className='font-medium'>No colors Available</span>}

        </div>
        <div className={'flex items-center justify-between'}>
                <span>{price}$</span>
                <div className='flex items-center gap-2'>
                    <span className='font-semibold'>{category.name}</span>
                    <Image imageURL= {category.imageURL} alt={category.name} className={"w-10 h-10 rounded-full object-cover"}/>
                </div>
        </div>
        <div className={'flex gap-4 mt-3'}>
            <Button className={'bg-indigo-500 hover:bg-indigo-700'} onClick={onEdit}>Edit</Button>
            <Button className={'bg-red-500 hover:bg-red-700'} onClick={onRemove}>Remove</Button>
        </div>
        </div>
        </>
    );
}

export default ProductsCard;
