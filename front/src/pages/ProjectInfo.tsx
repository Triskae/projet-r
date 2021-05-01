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
          <div style={{ marginBottom: '2em' }}>
            {`Cette application a pour vocation d'effectuer une analyse prédictive sur un jeu de
              donnée précis. Notre dataset contient des données sur des clients avec des
              variables données. Sur chaque instance du dataset, nous savons si oui ou non
              le client a connu un défaut de paiement. C'est a partir de ces données que nous
              allons appliquer chaque classifieurs  que l'on peut retrouver dans l'onglet
              "Générer un modèle".`}
          </div>

          <div style={{ marginBottom: '2em' }}>
            {`Le but du jeu est de générer le modèle le plus performant afin d'avoir des prédictions
            fiables. Pour cela, nous avons deux indicateurs de performances: le taux de précision
             basé sur le ratio de Vrai Positif et Vrai Négatif sur l'ensemble des données
             testées, ainsi que l'AUC (Area Under the Curve) qui représente l'aire sous la courbe
             ROC générée.
             A chaque modèle généré, nous avons une vue tabulaire des 
             prédictions effectuées sur l'ensemble de test (qui nous permet de générer les 
             métriques de performance) ainsi que les prédictions sur le jeu de donnée sur lequel
             on applique réellement nos prédictions.`}
          </div>

          <div style={{ marginBottom: '2em' }}>
            {` Pour chaque indicateurs de performance, la valeur est comprise entre 0 et 1.
             Plus on se rapproche de 1, plus le modèle est performant. Le paramétrage des classifieurs
             demande un peu de connaissance en Data Science. Pour pouvoir rendre notre
             application plus réaliste, nous avons une fonctionnalité de sauvegarde qui permet de
             sauvegarder des modèles. Il est également possible de télécharger le jeu de donnée à prédire
             avec les prédictions associées et la probabilité que celle-ci soit vraie.`}
          </div>
          <div style={{ marginBottom: '2em' }}>
            {`En cas de problème d'utilisation de notre application, une vidéo démonstrative est disponible
            un peu plus bas. Nous avons également un score global qui est déterminé pas la formule: 
            `}
            <code>(AUC/Taux de bonne précision)/2</code>
          </div>
          <p>Contenu/vidéo</p>
        </div>
      </div>
    </Card>
  </div>
);

export default ProjectInfo;
