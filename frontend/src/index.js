import {Suspense} from 'react';
import ReactDOM from 'react-dom';
import { Button, DatePicker, Space, version } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import reportWebVitals from './reportWebVitals';



const App = () => {
    return (
      <div className="App">
        <h1>antd version: {version}</h1>
        <Space>
          <DatePicker />
          <Button type="primary">Primary Button</Button>
        </Space>
      </div>
    );
  };

ReactDOM.render(
    <Suspense fallback="loading">
        <App />
    </Suspense>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
