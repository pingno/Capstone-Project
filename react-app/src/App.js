import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";

import Navigation from "./components/Navigation";
import AlbumsList from "./components/AlbumsList";
import AlbumPage from "./components/AlbumPage"
import UserPage from "./components/UserPage"
import LandingPage from "./components/LandingPage";

import ShowPostModal from "./components/ShowPostModal";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          

          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route exact path="/home">
            <AlbumsList />
          </Route>

          <Route exact path="/albums/:albumId">
            <AlbumPage />
          </Route>

          <Route exact path="/users/:userId">
            <UserPage />
          </Route>

          <Route exact path="/posts/:postId">
            <ShowPostModal />
          </Route>

          

        </Switch>
      )}
    </>
  );
}

export default App;
