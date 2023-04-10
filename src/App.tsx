import { Route, Routes,} from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

import MyCalendar from './components/Tasks/component/components/Calendar/MyCalendar';
import MyHeader from './components/Tasks/component/components/MyHeader/MyHeader';
import TasksDay from './components/Tasks/component/components/Tasks/Task/TasksDay';
import Tasks from './components/Tasks/component/components/Tasks/Tasks';

function App() {
  return (
    <>
      <MyHeader/>

      <MyCalendar />

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign_in' element={<SignUp />} />
        {/* <Route path='/tasks' element={<Tasks />} /> */}
        {/* <Route path='/tasks' element={<TasksDay />} /> */}
      </Routes>
    </>
  );
}

export default App;
