import X from 'xlsx';

const download = (csv: string) => {
  const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csv}`);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'Data_Projet_New_Predicted.csv');
  document.body.appendChild(link); // Required for FF

  link.click();
};

const jsonToCsv = (json: any) => X.utils.sheet_to_csv(X.utils.json_to_sheet(json), { FS: ';' });

export default {
  download, jsonToCsv
};
