import { Row, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import React, { useState, useEffect } from "react";
import { Input } from "@material-ui/core";

export default function MoviesList() {
    const [commitHistory, setCommitHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetch('https://ghibliapi.herokuapp.com/films', 
        { method: "GET" })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            
            throw res;
        })
        .then(response => {
            setCommitHistory(response)   
            setIsLoading(false);
        })
        .catch(error => console.log(error))
    }, [])

    function List() {
        if (isLoading) {
            return (<p>Loading...</p>);
        }

        if (commitHistory.length !== 0) {
            return (
                commitHistory.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase())).map((item, i) => 
                <Row key={i} sm={10}> 
                    <Container>
                        <a href={`/list/${item.id}`} className="movie-list-title-label">{item.title}({item.release_date})</a>
                    </Container>
                </Row>
                )
            )
        }

        return (<p>Nothing</p>)
    }

    return (
        <Container sm={10}>
            <br/>
            <h2>Ghibli Movie list</h2>
            <br/>
            <Input className="input-search" type="text" onChange={(e) => setSearchText(e.target.value)} value={searchText} placeholder="Search..."/>
                <List/>
            <br/>
        </Container>
    );
}