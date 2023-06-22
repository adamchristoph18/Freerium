import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AllQuestions from "./components/AllQuestions";
import SpaceQuestions from "./components/SpaceQuestions";
import QuestionShow from "./components/QuestionShow";
import UserProfilePage from "./components/UserProfilePage";
import PageNotFound from "./components/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.session);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="whole-site">
      {isLoaded && (
      <>
        {
          user ? (
            <>
              <Navigation isLoaded={isLoaded} />
              <Switch>
                <Route exact path="/"><AllQuestions /></Route>
                <Route path="/questions/:questionId"><QuestionShow /></Route>
                <Route path="/spaces/:spaceId/all-questions"><SpaceQuestions /></Route>
                <Route path="/profile"><UserProfilePage user={user} /></Route>
                <PageNotFound />
              </Switch>
              <Footer />
            </>
          ) : (
            <>
              <SplashPage />
            </>
          )
        }
      </>
      )}
    </div>
  );
}

export default App;
