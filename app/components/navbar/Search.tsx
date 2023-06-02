"use client";
const Search = () => {
  return (
    <div
      className="
            border-[1px]
            w-full
            md:w-auto
            py-2
            rounded-full
            shadow-md
            hover:shadow-lg
            transition
            cursor-pointer
            "
    >
      <div
        className="
        flex
        flex-row
        item-center
        justify-between"
      >
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">Any Week</div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div className="hidden sm:block">Add guests</div>
            <div className="bg-rose-500 p-2 rounded-full text-white">
                
            </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
