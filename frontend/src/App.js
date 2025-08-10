import React from 'react';

function App() {
  return (
    <div className="App">
      <header style={{ 
        background: '#282c34', 
        padding: '20px', 
        color: 'white',
        textAlign: 'center'
      }}>
        <h1>My E-Commerce Store</h1>
        <p>Frontend is running on localhost:3000</p>
        <p>Backend is running on localhost:5000</p>
      </header>
      
      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Welcome to our store!</h2>
        <p>This is a test page to make sure everything is working.</p>
        <div style={{ margin: '20px 0' }}>
          <button style={{ 
            padding: '10px 20px', 
            margin: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Products
          </button>
          <button style={{ 
            padding: '10px 20px', 
            margin: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Login
          </button>
          <button style={{ 
            padding: '10px 20px', 
            margin: '10px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Cart
          </button>
        </div>
        <p style={{ marginTop: '40px', fontSize: '18px' }}>
           React Frontend: Working<br/>
           Backend API: Ready<br/>
           Ready to build components!
        </p>
      </main>
    </div>
  );
}

export default App;