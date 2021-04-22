import React from 'react';
import { Route, Switch } from "react-router-dom";
import Classifier from "./Classifier";

const Classifiers = () => {
  return (
    <Switch>
      <Route exact path={''}>
        <h3>Please select a topic.</h3>
      </Route>
      <Route path={`${''}/:topicId`}>
        <Classifier />
      </Route>
    </Switch>
  );
};

export default Classifiers;
