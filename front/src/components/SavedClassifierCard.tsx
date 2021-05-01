import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { format, parseJSON } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ClassifierResult } from '../models/Classifier';
import { getClassifier } from '../services/classifiers-service';
import Button from './Button';

interface SavedClassifierCardProps {
  classifierResult: ClassifierResult,
  isFirst?: boolean,
  className: string;
}

const SavedClassifierCard = (
  { classifierResult, isFirst, className }: SavedClassifierCardProps
) => {
  const savedClassifierCardClassName = classNames({
    'bg-white overflow-hidden rounded-lg': true,
    'border-blue-500 border-2': isFirst,
    'border ': !isFirst
  }, className);
  const classifier = getClassifier(classifierResult.classifierId);

  return (
    <div className={savedClassifierCardClassName}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col mr-4 overflow-hidden">
            {isFirst && <span className="text-sm text-blue-500 font-semibold mb-2">Modèle le plus précis</span>}
            <span className="font-medium whitespace-nowrap overflow-hidden overflow-ellipsis mb-2">{classifier.name} (score : {classifierResult.score})</span>
            <span className="text-sm text-gray-400">
              Sauvegardée le {format(parseJSON(classifierResult.date), 'EEEE d MMMM à HH:mm', { locale: fr })} ·
              AUC : {classifierResult.AUC} · Précision matrice : {classifierResult.accuracy}
            </span>
          </div>
          <Link to={`saves/${classifier.id}`}>
            <Button className="w-fit">Voir</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

SavedClassifierCard.defaultProps = {
  isFirst: false
};

export default SavedClassifierCard;
