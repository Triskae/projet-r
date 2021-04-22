import React from 'react';
import Card from "../components/Card";
import { useParams } from 'react-router-dom';

const Classifier = () => {
  let { classifierId } = useParams();

  return (
    <div>
      <h1>Classifieur</h1>
      <Card>
        <div>
          <h2>{classifierId}</h2>
        </div>
      </Card>
    </div>
  );
};

export default Classifier;
