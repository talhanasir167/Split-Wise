import React, { useState } from "react";
import { auth, db } from ".././firebase"; // Import the initialized auth object
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Use 'await'
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });
      console.log("User created")


    } catch (error) {
      setError("Error creating user: " + error.message);
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          id="signupEmail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          id="signupPassword" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </>
  );
};



// import React, {useState} from "react";

// import { auth } from "./firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// const Signup = () => {
//   const [email, setEmail] = useState("demo@gmail.com");
//   const [password, setPassword] = useState("password");
//   const [error, setError] = useState(null);
//   const [sucess, setSucess] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();


//     try{
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//         setSucess("User created successfully!");
//         console.log(`Success  => ${sucess} and user created successfully => ${user}`);
//       }catch(error) {
//         setError("Error creating user: " + error.message);
//         console.log(error);
//       };
//   };

//   return(
//          <>
//           <form onSubmit={handleSubmit}>
//             <input type="email" placeholder="Email" id="signupEmail" onChange={((e) => setEmail(e.target.value))}/>
//             <input type="password" placeholder="Password" id="signupPassword" onChange={(e) => setPassword(e.target.value)}/>
//             <button type="submit">Signup</button>
//           </form>
//           {error && <p>error.message</p>}
//           {sucess && <p>sucess</p>}
//          </>
//        );
// }




export default Signup;