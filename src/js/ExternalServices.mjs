const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    const errorText = await res.text(); 
    throw new Error(`Bad Response: ${res.status} - ${errorText}`); 
  }
}


export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    // console.log(data.Result);
    return data.Result;
  }

  async checkout(payload) {
    console.log("Payload being sent:", payload);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
   try {
      const response = await fetch(`${baseURL}checkout`, options);
      const data = await convertToJson(response);
      console.log("Server responded with:", data);
      return data;
    } catch (err) {
      console.error("Checkout failed:", err.message);
      throw err;
    }
  }
}