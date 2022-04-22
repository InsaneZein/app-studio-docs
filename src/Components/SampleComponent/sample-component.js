import React from 'react';
import PropTypes from 'prop-types';
import Example from './sample.mdx';

const SampleComponent = (props) => {
  return (
    <>
      <span> {props.children} </span>
      <Example />
    </>
  );
};

SampleComponent.propTypes = {
  children: PropTypes.node,
};

export default SampleComponent;
