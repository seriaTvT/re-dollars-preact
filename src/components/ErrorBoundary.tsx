import { Component, ComponentChildren } from 'preact';

interface Props {
    children: ComponentChildren;
    fallback?: ComponentChildren;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * 错误边界组件
 * 捕获子组件中的错误，防止整个应用崩溃
 */
export class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
        error: null
    };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(_error: Error, _errorInfo: { componentStack?: string }) {
        // Error boundary caught an error
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div class="error-fallback" style={{
                    padding: '20px',
                    textAlign: 'center',
                    color: 'var(--dollars-text-secondary, #888)',
                }}>
                    <div style={{ fontSize: '24px', marginBottom: '10px' }}>😢</div>
                    <div>加载出错了</div>
                    <button
                        style={{
                            marginTop: '10px',
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '4px',
                            background: 'var(--primary-color, #f09199)',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                        onClick={() => this.setState({ hasError: false, error: null })}
                    >
                        重试
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
