import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCGyG1eDtpPU2QLokJCmlHwZCSlBlz6vsE",
  authDomain: "gl-react-todo.firebaseapp.com",
  databaseURL: "https://gl-react-todo.firebaseio.com",
  projectId: "gl-react-todo",
  storageBucket: "gl-react-todo.appspot.com",
  messagingSenderId: "985271249946",
  appId: "1:985271249946:web:c6156d94be2e77bd4ef5a3"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  getUsersTodos = userUid => {
    return this.db
      .collection("todos")
      .where("user", "==", userUid)
      .get()
      .then(querySnapshot => {
        let todos = [];
        querySnapshot.forEach(doc => {
          todos.push({ id: doc.id, ...doc.data() });
        });
        return todos;
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };

  addTodo = title => {
    return this.db
      .collection("todos")
      .add({
        title: title,
        isDone: false,
        user: this.auth.currentUser.uid
      })
      .then(function(docRef) {
        return docRef;
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  markAsDone = id => {
    return this.db
      .collection("todos")
      .doc(id)
      .update({
        isDone: true
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
      });
  };

  updateTodo = (id, newText) => {
    return this.db
      .collection("todos")
      .doc(id)
      .update({
        title: newText
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
      });
  };

  deleteTodo = id => {
    return this.db
      .collection("todos")
      .doc(id)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };

  getUser = () => {
    return this.auth.onAuthStateChanged(function(user) {
      return user;
    });
  };

  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  resetPass = email => this.auth.sendPasswordResetEmail(email);

  updatePass = password => this.auth.currentUser.updatePassword(password);
}

export default new Firebase();
