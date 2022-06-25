import "./Form.module.css"
import { useState } from "react"

import { useFetch } from "../../hooks/useFetch"

const url = "http://localhost:3001/products"

const Form = () => {
    const { data: items, httpConfig, loading, error } = useFetch(url)

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const products = {
          name,
          price,
          description
        }
        httpConfig(products, "POST")
        setName("");
        setPrice("");
        setDescription("");
     }

     const handleDelete = (id) => {
      httpConfig(id, "DELETE")

     }

    return(
        <div className="addProduct">
            <h1>Lista de Produtos</h1>
            {loading && <p>Carregando dados...</p>} {/**Fazer uma animação de loading */}
            {error && <p>{error}</p>}
            {!error && <ol >
            {items && items.map((products) => (
          <li key={products.id}>
            {products.name} - R${products.price} <p>{products.description}</p> 
             <button onClick={() => handleDelete(products.id)}>Delete</button> 
          </li> 
            ))}
        </ol>
      }
     

     {!loading && 
     <form onSubmit={handleSubmit}>
     <label>
     Nome:  
     <input 
     type="text" 
     value={name}
     name="name"
     onChange={(e) => setName(e.target.value)} 
     />
     </label>

     <label>
     Preço:
     <input 
     type="number" 
     value={price}
     name="price"
     onChange={(e) => setPrice(e.target.value)} 
     />
     </label>

     <label>
     Descrição:
     <input 
     type="text" 
     value={description}
     name="description"
     onChange={(e) => setDescription(e.target.value)} 
     />
     </label>

     <input type="submit" value="Criar"/>
    </form> 
 }
            
        </div>
    )
}

export default Form