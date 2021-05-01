import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import Card from '../components/Card';
import { getClassifiers } from '../services/classifiers-service';
import ClassifierCard from '../components/ClassifierCard';

const Predictions = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <h1>Générer un modèle</h1>
      <Card>
        <div>
          <h2>Choisir un classifieur</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {getClassifiers().map((classifier) => (
              <ClassifierCard key={classifier.name} classifier={classifier} baseUrl={path} />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Predictions;
