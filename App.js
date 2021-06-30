import "./App.css";
import React,{ useState,useEffect } from "react";
import fire from './fire';
import Login from './Login';
import Hero from './Hero';
import { CalendarHeader } from './calendars/CalendarHeader';
import { Day } from './calendars/Day';
import { NewEventModal } from './calendars/NewEventModal';
import { DeleteEventModal } from './calendars/DeleteEventModal';
import { useDate } from './calendars/useDate';

const App = () => {
 const [user, setUser] = useState('');
 const [fullname, setFullName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [numtele, setNumTele] = useState('');
 const [adresse, setAdresse] = useState('');
 const [emailError, setEmailError] = useState('');
 const [passwordError, setPasswordError] = useState('');
 const [hasAccount, setHasAccount] = useState(false);

 const clearInput = () => {
   setFullName('');
   setNumTele('');
   setAdresse('');
   setEmail('');
   setPassword('');
 }
 const clearErrors = () => {
  setEmailError('');
  setPasswordError('');
}

 const handlelogin = () => {
   clearErrors();
   fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((err) => {
     switch (err.code) {
       case "auth/invalid-email":
       case "auth/user-disabled":
       case "auth/user-not-found":
        setEmailError(err.message);
        break;
       case "auth/wrong-password":
        setPasswordError(err.message);
        break;
     }
    });
 };

 const handleSignup = () => {
  clearErrors();
  fire
   .auth()
   .createUserWithEmailAndPassword(email, password)
   .catch((err) => {
    switch (err.code) {
      case "auth/email-alrady-in-use":
      case "auth/invalid-email":
       setEmailError(err.message);
       break;
      case "auth/weak-password":
       setPasswordError(err.message);
       break;
    }
   });
};

const handleLogout = () => {
  fire.auth().signOut();
};

const authListener = () => {
  fire.auth().onAuthStateChanged((user) => {
    if(user) {
      clearInput(); 
      setUser(user);
    }
    else 
    setUser("");
    
  }); 
};

useEffect(() => {
  authListener();

}, [])


const [nav, setNav] = useState(0);
const [clicked, setClicked] = useState();
const [events, setEvents] = useState(
  localStorage.getItem('events') ? 
    JSON.parse(localStorage.getItem('events')) : 
    []
);

const eventForDate = date => events.find(e => e.date === date);

useEffect(() => {
  localStorage.setItem('events', JSON.stringify(events));
}, [events]);

const { days, dateDisplay } = useDate(events, nav);


  return (
  <div className="App">
     {user ? (  
      <>
      <Hero handleLogout={handleLogout} />
      
       <div id="container">
        <CalendarHeader 
          dateDisplay={dateDisplay}
          onNext={() => setNav(nav + 1)}
          onBack={() => setNav(nav - 1)}
        />

        <div id="weekdays">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>

        <div id="calendar">
          {days.map((d, index) => (
            <Day
              key={index}
              day={d}
              onClick={() => {
                if (d.value !== 'padding') {
                  setClicked(d.date);
                }
              }}
            />
          ))}
        </div>
      </div>

      {
        clicked && !eventForDate(clicked) &&
        <NewEventModal
          onClose={() => setClicked(null)}
          onSave={title => {
            setEvents([ ...events, { title, date: clicked }]);
            setClicked(null);
          }}
        />
      }

      {
        clicked && eventForDate(clicked) &&
        <DeleteEventModal 
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter(e => e.date !== clicked));
            setClicked(null);
          }}
        />
      }
    </>
      
     ) : (
      <Login 
      email={email} setEmail={setEmail} password={password} setPassword={setPassword}
      handlelogin={handlelogin} handleSignup={handleSignup}
      hasAccount={hasAccount} setHasAccount={setHasAccount}
      emailError={emailError} passwordError={passwordError}
      fullname={fullname} setFullName={setFullName}
      numtele={numtele} setNumTele={setNumTele}
      adresse={adresse} setAdresse={setAdresse} 
      />
     )}
  </div>
  );
};

export default App;
