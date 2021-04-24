import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { Classifier } from '../models/Classifier';

type ClassifierCardProps = {
  classifier: Classifier,
  baseUrl: string
};

const ClassifierCard = ({ classifier, baseUrl }: ClassifierCardProps) => (
  <div className="bg-white overflow-hidden rounded-lg border">
    <div className="px-4 py-5 sm:p-6">
      <div className="flex flex-col">
        <span
          className="font-medium mb-4 whitespace-nowrap overflow-ellipsis overflow-hidden"
        >
          {classifier.name}
        </span>
        <Link to={`${baseUrl}/${classifier.id}`} className="w-full">
          <Button>Choisir</Button>
        </Link>
      </div>
    </div>
  </div>
);

export default ClassifierCard;
