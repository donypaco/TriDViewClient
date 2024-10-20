
// export const fetchData = async (url) => {
//   try {
//     console.log(`Fetching data from: ${url}`); // Log the URL
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Fetch error:', error); // Log the error
//     throw error;
//   }
// };

export const fetchData = async (url, method = 'GET', body = null) => {
  try {
    console.log(`${method} request to: ${url}`);

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body); 
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    if (method !== 'DELETE') {
      const data = await response.json();
      return data;
    }

    return { success: true };

  } catch (error) {
    console.error(`${method} request error:`, error);
    throw error;
  }
};
