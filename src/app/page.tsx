"use client"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store/base.store'
import Link from 'next/link'
import { ChefHat, Share2, Video, MessageSquareMore } from 'lucide-react'


export default function landinPage() {
  return (
    <div className="landing-container  w-full min-h-screen  scroll-smooth">
      {/* navbar */}
      <nav className="header bg-white w-full h-[70px] py-4 px-6 flex items-center justify-end z-50 relative">
        <ul className="flex items-center gap-8 font-bold mx-8">
          <li className="hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-200 ease-in-out ">
            <Link href="/" >
              Home
            </Link>
          </li>
          <li className="hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-200 ease-in-out ">
            <Link href="#features" >
              Features
            </Link>
          </li>
          <li className="hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-200 ease-in-out ">
            <Link href="#benefits" >
              Benifits
            </Link>
          </li>
          <li className="hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-200 ease-in-out ">
            <Link href="#CTA" >
              CTA
            </Link>
          </li>
          <li className="hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-200 ease-in-out ">
            <Link href="#FAQ" >
              FAQ
            </Link>
          </li>
          <li className="hover:text-primary hover:border-b-2 hover:border-primary transition-colors duration-200 ease-in-out ">
            <Link href="#footer" >
              Contact
            </Link>
          </li>
        </ul>
        <ul className="btm flex items-center gap-8 font-bold">
          <li>
            <button className="w-[112px] h-[46px] bg-primary text-white rounded-lg
            hover:bg-[#D86300] transition-all duration-500 ease-in-out">
              <Link href="/sign-up">
              Sign up
              </Link>
            </button>
          </li>
          <li>
            <button className="w-[112px] h-[46px] border-primary border-2 text-primary rounded-lg
            hover:bg-[#FFEADF] transition-all duration-500 ease-in-out">
              <Link href="/sign-in">
              Log in
              </Link>
            </button>
          </li>
        </ul>
      </nav>
      {/* content */}
      {/* first-section */}
      <div className="first relative pb-[50px]">
        <div className="img w-full">
          <Image 
          src="image 12.svg" alt="background" width={1440} height={900}>
          </Image>
        </div>
        <div className="texts absolute inset-0 text-center flex flex-col justify-center items-center">
          <h1 className="text-blod font-bold text-6xl leading-tight">
            Where Algeria eats,<br />connects, and shares
          </h1>
          <p className="text-gray-700 text-[20px] pt-5">
          DZ Food Community brings together home cooks, professional chefs, and local <br />restaurants in one place. Share recipes, discover neighborhood spots, 
          order meals,<br /> and join a community that understands food the way you do.
          </p>
          <ul className="btm flex items-center gap-8 mt-5 font-bold">
          <li>
            <button className="w-[112px] h-[46px]  bg-primary text-white rounded-lg
            hover:bg-[#D86300] transition-all duration-500 ease-in-out">
              <Link href="/">
              Explore
              </Link>
            </button>
          </li>
          <li>
            <button className="w-[112px] h-[46px] bg-transparent border-primary text-primary border-2 rounded-lg
            hover:bg-[#FFEADF] transition-all duration-500 ease-in-out">
              <Link href="/sign-in">
              Log in
              </Link>
            </button>
          </li>
        </ul>
        </div>
      </div>
      {/* second-section */}
      <div id="features" className="second flex flex-col py-[50px] pl-6">
        <div className="header flex flex-col text-center justify-center items-center pb-8">
          <p className=" text-gray-700 font-normal text-[15px] ">Order</p>
          <h2 className="text-blod font-bold text-5xl leading-tight">
            Find restaurants nearby and <br />order with ease
          </h2>
          <p className="text-gray-700 text-[15px] pt-5">
          Browse local restaurants in your neighborhood. Filter by cuisine type, price <br />
          range, or ratings to find exactly what you want. Order online and track your <br />
          meal from kitchen to door.
          </p>
        </div>
        <div className="cont2 grid grid-cols-2 pt-8 items-center">
          <div className="max-w-[550px]">
            <div className="px-4 py-2 border-b-2 border-black ">
              <h2 className="font-medium text-4xl">
              Filter by price and rating
              </h2>
              <p className="text-gray-700 text-[15px] pt-5">
              See what others loved. Sort by cost and star ratings to find 
              <br />restaurants that match your budget and taste.
              </p>
            </div>
            <div className="px-4 py-2 border-b-2 border-black ">
              <h2 className="font-medium text-4xl">
              Track your order in real time
              </h2>
              <p className="text-gray-700 text-[15px] pt-5">
              Watch your meal move through the kitchen and across the city.
              <br /> Know exactly when it arrives at your door.
              </p>
            </div>
            <div className="px-4 py-2  ">
              <h2 className="font-medium text-4xl">
              Search by cuisine type
              </h2>
              <p className="text-gray-700 text-[15px] pt-5">
              Find traditional dishes, fast food, sweets, or healthy options. Every 
              <br />restaurant is tagged so you discover exactly what you crave.
              </p>
            </div>
          </div>
          <div className="image relative">
            <Image src="threepic.svg" alt="three pictures" width={737} height={462} className="">
            </Image>
          </div>
        </div>
        <div className="cont2 grid grid-cols-2 pt-[200px] items-center">
          <div className="">
          <p id="community"className="text-gray-700 text-[20px] py-5">
            Community
          </p>
            <h2 className="font-medium text-4xl">
            More than food, it&apos;s<br /> connection
            </h2>
          </div>
          <p className="pl-10">
          Share your recipes and food stories with people who get it. Read honest
          <br /> reviews from real eaters. Compete in cooking challenges and earn rewards 
          <br />that mean something. This is where Algeria&apos;s food lovers gather.
          </p>
        </div>
        <div id="benefits" className="cont3 grid grid-cols-4 pt-[200px] items-center ">
          <div>
            <MessageSquareMore size={30}></MessageSquareMore>
            <h3 className="font-bold text-xl pt-10 pb-2">Real reviews from real <br /> people</h3>
            <p className="font-normal text-gray-700">Honest ratings and comments help you 
              <br />choose well and help restaurants
              <br /> improve.</p>
          </div>
          <div>
            <Video size={30}></Video>
            <h3 className="font-bold text-xl pt-10 pb-2">Share your recipes and <br />photos</h3>
            <p className="font-normal text-gray-700">Post your creations and watch others
              <br /> try them. Get feedback from home
              <br /> cooks and professional chefs alike.</p>
          </div>
          <div>
            <Share2 size={30}></Share2>
            <h3 className="font-bold text-xl pt-10 pb-2">Weekly cooking <br />challenges</h3>
            <p className="font-normal text-gray-700">Compete for recognition and rewards.
              <br /> Show off your best dish and earn points 
              <br />toward restaurant discounts.</p>
          </div>
          <div>
            <ChefHat size={30}></ChefHat>
            <h3 className="font-bold text-xl pt-10 pb-2">Quick videos <br />and tips <br /> </h3>
            <p className="font-normal text-gray-700">Learn fast recipes and cooking tricks
              <br /> from people who know. Watch short
              <br /> videos that teach you something real.</p>
          </div>
        </div>
      </div>
      {/* third-section */}
      <div id="CTA"className="third flex flex-col py-[50px] pl-6">
        <div className="header2 flex flex-col text-center justify-center items-center pb-8 pt-[200px]">
        <h2 className="text-blod font-bold text-5xl leading-tight">
          Start eating better today
        </h2>
          <p className="text-gray-700 text-[15px] pt-5">
          Sign up now to order meals, share recipes, or grow your restaurant business with us.
          </p>
          <ul className="btm flex items-center gap-8 mt-5 font-bold pt-4">
          <li>
            <button className="w-[112px] h-[46px]  bg-primary text-white rounded-lg
            hover:bg-[#D86300] transition-all duration-500 ease-in-out">
              <Link href="/sign-up">
              Sign up
              </Link>
            </button>
          </li>
          <li>
            <button className="w-[112px] h-[46px] border-primary text-primary border-2 rounded-lg
            hover:bg-[#FFEADF] transition-all duration-300 ease-in-out">
              <Link href="/sign-in">
              Log in
              </Link>
            </button>
          </li>
        </ul>
        </div>
        <div className="cont py-8 text-center justify-center items-center">
          <Image src="eat.svg" width={1312} height={957} alt="eat">
          </Image>
        </div>
      </div>
      {/* fourth-section */}
      <div id="FAQ"className="fourth flex flex-col py-[50px] pl-6">
      <div className="header3 flex flex-col text-center justify-center items-center pb-8 pt-[200px]">
        <h2 className="text-blod font-bold text-5xl leading-tight">
          Questions
        </h2>
          <p className="text-gray-700 text-[15px] pt-5">
          Find answers about ordering, sharing recipes, and using our platform to <br />connect with food lovers.
          </p>
        </div>
        <div className="cont py-8 text-left justify-center items-center mx-auto max-w-2xl">
        <div className="question pb-10">
          <h2 className="text-blod font-normal text-3xl leading-tight"> 
          How do I order food?
          </h2>
          <p className="text-gray-700 text-[15px] pt-3">
          Search for restaurants near you by location or cuisine type. Browse their menus, add dishes to your cart, and pay 
          <br />securely. You&apos;ll track your order from the kitchen to your door in real time.
          </p>
        </div>
        <div className="question pb-10">
          <h2 className="text-blod font-normal text-3xl leading-tight"> 
          Can I post my own recipes?
          </h2>
          <p className="text-gray-700 text-[15px] pt-3">
          Yes. Upload photos of your dishes, write the recipe, and tag the cuisine type. Other cooks will rate your work and
          <br /> share their own versions. It&apos;s how we learn from each other.
          </p>
        </div>
        <div className="question pb-10">
          <h2 className="text-blod font-normal text-3xl leading-tight"> 
          What are cooking challenges?
          </h2>
          <p className="text-gray-700 text-[15px] pt-3">
          Weekly competitions where you submit your best dish. Win points that convert to restaurant discounts. It&apos;s friendly
          <br /> competition that rewards real cooking talent.
          </p>
        </div>
        <div className="question pb-10">
          <h2 className="text-blod font-normal text-3xl leading-tight"> 
          How do restaurants benefit?
          </h2>
          <p className="text-gray-700 text-[15px] pt-3">
          Restaurants get a dashboard showing daily sales, visitor counts, top dishes, and customer feedback. They see
          <br /> which meals sell best and when traffic peaks. Smart alerts warn them about low stock or negative reviews.
          </p>
        </div>
        <div className="question pb-10">
          <h2 className="text-blod font-normal text-3xl leading-tight"> 
          Is there a cost to join?
          </h2>
          <p className="text-gray-700 text-[15px] pt-3">
          No. Signing up as a home cook or restaurant is free. You only pay when you order food or choose premium 
          <br />features for your restaurant page.
          </p>
        </div>
      </div>
      <div className="help text-center justify-center items-center pb-8 ">
          <h2 className="text-blod font-bold text-5xl leading-tight">
            Need more help ?
          </h2>
          <p className="text-gray-700 text-[15px] py-6">
            Reach out to our support team anytime.
          </p>
          <button className="w-[112px] h-[46px] border-primary text-primary border-2 rounded-lg 
          hover:bg-[#FFEADF] transition-all duration-300 ease-in-out">
              <Link href="/">
              Contact
              </Link>
            </button>
      </div>
      </div>
      {/* footer */}
      <div id="footer"className=" bg-white w-full py-4 px-6 items-center pt-[200px]">
        <div className="one  grid grid-cols-3 py-5">
          <div className="logo">
              LOGO
          </div>
          <div className="list">
          <ul className="flex items-center gap-8 font-bold mx-8">
          <li className="hover:text-primary transition-colors duration-200 ease-in-out ">
            <Link href="#community" >
              Community
            </Link>
          </li>
          <li className="hover:text-primary transition-colors duration-200 ease-in-out ">
            <Link href="#features" >
              Order
            </Link>
          </li>
          <li className="hover:text-primary transition-colors duration-200 ease-in-out ">
            <Link href="#footer" >
              Contact
            </Link>
          </li>
          <li className="hover:text-primary transition-colors duration-200 ease-in-out ">
            <Link href="/" >
              Get Start
            </Link>
          </li>
        </ul>
          </div>
          <div className="contact">
            <ul className="flex items-center justify-end gap-2 font-bold mx-8">
              <li>
                <Image src="whatsapp.svg" width={24} height={24} alt="whatsApp">
                </Image>
              </li>
              <li>
                <Image src="snapchat.svg" width={24} height={24} alt="snapchat">
                </Image>
              </li>
              <li>
                <Image src="facebook.svg" width={24} height={24} alt="facebook">
                </Image>
              </li>
              <li>
                <Image src="instagram.svg" width={24} height={24} alt="insta">
                </Image>
              </li>
              <li>
                <Image src="telegram.svg" width={24} height={24} alt="telegram">
                </Image>
              </li>
            </ul>
          </div>
        </div>
        <div className="two grid grid-cols-2 pt-[100px] ">
          <div className="copyRight">
          © 2026 DZ Community Food. All rights reserved.
          </div>
          <div className="list">
          <ul className="flex items-center gap-8 font-bold mx-8 justify-end">
          <li className="hover:text-primary transition-colors duration-200 ease-in-out ">
            <Link href="/" >
              Privacy Policy
            </Link>
          </li>
          <li className="hover:text-primary transition-colors duration-200 ease-in-out ">
            <Link href="/" >
              Terms of services
            </Link>
          </li>
          <li className="hover:text-primary transition-colors duration-200 ease-in-out ">
            <Link href="/" >
              Cookie settings
            </Link>
          </li>
        </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
