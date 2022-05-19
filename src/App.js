import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from './Routes';
import { MDXProvider } from '@mdx-js/react';
import { Text, TextVariants, List, ListItem } from '@patternfly/react-core';
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
    h1: props => <Text component={[...props, TextVariants.h1]}/>,
    h2: props => <Text component={[...props, TextVariants.h2]}/>,
    h3: props => <Text component={[...props, TextVariants.h3]}/>,
    h4: props => <Text component={[...props, TextVariants.h4]}/>,
    h5: props => <Text component={[...props, TextVariants.h5]}/>,
    h6: props => <Text component={[...props, TextVariants.h6]}/>,
    a: props => <Text component={[...props, TextVariants.a]}/>,
    p: props => <Text component={[...props, TextVariants.p]}/>,
    li: props => <ListItem component={[...props]}/>,
    ul: props => <List component={[...props]}/>,
    
  };

  return (
    <MDXProvider components={components}>
      <Routes />;
    </MDXProvider>
  )
};

export default App;
