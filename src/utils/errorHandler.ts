
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

export const withErrorBoundary = <T extends Record<string, any>>(
  Component: React.ComponentType<T>
): React.ComponentType<T> => {
  return function ErrorBoundaryWrapper(props: T) {
    try {
      return <Component {...props} />;
    } catch (error) {
      console.error('Component error:', error);
      return (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <p className="text-destructive mb-2">Something went wrong</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-primary hover:underline"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
  };
};
