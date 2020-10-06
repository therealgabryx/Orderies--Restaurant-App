import React from 'react';
import './Home.css'; 

import { Card, ListGroup, ListGroupItem, CardHeader, CardTitle, CardBody } from "shards-react";

export default function Home() {
    return (
        <div className="home">
            <h4>Home</h4>

            {/* 
            
            First Dishes
            
            */} 
            <Card className="Card">
                <CardBody> 
                    <CardTitle className="CardTitle">First Dishes</CardTitle>
                    <hr></hr>
                    <ListGroup className="ListGroup">
                        <ListGroupItem>
                            <span>Pasta alla Cabonara</span>
                            <span> 
                                <span>7,50</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Pasta al Ragù</span>
                            <span>
                                <span>6,50</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Lasagne</span>
                            <span>
                                <span>7,00</span>
                                <span>€</span> 
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Tris di Canederli</span>
                            <span>
                                <span>5,90</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Spätzle</span>
                            <span>
                                <span>7,50</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        
                    </ListGroup> 
                </CardBody>
            </Card> 

            {/* 
            
            Second Dishes
            
            */} 
            <Card className="Card"> 
                <CardBody> 
                    <CardTitle className="CardTitle">Second Dishes</CardTitle>
                    <hr></hr>
                    <ListGroup className="ListGroup">
                        <ListGroupItem>
                            <span>Pasta alla Cabonara</span>
                            <span> 
                                <span>7,50</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Pasta al Ragù</span>
                            <span>
                                <span>6,50</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Lasagne</span>
                            <span>
                                <span>7,00</span>
                                <span>€</span> 
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Tris di Canederli</span>
                            <span>
                                <span>5,90</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Spätzle</span>
                            <span>
                                <span>7,50</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        
                    </ListGroup> 
                </CardBody>
            </Card>

            {/* 
            
            Desserts 
            
            */} 
            <Card className="Card"> 
                <CardBody> 
                    <CardTitle className="CardTitle">Desserts</CardTitle>
                    <hr></hr>
                    <ListGroup className="ListGroup">
                        <ListGroupItem>
                            <span>Pasta alla Cabonara</span>
                            <span> 
                                <span>7,50</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Pasta al Ragù</span>
                            <span>
                                <span>6,50</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Lasagne</span>
                            <span>
                                <span>7,00</span>
                                <span>€</span> 
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Tris di Canederli</span>
                            <span>
                                <span>5,90</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Spätzle</span>
                            <span>
                                <span>7,50</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        
                    </ListGroup> 
                </CardBody>
            </Card>

            {/* 
            
            Drinks
            
            */} 
            <Card className="Card"> 
                <CardBody> 
                    <CardTitle className="CardTitle">Drinks</CardTitle>
                    <hr></hr>
                    <ListGroup className="ListGroup">
                        <ListGroupItem>
                            <span>Pasta alla Cabonara</span>
                            <span> 
                                <span>7,50</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Pasta al Ragù</span>
                            <span>
                                <span>6,50</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Lasagne</span>
                            <span>
                                <span>7,00</span>
                                <span>€</span> 
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Tris di Canederli</span>
                            <span>
                                <span>5,90</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <span>Spätzle</span>
                            <span>
                                <span>7,50</span>
                                <span>€</span>
                            </span>
                        </ListGroupItem>
                        
                    </ListGroup> 
                </CardBody>
            </Card>



            

            
        </div>
    )
}
