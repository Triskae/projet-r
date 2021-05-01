import X from "xlsx";

const download = (csv: string) => window.open(encodeURI(csv));

const json_to_csv = (json: Array<Array<any>>) => {
  const sheet = X.utils.json_to_sheet(json);
  const csv = X.utils.sheet_to_csv(sheet, { FS: ";" });
  console.log(csv);
};
