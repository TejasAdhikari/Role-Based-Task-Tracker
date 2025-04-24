import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../contexts/AuthContext';
import { RoleGate } from '../auth/RoleGate';

// Basic test to verify that the testing setup is working
test('basic component rendering', () => {
  render(<div data-testid="test-component">Test component</div>);
  expect(screen.getByTestId('test-component')).toBeInTheDocument();
});


// Test for RoleGate component.
// This test checks if the RoleGate component correctly renders or 
// hides its children based on the user's role.
describe('RoleGate Component', () => {
  test('renders content when user has allowed role', () => {
    render(
      <AuthContext.Provider value={{ user: { role: 'submitter' } }}>
        <RoleGate allowed={['submitter']}>
          <div data-testid="test-content">Restricted Content</div>
        </RoleGate>
      </AuthContext.Provider>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  test('hides content when user does not have allowed role', () => {
    render(
      <AuthContext.Provider value={{ user: { role: 'submitter' } }}>
        <RoleGate allowed={['approver']}>
          <div data-testid="test-content">Restricted Content</div>
        </RoleGate>
      </AuthContext.Provider>
    );
    
    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument();
  });
});