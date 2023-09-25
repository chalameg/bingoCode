// components/Portal.js
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    const node = document.createElement('div');
    document.body.appendChild(node);
    setPortalNode(node);

    return () => {
      document.body.removeChild(node);
    };
  }, []);

  if (portalNode) {
    return ReactDOM.createPortal(children, portalNode);
  }

  return null;
};

export default Portal;
