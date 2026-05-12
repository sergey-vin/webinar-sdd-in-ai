"use client";

import { Component, type ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="p-4 flex items-center justify-center min-h-[200px]">
            <Card className="p-6 text-center max-w-xs">
              <AlertTriangle className="w-8 h-8 text-warn mx-auto mb-3" />
              <h2 className="font-semibold text-ink mb-1">
                Something went wrong
              </h2>
              <p className="text-sm text-ink-3 mb-4">
                Please try refreshing the page
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.reload();
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </Card>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
