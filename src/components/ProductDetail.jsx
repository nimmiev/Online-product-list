import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function ProductDetail() {
  const { id } = useParams(); // Extract product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => console.error("Error fetching product details:", error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <Card className="text-start mt-4">
        <Card.Img
          variant="top"
          src={product.image}
          style={{ maxHeight: '300px', objectFit: 'contain', padding: '10px' }}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">${product.price}</Card.Subtitle>
          <Card.Text>{product.description}</Card.Text>
          <Link to="/">
            <Button variant="secondary">Back to Products</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetail;
