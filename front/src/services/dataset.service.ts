import axios from 'axios';
import getConfiguration from '../project-config';
import { Dataset, DatasetRow } from '../models/Dataset';

const baseApiURL = getConfiguration().apiBaseURL;

export default async function getDataset(): Promise<Dataset> {
  const finalDataset = { headers: [], data: [] } as Dataset;
  const response = await axios.get(`${baseApiURL}/dataset`);
  const dataset = response.data;

  finalDataset.headers = dataset[0];
  dataset.splice(1, dataset.length).forEach((el: DatasetRow) => {
    const finalDatasetRow = finalDataset.headers
      .reduce((acc, current, index) => ({ ...acc, [current]: el[index] }), {});
    finalDataset.data.push(finalDatasetRow);
  });

  return finalDataset;
}
