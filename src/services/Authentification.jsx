// fonction login
export const login = async (email, password) => {
  // Fonction utilitaire pour gérer les messages d'erreur
  const handleError = (message) => {
    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
      errorMessageElement.remove();
    }
    const messageContainer = document.getElementById('message-container');
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    messageContainer.appendChild(errorDiv);
  };

  try {
    const response = await fetch('http://localhost:3001/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      handleError('Login failed');
      throw new Error('Login failed');
    }

    const result = await response.json();
    console.log(result);
    
    if (result.body && result.body.token) {
      const token = result.body.token;
      sessionStorage.setItem('Token', token);

      // récupération des donnnées du user si on est loggé
      const userDataResponse = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!userDataResponse.ok) {
        handleError('Failed to fetch user data');
        throw new Error('Failed to fetch user data');
      }

      const userDataResult = await userDataResponse.json();
      console.log(userDataResult);
      
      return { user: userDataResult.body, token };
    } else {
      handleError(result.message || 'Login failed');
      throw new Error(result.message || 'Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
    handleError(error.message);
    throw error;
  }
};

// fonction logout
export const logout = () => {
  sessionStorage.removeItem('Token');
};
