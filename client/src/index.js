import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ProjectStore from './store/ProjectStore';
import TaskStore from './store/TaskStore';
import UserStore from './store/UserStore';

const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
		project: new ProjectStore(),
        task: new TaskStore()
    }}
    >
	
        <App />
    </Context.Provider>
);

export default Context;