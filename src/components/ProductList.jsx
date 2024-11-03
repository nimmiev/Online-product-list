import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <Container>
      <h1>Products</h1>
      <Row>
        {products.map(product => (
          <Col xs={12} sm={6} md={4} lg={3} key={product.id} className='p-3'>
            <Card className="text-start" style={{ height: '100%' }}>
              <Card.Img
                variant="top"
                src={product.image}
                style={{ maxHeight: '150px', objectFit: 'contain', padding: '10px' }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">${product.price}</Card.Subtitle>
                <Card.Text
                  style={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {product.description}
                </Card.Text>
                <div className="text-center">
                  <Link to={`/product/${product.id}`}>
                    <Button variant="primary">View Product</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
