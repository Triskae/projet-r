const serverVars = {
  apiBaseURL: 'http://api.r-with-node.tk'
};

const localVars = {
  apiBaseURL: 'http://api.r-with-node.tk'
};

export default function getConfiguration() {
  if (process.env.NODE_ENV === 'production') {
    return serverVars;
  }
  return localVars;
}
