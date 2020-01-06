const SignUpForm = ({firebase}) => {

    const handleRegister = () => {
      firebase
      .doCreateUserWithEmailAndPassword("nur@nur.nur", "nurnurnur")
      .then(authUser => {
        console.log(authUser);
      })
      .catch(error => {
        console.log(error);
      });
    }
  
    const handleLogin = () => {
      firebase
      .doSignInWithEmailAndPassword("nur@nur.nur", "nurnurnur")
      .then(authUser => {
        console.log(authUser);
      })
      .catch(error => {
        console.log(error);
      });
    }
  
    const getUser = () => {
      const user = firebase.getUser();
      user && console.log(user);
    }
  
    return(
      <>
        <button onClick={firebase.getUsersTodos}>hhhhh</button>
      </>
    );
  }