"use client";
import { useEffect, useState } from "react";
import { options } from "../page";
// import { Link } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { MdArrowForwardIos, MdKeyboardArrowDown } from "react-icons/md";
import { Genre, movieDetail } from "../types/types";
type target = {
  value: string;
};
type Event = {
  target: target;
};
type Props = {
  results?: movieDetail[];
  mode?: boolean;
};

// type results = {
//   results: data[];
// };
type data = theMovie[];
type theMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export const SearchBar = (props: Props) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<movieDetail[]>();
  const [genreData, setgenreData] = useState<Genre[]>();
  const [toggleGenreButton, setToggleGenreButton] = useState(false);
  const [searchButton, setSearchButton] = useState<boolean>(false);
  const input = (e: Event) => {
    const value: string = e.target.value;
    // console.log("input", e);
    // if()
    setSearch(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`,
        options
      );
      const data = await res.json();
      setData(data.results);
      // console.log("searching data", data);
    };
    fetchData();
  }, [search]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list`,
        options
      );
      const genre_data = await res.json();
      // console.log("fetched data", genre_data);
      setgenreData(genre_data.genres);
    };
    fetchData();
  }, []);
  //   const results = data.results;
  // console.log("checking the damn data", data);
  // console.log("genre data", genreData);

  const ResultDiv = (props: Props) => {
    const theMovies = props?.results;
    return (
      <div
        className={`border-border overflow-hidden rounded-xl xp-3 shadow-2xl ${
          search && `bg-white`
        } xl:flex xl:flex-col absolute xl:gap-1 z-10 left-[-75px] xl:left-[0]`}>
        {theMovies ? (
          theMovies
            .map((theMovie) => (
              <div key={theMovie.id}>
                <Link
                  className="w-[335px] p-2 relative flex border-b-2 border-gray-200"
                  href={`/movie/${theMovie.id}`}>
                  <div>
                    <Image
                      width="50"
                      height="50"
                      alt="movie poster on search result"
                      className="w-16 h-25"
                      src={
                        theMovie.poster_path
                          ? `https://image.tmdb.org/t/p/original${theMovie.poster_path}`
                          : `https://placehold.co/286x429?text=no+pic+lol`
                      }
                    />
                  </div>
                  <div className="flex flex-col justify-evenly ">
                    <h1 className="">{theMovie.title}</h1>
                    <div className="flex">
                      <Image
                        width="50"
                        height="50"
                        alt="movie rating star on search result"
                        className="w-5"
                        src="/img/rating.svg"
                      />
                      <div>
                        {Math.floor(theMovie.vote_average * 10) / 10}/10
                      </div>
                    </div>
                    <div>{theMovie.release_date}</div>
                    <div className="absolute bottom-0 flex items-center gap-2  right-0">
                      See more <FaArrowRight />
                    </div>
                  </div>
                </Link>
              </div>
            ))
            .slice(1, 5)
        ) : (
          <div className=" w-[335px] h-[200px] p-2 border-b-2 border-gray-200">
            No Results
          </div>
        )}
        {theMovies && search && (
          <Link
            href={`/search?query=${search}&include_adult=false&language=en-US&page=1`}>
            See all results for "{search}"
          </Link>
        )}
      </div>
    );
  };
  const AllCategories = () => {
    return (
      <div
        className={`xl:w-[577px] xl:h-[333px] p-5 flex flex-col gap-12 absolute border-border z-10 ${
          props.mode ? `bg-black` : `bg-white`
        } `}>
        <div className="flex flex-col gap-2">
          <h1 className="font-extrabold text-xl">Genres</h1>
          <p>See lists of movies by genre</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {genreData &&
            genreData.map((genre) => (
              <div key={genre.id}>
                <Link
                  href={`/badge/${genre.name}/${genre.id}?language=en-US&page=1`}>
                  <div
                    key={genre.id}
                    className="border-border border rounded-xl flex items-center gap-2 px-2 text-sm font-semibold">
                    {genre.name} <MdArrowForwardIos />
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const handleSearchButton = () => {
    setSearchButton(!searchButton);
    // console.log(searchButton);
  };
  const handleGenreButton = () => {
    setToggleGenreButton(!toggleGenreButton);
  };
  return (
    <>
      {data && (
        <>
          <div className="flex gap-4 items-center">
            <div className="relative">
              <button
                onClick={handleGenreButton}
                className="bg-background border border-[#e4e4e7] py-2 px-4 rounded-md shadow-sm xl:rounded-md items-center gap-1 hidden xl:flex">
                <MdKeyboardArrowDown />
                Genre
              </button>
              {toggleGenreButton && <AllCategories />}
            </div>

            <div className="content-center relative">
              <div
                className={`relative ${
                  searchButton ? `flex` : `hidden sm:block`
                } items-center gap-2 w-full`}>
                <button
                  onClick={handleSearchButton}
                  className="text-gray-400 block sm:hidden">
                  X
                </button>
                <input
                  onChange={input}
                  placeholder="Search"
                  className="w-full h-full shadow-sm py-2 px-4 border lg:w-[360px] xl:rounded-md"
                />
              </div>

              {/* <div className="relative w-full bg-none"></div> */}

              <button
                onClick={handleSearchButton}
                className={`sm:hidden ${searchButton ? `hidden` : `block`}`}>
                <Image
                  width="500"
                  height="700"
                  alt="search"
                  className="w-9"
                  src="/img/search.png"
                />
              </button>
              <ResultDiv results={data} />
            </div>
          </div>
        </>
      )}
    </>
  );
};
