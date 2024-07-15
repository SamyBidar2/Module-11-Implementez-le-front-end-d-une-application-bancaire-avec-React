// fonction login
export const login = async (email, password) => {
  const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ email, password })
  });

  const result = await response.json();
  console.log(result);
  
  if (result.body && result.body.token) {
      const token = result.body.token;
      localStorage.setItem('Token', token);

      try {
          const profileResponse = await fetch('http://localhost:3001/api/v1/user/profile', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  'Authorization': `Bearer ${token}`
              }
          });

          const profile = await profileResponse.json();

          if (profile.body && profile.body.username) {
              return { username: profile.body.username, token };
          } else {
              console.warn('Profile fetch failed, returning token only');
              return { token };
          }
      } catch (error) {
          console.error('Error fetching profile:', error);
          return { token };
      }
  } else {
      throw new Error(result.message || 'Login failed');
  }
};


// fonction logout
export const logout = () => {
  localStorage.removeItem('Token');
};
