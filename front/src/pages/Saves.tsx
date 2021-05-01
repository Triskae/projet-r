import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import { ClassifierResult } from '../models/Classifier';
import { getSavedClassifierResults } from '../services/classifiers-service';
import SavedClassifierCard from '../components/SavedClassifierCard';

const Saves = () => {
  const [classifierResults, setClassifierResults] = useState([] as ClassifierResult[]);

  useEffect(() => {
    setClassifierResults(getSavedClassifierResults());
  }, []);

  return (
    <div>
      <PageHeader>Prédictions sauvegardées</PageHeader>
      <Card className={classifierResults.length === 0 ? 'text-center' : ''}>
        {classifierResults.length === 0 && (
          <span>Aucune prédiction n&apos;a encore été sauvegardée</span>
        )}
        {classifierResults.length > 0 && classifierResults.map((classifierResult, index) => (
          <SavedClassifierCard
            key={classifierResult.AUC}
            classifierResult={classifierResult}
            className={`${index !== classifierResults.length - 1 ? 'mb-6' : ''}`}
          />
        ))}
      </Card>
    </div>
  );
};

export default Saves;
