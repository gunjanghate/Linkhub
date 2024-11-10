import tree from '@/public/assests/image.png'
import Image from 'next/image';

export default function Home() {
  return (
    <main className='text-white'>
    {/* <Navbar/> */}
    <section className='bg-green-800 min-h-[100vh] grid grid-cols-2'>
      <div className="col-1 flex flex-col ml-[10vw] justify-center items-center gap-12">
      <div className="texts">
      <p className='text-2xl font-medium'>Hello All! Welcome to</p>
      <p className='text-3xl font-extrabold'>Linkhub</p>
      </div>  
      <div className="buttons flex gap-2">
        <input className='py-1 px-3 rounded-lg focus:outline-green-800  text-black' type="text" name="" id=""placeholder='linkhub/your-url' />
        <button className="claim px-3 py-1 bg-pink-200 align-middle rounded-full text-black">Claim Your Linkhub!</button>
      </div>
      </div>

      <div className="col-2 flex flex-col mr-[10vw] justify-center items-center">
       <Image
       src={tree}
       className="hover:translate-x-1 hover:rotate-1 hover:shadow-xl transition-all duration-300 h-fit w-fit object-contain"
       height={400}
       width={400}
       alt='tree image'/>
      </div>
      
    </section>
    <section className='bg-red-800 min-h-[100vh]'>

      <p className='text-2xl font-bold'>Hello All! Welcome to</p>
      <p className='text-3xl font-extrabold'>Linkhub</p>
      
    </section>
    </main>
  );
}
