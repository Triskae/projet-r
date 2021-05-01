const serverVars = {
  apiBaseURL: 'http://localhost:8080'
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
