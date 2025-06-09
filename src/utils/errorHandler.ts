
import React from 'react';

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown): string => {
  console.error('Application error:', error);
  
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

export function withErrorBoundary<T extends Record<string, any>>(
  Component: React.ComponentType<T>
): React.ComponentType<T> {
  return function ErrorBoundaryWrapper(props: T) {
    try {
      return React.createElement(Component, props);
    } catch (error) {
      console.error('Component error:', error);
      return React.createElement(
        'div',
        { className: 'flex items-center justify-center min-h-[200px]' },
        React.createElement(
          'div',
          { className: 'text-center' },
          React.createElement(
            'p',
            { className: 'text-destructive mb-2' },
            'Something went wrong'
          ),
          React.createElement(
            'button',
            {
              onClick: () => window.location.reload(),
              className: 'text-primary hover:underline'
            },
            'Reload page'
          )
        )
      );
    }
  };
}
