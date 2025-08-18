import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught:", error, info);
    }

    render() {
        if (this.state.error) {
            return (
                <div style={{ padding: "2rem", color: "red" }}>
                    <h2>⚠️ Something went wrong</h2>
                    <pre>{this.state.error.message}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}
