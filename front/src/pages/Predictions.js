import React from 'react';
import Card from "../components/Card";
import { classifiers } from "../services/classifiers-service";
import ClassifierCard from "../components/ClassifierCard";
import { useRouteMatch } from 'react-router-dom';

const Predictions = () => {
  let { path } = useRouteMatch();

  return (
    <div>
      <h1>Prédictions</h1>
      <Card>
        <div>
          <h2>Choisir un classifieur</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {classifiers.map(classifier => (
              <ClassifierCard key={classifier.name} classifier={classifier} baseUrl={path}/>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Predictions;
