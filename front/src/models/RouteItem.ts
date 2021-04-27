import React from 'react';

export interface RouteItem {
  name: string;
  to: string;
  exact: boolean;
  page: React.ComponentType;
  display: boolean;
}
