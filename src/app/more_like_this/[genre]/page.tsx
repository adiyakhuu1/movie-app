"use client";

import { Loading } from "@/app/_components/movieDetails";
import { Cards } from "@/app/_components/movies";
import { Page } from "@/app/_components/pagination";
import { SearchBar } from "@/app/_components/searchBar";
import { Movie, options } from "@/app/page";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  params: Params;
};
type Params = {
  genre: string;
};
type oneMovieGenre = {
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
type results = oneMovieGenre[];
type movies = {
  results: results;
};
export default function Genre(props: Props) {
  const [data, setData] = useState<movies>();
  const searchParams = useSearchParams();

  const params = useParams();
  const genre: any = params.genre;
  const page = searchParams.get("page");
  console.log("genre  ???", genre);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${genre}?language=en-US&page=${page}`,
        options
      );
      const data: movies = await res.json();
      setData(data);
      console.log("data response", data);

      console.log("checking movies", data.results);
    };
    fetchData();
  }, []);

  const movies = data?.results;
  return (
    <div>
      <div className="navigation">
        <div>
          <div className="flex justify-around py-2">
            <a href="/">
              <div className="flex gap-2 items-center">
                <img className="w-9 h-9" src="/img/film.svg" />
                <h3 className="">Movie</h3>
              </div>
            </a>
            <div className="flex"></div>
            <div className="flex gap-4">
              <SearchBar />
              <button>
                <img className="w-9" src="/img/switch-button.png" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="m-4">
        <div className="upcoming-header flex justify-between">
          <h1 className="text-xl font-extrabold ">
            {genre && genre?.replaceAll("_", " ").toUpperCase()}
          </h1>
          {/* <a href="/upcoming">
          <div>See More</div>
        </a> */}
        </div>
        <div
          key={69}
          className="grid grid-cols-2 gap-5 mx-auto md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
          {movies ? (
            movies.map((movie: Movie, index: number) => (
              <Cards prop={movie} index={index} />
            ))
          ) : (
            <Loading />
          )}
        </div>
        <Page />
      </div>
    </div>
  );
}

// ("use client");
// import { useEffect, useState } from "react";
