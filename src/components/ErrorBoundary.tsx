import { Component, ComponentChildren } from 'preact';

interface Props {
    children: ComponentChildren;
}

interface State {
    hasError: boolean;
}

/**
 * 错误边界组件
 * 捕获子组件中的错误，防止整个应用崩溃
 */
export class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false
    };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div class="error-fallback">
                    <div class="error-fallback-icon">😢</div>
                    <div>加载出错了</div>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                    >
                        重试
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
