import React from 'react';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';

const ProjectInfo = () => (
  <div>
    <PageHeader>Informations sur le projet</PageHeader>
    <Card>
      <div>
        <div className="mb-12">
          <h2>Présentation du projet</h2>
          <p>Contenu/vidéo</p>
        </div>
        <h2>Comment interpréter les prédictions</h2>
        <p>Contenu</p>
      </div>
    </Card>
  </div>
);

export default ProjectInfo;
