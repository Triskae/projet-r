import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const LoadingIndicator = ({ ...props }) => (
  <Loader
    type="Rings"
    color="#2563eb"
    {...props}
  />
);

export default LoadingIndicator;
