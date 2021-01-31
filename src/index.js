import React from 'react';
import ReactDom from 'react-dom';
//import Card from "react-bootstrap/Card";
import './index.css'
//import DeckList from './components/DeckList';
import App from './components/App'
import { BrowserRouter, Route, Switch } from 'react-router-dom';




ReactDom.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'));