import React from 'react';
import { mount } from '@cypress/react';
import SampleComponent from '../../AppEntry';

describe('HelloWorld component', () => {
  it('works', () => {
    mount(<SampleComponent />);
    // now use standard Cypress commands
    cy.contains('Hello World').should('be.visible');
  });
});
