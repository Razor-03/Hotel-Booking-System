import { IoIosArrowDropleft, IoIosArrowDropright, IoIosClose } from "react-icons/io";
import { useState } from "react";

export default function Slider({ images }) {
    const [imageIndex, setImageIndex] = useState(null);
    const changeImage = (direction) => {
        if (direction === 'left') {
            if (imageIndex === 0) {
                setImageIndex(images.length - 1);
            } else {
                setImageIndex(imageIndex - 1);
            }
        } else {
            if (imageIndex >= images.length - 1) {
                setImageIndex(0);
            } else {
                setImageIndex(imageIndex + 1);
            }
        }
    }
    return (
        <div className="slider flex w-full h-content gap-1 max-h-80 lg:gap-10">
            {
                imageIndex !== null && (
                    <div className="fullSlider z-50 flex justify-between items-center absolute w-screen h-screen top-0 left-0 bg-[#000]">
                        <div className="arrow basis-1/12 flex justify-center hover:cursor-pointer ">
                            <IoIosArrowDropleft className="text-white" size={25} onClick={() => changeImage('left')} />
                        </div>
                        <div className="imgContainer basis-10/12 w-full h-full">
                            <img src={images[imageIndex]} alt="" className="w-full h-full object-contain lg:object-cover" />
                        </div>
                        <div className="arrow basis-1/12 flex justify-center hover:cursor-pointer">
                            <IoIosArrowDropright className="text-white" size={25} onClick={() => changeImage('right')}/>
                        </div>
                        <div className="close text-white absolute top-0 right-0 p-3 hover:cursor-pointer">
                            <IoIosClose size={35} onClick={()=> {setImageIndex(null)}}/>
                        </div>
                    </div>
                )
            }
            <div className="bigImage basis-4/6">
                <img src={images[0]} alt="slider-image" className="h-full w-full object-cover rounded-md" onClick={() => setImageIndex(0)} />
            </div>
            <div className="smallImages basis-2/6 flex flex-col gap-1 sm:gap-4">
                {
                    images.slice(1).map((image, index) => (
                        <img key={index} src={image} alt="slider-image" className="h-36 object-cover w-full rounded-md" onClick={() => setImageIndex(index+1)} />
                    ))
                }
            </div>
        </div>
    )
}