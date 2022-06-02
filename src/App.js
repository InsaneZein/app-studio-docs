import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from './Routes';
import { MDXProvider } from '@mdx-js/react';
import { Text, TextVariants, List, ListItem, TextContent, ListComponent, Title, TitleSizes } from '@patternfly/react-core';
import { Thead, Tr, Tbody, Td } from '@patternfly/react-table';
import './App.scss';

const App = () => {
  const history = useHistory();

  useEffect(() => {
    window?.insights?.chrome.init();

    window?.insights?.chrome.identifyApp('app-studio-docs');
    const unregister = window?.insights?.chrome.on('APP_NAVIGATION', (event) => history.push(`/${event.navId}`));
    return () => {
      unregister();
    };
  }, []);

  const components = {
    h1: (props) => {
      return <Title headingLevel="h1" size={TitleSizes['4xl']} {...props} />;
    },
    h2: (props) => {
      return <Title headingLevel="h2" size={TitleSizes['3xl']} {...props} />;
    },
    h3: (props) => {
      return <Title headingLevel="h3" size={TitleSizes['2xl']} {...props} />;
    },
    h4: (props) => {
      return <Title headingLevel="h4" size={TitleSizes['xl']} {...props} />;
    },
    h5: (props) => {
      return <Title headingLevel="h5" size={TitleSizes.lg} {...props} />;
    },
    h6: (props) => {
      return <Title headingLevel="h6" size={TitleSizes['md']} {...props} />;
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
