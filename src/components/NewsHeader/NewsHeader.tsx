import { Search } from "lucide-react";

interface NewsHeaderProps {
    title: string;
}

export const NewsHeader :React.FC<NewsHeaderProps>= ({title})=>{
    return (
        <header className="flex flex-row items-center justify-between p-5 bg-[#171717]">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <div className="hidden sm:flex flex-row justify-between items-center p-2 pl-6 bg-[#e2e2e237] rounded-full w-3/5 lg:w-4/6 ">
          <input
            className="text-white bg-transparent outline-none"
            placeholder="Search a news..."
            type="text"
          />
          <button className="text-white p-2 rounded-full hover:bg-[#ffffff26] cursor-pointer transition duration-100">
            <Search className="text-white" width={20} height={20} />
          </button>
        </div>
      </header>
    )    
}