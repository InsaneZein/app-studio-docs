import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from './Routes';
import { MDXProvider } from '@mdx-js/react';
import { ReactMarkDown } from 'react-markdown';
import { remarkGfm } from 'remark-gfm';
import './App.scss';

const App = () => {
  const history = useHistory();

  useEffect(() => {
    insights.chrome.init();

    insights.chrome.identifyApp('app-studio-docs');
    const unregister = insights.chrome.on('APP_NAVIGATION', (event) => history.push(`/${event.navId}`));
    return () => {
      unregister();
    };
  }, []);

  const components = {
    h1: props => {
      <h1 style={{color: "blue"}} {...props} />
    }
  }

  return (
    <MDXProvider components={components}>
      <Routes />;
    </MDXProvider>
  )
};

export default App;
