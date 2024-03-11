import { useLoaderData } from "react-router-dom";
import { CustomCard } from "../CardComponents/card";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { FilterFavorites } from "../MISC/filterFavorites";

export const FavoritesPage = () => {
  const message = "My Favorites";
  const UserToken = jwtDecode(localStorage.getItem("USER_TOKEN"));
  const data = useLoaderData();
  const [myFavorites, setMyFavorites] = useState(data.cardDataReceived);

  useEffect(() => {
    if (data) {
      setMyFavorites(FilterFavorites(data.favorites, data.cardDataReceived));
    }
  }, [data]);

  return (
    <div className="text-center">
      <CustomCard
        token={UserToken}
        dataFavorites={data.favorites}
        dataCardDataReceived={myFavorites}
        dataLoading={data.loading}
        dataError={data.error}
        pageMessage={message}
      />
    </div>
  );
};
