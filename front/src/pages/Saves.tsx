import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import { ClassifierResult } from '../models/Classifier';
import { getSavedClassifierResults } from '../services/classifiers-service';
import SavedClassifierCard from '../components/SavedClassifierCard';

const Saves = () => {
  const [classifierResults, setClassifierResults] = useState([] as ClassifierResult[]);

  useEffect(() => {
    setClassifierResults(getSavedClassifierResults().sort((a, b) => b.score - a.score));
  }, []);

  return (
    <div>
      <PageHeader>Modèles sauvegardés</PageHeader>
      <Card className={classifierResults.length === 0 ? 'text-center' : ''}>
        {classifierResults.length === 0 && (
          <span>Aucun modèle n&apos;a encore été sauvegardé</span>
        )}
        {classifierResults.length > 0 && classifierResults.map((classifierResult, index) => (
          <SavedClassifierCard
            key={classifierResult.AUC}
            isFirst={index === 0}
            classifierResult={classifierResult}
            className={`${index !== classifierResults.length - 1 ? 'mb-6' : ''}`}
          />
        ))}
      </Card>
    </div>
  );
};

export default Saves;
