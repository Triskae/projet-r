import axios from 'axios';
import getConfiguration from '../project-config';
import { Dataset, DatasetRow } from '../models/Dataset';

const baseApiURL = getConfiguration().apiBaseURL;

export function formatFetchedDataset(fetchedDataset: any): Dataset {
  const finalDataset = { headers: [], data: [] } as Dataset;
  finalDataset.headers = fetchedDataset[0];
  fetchedDataset.splice(1, fetchedDataset.length).forEach((el: DatasetRow) => {
    const finalDatasetRow = finalDataset.headers
      .reduce((acc, current, index) => ({ ...acc, [current]: el[index] }), {});
    finalDataset.data.push(finalDatasetRow);
  });
  return finalDataset;
}

export default async function getDataset(): Promise<Dataset> {
  const response = await axios.get(`${baseApiURL}/dataset`);
  const fetchedDataset = response.data;

  return formatFetchedDataset(fetchedDataset);
}
