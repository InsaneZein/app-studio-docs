import React from 'react';
import PropTypes from 'prop-types';
import Example from './sample.mdx';
import { MDXProvider } from '@mdx-js/react';

const SampleComponent = (props) => {
  return (
    <>
    <span> {props.children} </span>
    <MDXProvider components={components}>
      <Example />
    </MDXProvider>
    </>
  );
};

SampleComponent.propTypes = {
  children: PropTypes.node,
};

export default SampleComponent;
