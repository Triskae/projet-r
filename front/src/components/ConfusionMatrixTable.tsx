import React from 'react';
import { ConfusionMatrix } from '../models/Classifier';

interface ConfusionMatrixProps {
  confusionMatrix: ConfusionMatrix;
}

const ConfusionMatrixTable = ({ confusionMatrix }: ConfusionMatrixProps) => (
  <div className="flex flex-col">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table>
            <thead>
              <tr>
                <th> </th>
                <th>Vrai négatif</th>
                <th>Vrai positif</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Faux négatif</th>
                {confusionMatrix[0].map((data) => (
                  <td key={data}>{data}</td>
                ))}
              </tr>
              <tr>
                <th>Faux Positif</th>
                {confusionMatrix[1].map((data) => (
                  <td key={data}>{data}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default ConfusionMatrixTable;
