const serverVars = {
  apiBaseURL: 'http://localhost:8080'
};

const localVars = {
  apiBaseURL: 'http://localhost:8080'
};

export default function getConfiguration() {
  if (process.env.NODE_ENV === 'production') {
    return serverVars;
  }
  return localVars;
}
