import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AllQuestions from "./components/AllQuestions";
import QuestionShow from "./components/QuestionShow";

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
              </Switch>
            </>
          ) : (
            <>
              <Navigation isLoaded={isLoaded} />
              <SplashPage />
            </>
          )
        }
      </>
      )}
      <Footer />
    </div>
  );
}

export default App;
