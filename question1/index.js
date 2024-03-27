import express from "express";
import cors from "cors";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello from Afford Medical Backend");
});


const login = async () => {
  const loginData = {
    "companyName": "goMart",
    "clientID": "09d1e126-792e-4376-92e8-803961244fa0",
    "clientSecret": "TekKSVJBrYCIBnoM",
    "ownerName": "Raghav Goel",
    "ownerEmail": "9921103054@mail.jiit.ac.in",
    "rollNo": "9921103054"
  };

  try { 
    const response = await axios.post(`http://20.244.56.144/test/auth`, loginData);

    if (response?.status === 201) {
      const data = await response.data;
      return data;
    }
  }
  catch (error) {
    console.error('Error logging in:', error);
  }
}



async function fetchProductDataFromTestServer(category, company) {
  try {

    const data = await login()

    const header = `Authorization: Bearer ${data?.access_token}`;
    const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=10&minPrice=1&maxPrice=10000`,
      {
        headers: {
          'Authorization': `Bearer ${data?.access_token}`
      }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching product data from test server:', error);
    return [];
  }
}


app.get('/categories/:category/products', async (req, res) => {
  const { category } = req.params;

  let products = await fetchProductDataFromTestServer(category, "FLP");

  // Sort products if sortBy and sortOrder are provided
  // (You can sort products here if needed)

  // Apply pagination
  // (You can apply pagination here if needed)

  // Generate unique ids for products
  const productsWithId = products.map(product => ({
    ...product,
    id: uuidv4()
  }));

  res.json(productsWithId);
  // return res.status(200).json(products);
});



const startServer = async () => {
  try {
    app.listen(8000, () =>
      console.log("Server Started on the port http://localhost:8000")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
