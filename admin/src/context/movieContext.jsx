import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//context
const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  //state
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);

  //get posts
  const getAllMovie = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/movie/");
      setLoading(false);
      setPosts(data?.movie);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // inintal  posts
  useEffect(() => {
    getAllMovie();
  }, []);

  return (
    <MovieContext.Provider value={[movie, setMovie, getAllMovie]}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext, MovieProvider };
