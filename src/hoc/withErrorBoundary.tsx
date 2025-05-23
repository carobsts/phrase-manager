import React, { type ErrorInfo } from "react";

import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

interface WithErrorBoundaryOptions {
  onReset?: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      className="p-6 border border-red-300 bg-red-50 rounded-lg text-center"
      role="alert"
      aria-live="assertive"
    >
      <h2 className="text-xl font-bold text-red-700 mb-2">
        Something went wrong
      </h2>
      <p className="text-red-600 mb-4">
        {error.message || "An unexpected error occurred"}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}

export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: WithErrorBoundaryOptions
) {
  return function WrappedWithErrorBoundary(props: P) {
    const handleError = (error: Error, info: ErrorInfo) => {
      // eslint-disable-next-line no-undef
      console.error("Error caught by error boundary:", error, {
        componentStack: info.componentStack ?? "",
      });
    };

    return (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={handleError}
        onReset={options?.onReset}
      >
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}
