import './app.css';
import ImageList from './components/ImageList';
import MyDraftEditor from './components/MyDraftEditor';
import UserList from './components/UserList';

function App() {
  return (
   <div className='app'>
    <h1 className='header'>Keep Your Notes Handy!</h1>
     <div className='container'>
      <UserList/>
      <MyDraftEditor/>
      <ImageList/>
     </div>
   </div>
  );
}

export default App;
