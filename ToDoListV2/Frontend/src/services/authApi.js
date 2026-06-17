const API_URL =`${import.meta.env.VITE_API_URL}/auth`;

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return response.json();
};

export const register = async (
  nombre,
  email,
  password
) => {
  const response = await fetch(
    `${API_URL}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        nombre,
        email,
        password,
      }),
    }
  );

  return response.json();
};