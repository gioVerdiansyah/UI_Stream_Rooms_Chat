const fetcher = async (url, options) => {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", import.meta.env.VITE_API_KEY);
  myHeaders.append("Content-Type", "application/json");

  if (options?.headers) {
    const headers = options.headers;
    for (const [key, value] of Object.entries(headers)) {
      myHeaders.append(key, value);
    }
  }

  const requestOptions = {
    ...options,
    headers: myHeaders,
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();

    if (!response.ok) {
      const error = new Error('Error fetching data');
      error.response = result;
      error.status = response.status;
      throw error;
    }

    return result;
  } catch (error) {
    console.error('Error fetching data:', {error});
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

export default fetcher;
