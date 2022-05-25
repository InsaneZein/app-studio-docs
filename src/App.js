import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from './Routes';
import { MDXProvider } from '@mdx-js/react';
import { Text, TextVariants, List, ListItem, TextContent, ListComponent } from '@patternfly/react-core';
import { Thead, Tr, Tbody, Td } from '@patternfly/react-table';
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
    h1: (props) => {
      return (
        <TextContent>
          <Text {...props} component={TextVariants.h1} />
        </TextContent>
      );
    },
    h2: (props) => {
      return (
        <TextContent>
          <Text {...props} component={TextVariants.h2} />
        </TextContent>
      );
    },
    h3: (props) => {
      return (
        <TextContent>
          <Text {...props} component={TextVariants.h3} />
        </TextContent>
      );
    },
    h4: (props) => {
      return (
        <TextContent>
          <Text {...props} component={TextVariants.h4} />
        </TextContent>
      );
    },
    h5: (props) => {
      return (
        <TextContent>
          <Text {...props} component={TextVariants.h5} />
        </TextContent>
      );
    },
    h6: (props) => {
      return (
        <TextContent>
          <Text {...props} component={TextVariants.h6} />
        </TextContent>
      );
    },
    a: (props) => {
      return (
        <TextContent>
          <Text {...props} component={TextVariants.a} />
        </TextContent>
      );
    },
    p: (props) => {
      return (
        <TextContent>
          <Text {...props} component={TextVariants.p} />
        </TextContent>
      );
    },
    li: (props) => {
      return <ListItem {...props} />;
    },
    ol: (props) => {
      return <List {...props} component={ListComponent.ol} />;
    },
    thead: (props) => {
      return <Thead {...props}></Thead>;
    },
    tr: (props) => {
      return <Tr {...props}></Tr>;
    },
    tbody: (props) => {
      return <Tbody {...props}></Tbody>;
    },
    td: (props) => {
      return <Td {...props}></Td>;
    },
  };

  return (
    <MDXProvider components={components}>
      <Routes />;
    </MDXProvider>
  );
};

export default App;
