// // fonction login
// export const login = async (email, password) => {
//   try {
//     const response = await fetch('http://localhost:3001/api/v1/user/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify({ email, password })
//     });

//     if (!response.ok) {
//       throw new Error('Login failed');
//     }

//     const result = await response.json();
//     console.log(result);
    
//     if (result.body && result.body.token) {
//       const token = result.body.token;
//       localStorage.setItem('Token', token);
//       return { token };
//     } else {
//       throw new Error(result.message || 'Login failed');
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//   }
// };

  

// // fonction logout
// export const logout = () => {
//   localStorage.removeItem('Token');
// };


// // fonction de récupération des données utilisateur
// export const getUserData = async (token) => {
//     try {
//       const response = await fetch("http://localhost:3001/api/v1/user/profile", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${token}`,
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch user data');
//       }
  
//       const result = await response.json();
//       console.log(result);
      
//       return result.body;
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

// services/Authentification.js
export const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const result = await response.json();
      console.log(result);
      
      if (result.body && result.body.token) {
        const token = result.body.token;
        localStorage.setItem('Token', token);
  
        // récupération des donnnées du user
        const userDataResponse = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
  
        if (!userDataResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const userDataResult = await userDataResponse.json();
        console.log(userDataResult);
        
        return { user: userDataResult.body, token };
      } else {
        throw new Error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  
// fonction logout
export const logout = () => {
  localStorage.removeItem('Token');
};
