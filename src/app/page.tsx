import Image from 'next/image'


export default function landinPage() {
  return (
    <div className="landing-container  w-full min-h-screen  ">
      {/* background  */}
      <div className="background ">
        <div className="radial-glow-bottom absolute left-0 top-[-50px]
        w-[500px] h-[500px] 
          bg-[#ffb86b] opacity-20 
          blur-3xl rounded-full">   
          </div>
        <div className="radial-glow-top absolute right-0 top-1/2 -translate-y-1/2
        w-[500px] h-[500px] 
          bg-[#ffb86b] opacity-20 
          blur-3xl rounded-full">
          </div>
      </div>
      {/* header  */}
      <div className="header px-6 py-2 border-b-2 border-gray-200 sticky top-0 z-50 ">
        {/* <img src="" alt="" /> */}
        <div className="ul-sign flex flex-col items-end gap-4 ">
          <ul>
            <li ><button className="log w-[185px] h-[35px] my-1 border-2 bg-gray-300 border-black rounded-full text-[15px] text-primary font-bold flex justify-center items-center"><a href="">LOG IN</a></button></li>
            <li><button className="sign w-[185px] h-[35px] my-1 border-2 bg-[#FFD2A9] border-primary rounded-full text-[15px] text-black font-bold flex justify-center items-center"><a href="">SIGN UP</a></button></li>
          </ul>
        </div>
      </div>
      <section className="content  flex items-center  z-[-1] ">
      <div className="mx-auto px-8 grid grid-cols-1 md:grid-cols-2 items-center ">
        {/* LEFT SIDE */}
        <div className="left-side relative  justify-center w-full ">
          <h1 className="left-side  text-6xl font-semibold leading-tight text-black pb-[50px]">
            Make Your <br />
            <span className="text-primary">Dream</span> <br />
            Food with us
          </h1>
          <div className="card relative w-[625px] h-[175px]">
            <Image
            src="/200k.svg"
            alt="girl"
            fill
            className=" absolute object-contain -bottom-[50px] "
            />
          </div>
          
        </div>
        {/* RIGHT SIDE */}
        <div className="right-side relative flex justify-center w-full h-[100vh] ">
          <div className="girl absolute w-full h-full top-[-100px] left-[100px]">
            <Image
            src="/girl.svg"
            alt="girl"
            width={900}
            height={373.73}
            className=" object-contain top-[-100px]"
            />
            <div className="absolute top-[-100px] left-0 w-full h-full">
            <Image
            src="/sub-girl.svg"
            alt="burger"
            width={170}
            height={45}
            className="absolute bottom-[150px] left-[7.25rem] z-10"
          />
          </div>
          </div>
          <div className="best absolute bottom-[100px] left-0 z-10">
            <Image
            src="/best.svg"
            alt="burger"
            width={605}
            height={181}
            className="object-contain left-2"
          />
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
