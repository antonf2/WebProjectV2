import { useLoaderData } from "react-router-dom";
import { CustomCard } from "../CardComponents/card";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { FilterMyCards } from "../MISC/filterMyCards";

export const MyCards = () => {
  const message = "My Cards";
  const UserToken = jwtDecode(localStorage.getItem("USER_TOKEN"));
  const data = useLoaderData();
  const [myCards, setMyCards] = useState([]);

  useEffect(() => {
    if (data) {
      setMyCards(FilterMyCards(data.cardDataReceived, UserToken));
    }
  }, [data]);
  return (
    <div className="text-center mb-5">
      <CustomCard
        token={UserToken}
        dataFavorites={data.favorites}
        dataCardDataReceived={myCards}
        dataLoading={data.loading}
        dataError={data.error}
        pageMessage={message}
      />
    </div>
  );
};
