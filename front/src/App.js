import './App.css';
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import React, { Fragment } from "react";
import ProjectInfo from "./pages/ProjectInfo";
import Dataset from "./pages/Dataset";
import Graphs from "./pages/Graphs";

const routes = [
  {name: 'Présentation', to: '/', exact: true, page: ProjectInfo},
  {name: 'Dataset', to: '/dataset', exact: false, page: Dataset},
  {name: 'Graphes', to: '/graphs', exact: false, page: Graphs},
];

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation */}
        <Disclosure as="nav" className="bg-white border-b border-gray-200">
          {({open}) => (
            <>
              {/* Desktop */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      <h2 className="pb-0">Projet R</h2>
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {routes.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          exact={item.exact}
                          className={'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'}
                          activeClassName={'border-blue-500 text-gray-900 hover:border-blue-500 hover:text-gray-900'}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    <Disclosure.Button
                      className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true"/>
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              {/* Mobile */}
              <Disclosure.Panel className="sm:hidden">
                {open => (
                  <div className="pt-2 pb-3 space-y-1">
                    {routes.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        exact={item.exact}
                        className={'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'}
                        activeClassName={'bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700'}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Contenu */}
        <main>
          <div className="py-10">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <Switch>
                <Fragment>
                  <div className="px-4 py-4 sm:px-0">
                    {routes.map((item) =>
                      <Route key={item.name} exact={item.exact} path={item.to}>
                        {item.page()}
                      </Route>
                    )}
                  </div>
                </Fragment>
              </Switch>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
