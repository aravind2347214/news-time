import { Search } from "lucide-react"

interface NewsFilterProps{
    newsCategories:Array<string>
}

export const NewsFilter :React.FC<NewsFilterProps> = ({newsCategories})=>{
    return(
        <section className="flex flex-col p-2">
        <div className="flex sm:hidden flex-row justify-between items-center p-1 pl-6 bg-[#acacac57] rounded-full w-full">
          <input
            className="text-black bg-transparent outline-none"
            placeholder="Search a news..."
            type="text"
          />
          <button className=" p-2 rounded-full hover:bg-[#ffffff26] cursor-pointer transition duration-100">
            <Search className="text-black" width={20} height={20} />
          </button>
        </div>
        <div className="flex overflow-x-auto sm:flex-wrap gap-2 p-4 md:justify-start max-w-full">
          {newsCategories.map((filter: string) => (
            <button className="px-6 md:py-2 border text-xs md:text-sm  rounded-full hover:bg-[#e5e5e5] transition duration-100">
              {filter}
            </button>
          ))}
        </div>
      </section>
    )
}

