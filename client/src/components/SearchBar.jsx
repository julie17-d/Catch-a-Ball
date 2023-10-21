import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useState } from "react";


const SearchBar = ({ changeSearch }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const searched = (e) => {
    setSearch(e.target.value);
    changeSearch(search);
  };

  const goThere = () => {
    console.log('search :>> ', search);
    return redirect(encodeURIComponent("/Search?user=") + encodeURIComponent(search));
  };

  return (
    <form>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-white sr-only dark:text-white ">
        Search

      </label>

      <div className="relative bg-transparent-500 h-15  rounded-full">

        <input
          type="search"
          id="default-search"
          className="bg-white w-full p-3 pl-10 text-lg  rounded-full opacity-50 outline-none "
          placeholder="Search For Adversaries"
          onChange={(e) => searched(e)}
          value={search}
          required
        />

        <button
          type="submit"
          className="text-white absolute ml-6 opacity-100  "
          onSubmit={goThere}
        >
          <img
            src="se.png"
            alt="search_btn"
            className="ml-6 w-full h-auto"
          />
          Search
        </button>
      </div>
    </form>
  )
}
export default SearchBar;