import React from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const MainBanner = () => {
  return (
    <div>
        <img src={assets.main_banner_bg} alt="Main Banner" className='w-full hidden md:block'/>
        <img src={assets.main_banner_bg_sm} alt="Main Banner" className='w-full md:hidden'/>
        <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end
        md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
            <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-5xl font-bold text-center'>Healing from Nature...</h1>
        
            <div>
                <p className='absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg md:text-2xl font-medium text-center'>100% Herbal | Trusted | Safe</p>
                <div className='flex items-center mt-6 font-medium'>
                    <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary
                    hover:bg-primary-dull transition rounded text-white cursor-pointer'>
                        Shop Now
                        <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt='shop now' />
                    </Link>
                    <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'>
                        Exclusive Offers
                        <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt='shop now' />
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MainBanner;