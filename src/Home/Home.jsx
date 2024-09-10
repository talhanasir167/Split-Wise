import React, { useEffect, useState } from 'react';
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import './Home.css';

const InputField = ({ type, placeholder }) => (
  <div className="input-group">
    <input type={type} placeholder={placeholder} />
  </div>
);

const SelectField = ({ label, options, value, onChange }) => (
  <div className="select-group">
    <label>{label}</label>
    <select onChange={onChange} value={value}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [payerOption, setPayerOption] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handlePaymentOptionsChange = (e) => {
    setPayerOption(e.target.value);
    if (e.target.value === "1") {
      setSelectedUser(user.uid);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredUsers = payerOption === "2"
    ? users.filter(u => u.email !== user.email)
    : users;

  const paymentOptions = [
    { value: "1", label: "You Paid all Amount" },
    { value: "2", label: "Other Paid All Amount" },
  ];

  const userOptions = filteredUsers.length > 0 
    ? filteredUsers.map(user => ({ value: user.id, label: user.name }))
    : [{ value: "", label: "No users available" }];

  return (
    <div className="container">
      {user ? (
        <div>
          <h2>Welcome, Mr {user.email}</h2>

          <h3>Add Expense</h3>

          <InputField type="text" placeholder="Expense Name" />
          <InputField type="number" placeholder="Total Amount" />
          <InputField type="number" placeholder="Paid Amount" />
          <InputField type="date" placeholder="Enter Date" />

          <SelectField 
            label="Payment Method:" 
            options={paymentOptions} 
            value={payerOption} 
            onChange={handlePaymentOptionsChange} 
          />
          
          <SelectField 
            label="Paid By:" 
            options={userOptions} 
            value={selectedUser} 
            onChange={handleUserChange} 
          />

          <div>
            <button>Submit</button>
          </div>
        </div>
      ) : (
        <div>
          <p>User is not available</p>
        </div>
      )}
    </div>
  );
}

export default Home;
