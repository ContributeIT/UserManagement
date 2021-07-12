import Routes from './routes';
import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
// import './global.css';

const App = () => {
  return (
    <div style={{margin: '100px auto' }}>
     <Routes />
    </div>
  );
};

render(<App />, document.getElementById('root'));
export default App;