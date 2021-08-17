import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { Redirect } from 'react-router-dom';

export default function MovieDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        fetch(`https://ghibliapi.herokuapp.com/films/${id}`, 
        { method: "GET" })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            
            throw res;
        })
        .then(response => {
            setDetails(response);
            setIsLoading(false);
        })
        .catch(error => {
            window.location.href = "/404";
        })
    }, [])

    function Details() {
        if (!isLoading) {
            if (details !== undefined) {
                return (
                    <Container key={details.id}>
                        <p className="detail-title">Title: <span>{details.title}</span></p>
                        <p className="detail-title">Original title: <span>{details.original_title}</span></p>
                        <p className="detail-title">Description: <span>{details.description}</span></p>
                        <p className="detail-title">Director: <span>{details.director}</span></p>
                        <p className="detail-title">Producer: <span>{details.producer}</span></p>
                        <p className="detail-title">Release date: <span>{details.release_date}</span></p>
                        <p className="detail-title">Running time: <span>{details.running_time} hrs</span></p>
                    </Container>);
            }
            
            return <h2>404 not found</h2>
        }

        return <h2>Loading...</h2>
    }

    return (
        <div>
            <Details/>
            <Button onClick={() => history.goBack()}>Go back</Button>
        </div>
    );
}