import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AllQuestions from "./components/AllQuestions";
import QuestionShow from "./components/QuestionShow";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="whole-site">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/"><AllQuestions /></Route>
          <Route path="/questions/:questionId"><QuestionShow /></Route>
        </Switch>
      )}
      <Footer />
    </div>
  );
}

export default App;
