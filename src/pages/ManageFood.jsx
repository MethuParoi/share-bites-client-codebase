import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ManageFood = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "ShareBites | Manage Food";
    document.title = pageTitle;
  }, [location]);

  const sendReq = () => {
    axios.get("http://localhost:3000/jwt-get", {
      withCredentials: true,
    });
  };
  return (
    <div>
      ManageFood
      <button onClick={sendReq}>send</button>
    </div>
  );
};

export default ManageFood;

// const ManageFood = () => {
//   const location = useLocation();
//   const { user } = useContext(AuthContext);

//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const pageTitle = "usePopcorn | Favorite Movies";
//     document.title = pageTitle;
//   }, [location]);

//   useEffect(() => {
//     // Fetch both movies and favorites in parallel
//     const fetchFavorites = async () => {
//       try {
//         const [allMoviesRes, favoritesRes] = await Promise.all([
//           axios.get(
//             "https://assignment-10-server-three-theta.vercel.app/all-movies"
//           ),
//           axios.get(
//             `https://assignment-10-server-three-theta.vercel.app/favorite-movie/${user.email}`
//           ),
//         ]);

//         const allMovies = allMoviesRes.data;
//         const favoriteIds = favoritesRes.data.movies;

//         // Filter the favorite movies
//         const favMovies = allMovies.filter((movie) =>
//           favoriteIds.includes(movie._id)
//         );

//         setFavorites(favMovies);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching favorite movies:", error);
//         setLoading(false);
//       }
//     };

//     if (user?.email) {
//       fetchFavorites();
//     }
//   }, [user?.email]);

//   const handleRemoveFavorite = (movieId) => {
//     setFavorites((prevFavorites) =>
//       prevFavorites.filter((movie) => movie._id !== movieId)
//     );
//   };

//   return (
//     <div>
//       {loading && <Loader className="z-50 fixed top-1/2 left-1/2" />}
//       <h2 className="text-3xl font-semibold text-center my-8 border-b-2 border-gray-400 w-[250px] mx-auto">
//         Favorite Movies
//       </h2>
//       {!loading && favorites.length === 0 && (
//         <h2 className="text-3xl font-semibold text-center text-gray-600 mt-16">
//           No favorite movies found!
//         </h2>
//       )}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-y-16 justify-items-center my-16 xl:max-w-[1300px] mx-auto">
//         {favorites.map((movie) => (
//           <FavoriteMovieCards
//             key={movie._id}
//             movie={movie}
//             onRemoveFavorite={handleRemoveFavorite}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageFood;
