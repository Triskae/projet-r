import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, PencilIcon } from '@heroicons/react/solid';
import { ClassifierResult } from '../models/Classifier';
import { getClassifier } from '../services/classifiers-service';
import Button from './Button';

interface SavedClassifierCardProps {
  classifierResult: ClassifierResult,
  className: string;
}

const SavedClassifierCard = ({ classifierResult, className }: SavedClassifierCardProps) => {
  const savedClassifierCardClassName = classNames('bg-white overflow-hidden rounded-lg border', className);
  const classifier = getClassifier(classifierResult.classifierId);

  return (
    <div className={savedClassifierCardClassName}>
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col mr-4 overflow-hidden">
            <span className="font-medium whitespace-nowrap overflow-hidden overflow-ellipsis mb-2">{classifier.name}</span>
            <span className="text-sm text-gray-400">
              AUC :
              {' '}
              {classifierResult.AUC}
              {' '}
              ·
              Précision matrice :
              {' '}
              {classifierResult.accuracy}
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

export default SavedClassifierCard;
