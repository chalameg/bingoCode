import React from "react";
import Router from 'next/router'

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props)
  
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI
  
      return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
      // You can use your own error logging service here
      console.log({ error, errorInfo })
    }
    render() {
      // Check if the error is thrown
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div className="flex justify-center align-center flex-column p-15 f-20">
            <h2 className="text-center">Oops, there is an error!</h2>
            <br/>
            <h2 className="text-center">Check if you are logged in or not!</h2>
            <br/>
            <h2 className="text-center">Sorry for the Inconvenience!</h2>
            <br/>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again?
            </button>
          </div>
        )
      }
  
      // Return children components in case of no error
  
      return this.props.children
    }
  }
  
  export default ErrorBoundary