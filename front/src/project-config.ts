const serverVars = {
  apiBaseURL: 'https://api.r-with-node.tk'
};

const localVars = {
  apiBaseURL: 'https://api.r-with-node.tk'
};

export default function getConfiguration() {
  if (process.env.NODE_ENV === 'production') {
    return serverVars;
  }
  return localVars;
}
