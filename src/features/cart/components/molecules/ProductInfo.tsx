import { IProductInfo } from "../../types/props.types";

export const ProductInfo = ({ name, price, description }: IProductInfo) => (
  <div className=" w-full ">
    <div className=" w-full">
      <div className=" bg-white border border-gray-200 rounded-lg px-3 py-1 shadow-sm">
        <span className="text-[15px] font-bold text-gray-950 whitespace-nowrap">
          Product name:
        </span>
        <span className="text-[15px] text-gray-600 truncate">
          {name}
        </span>
      </div>

      <div className=" items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1 shadow-sm">
        <span className="text-[15px] font-bold text-gray-950 whitespace-nowrap">
          Price:
        </span>
        <span className="text-[15px] text-gray-800 font-bold">
          {price} DA
        </span>
      </div>
    </div>

    <div className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm">
      <span className="text-[15px] font-bold text-gray-950 block mb-0.5">
        Description:
      </span>
      <p className="text-[15px] text-gray-500 leading-tight">
        {description}
      </p>
    </div>
  </div>
);