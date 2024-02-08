import { useEffect } from "react";
import { FeauredCard } from "../CardComponents/featuredCards";
import { Navigate } from "react-router-dom";

export const HomePage = () => {
  useEffect(() => {
    const userToken = localStorage.getItem("USER_TOKEN");

    if (userToken) {
      <Navigate to="/home" replace={true} />;
    }
  }, []);
  return (
    <div className="container">
      <div className="bg-zinc-400 py-6 text-zinc-800 shadow-lg top rounded-b-lg z-10">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-black mb-2 pt-3">
            Welcome to BizSpot: Where Your Business Shines!
          </h1>
          <p className="text-lg mb-4 pl-5 pr-5 pt-3">
            Are you ready to take your professional identity to the next level?
            Look no further than BizSpot, your one-stop destination for creating
            stunning business cards and showcasing your unique brand to the
            world!
          </p>
        </div>
      </div>
      <FeauredCard />
    </div>
  );
};
