import React from 'react';
import "./styles/tarjetaActividad.css"
//import './Card.css';


export default function TarjetaActividad({ name, difficulty, duration, season }) {
    return (
        <div className="tarjetaActividad">

            <h3 className="activityTitle">{name}</h3>
            <div className="rowar">
                <div className="slot">
                    <h5 className="subtitle">Dificultad:</h5>
                    <p className="diff">{difficulty}</p>
                </div>
                <div className="slot">
                    <h5 className="subtitle">Duración:</h5>
                    <p className="dur">{duration}</p>
                </div>
                <div className="slot">
                    <h5 className="subtitle">Temporada</h5>
                    <p className="seas">{season}</p>
                </div>
            </div>

        </div>
    );
};

/*
"activities": [
            {
                "id": 1,
                "name": "treeking",
                "difficulty": "2",
                "duration": "1 week",
                "season": "Spring",
                "createdAt": "2021-08-24T12:41:03.951Z",
                "updatedAt": "2021-08-24T12:41:03.951Z",
                "RelationTable": {
                    "createdAt": "2021-08-24T12:41:04.083Z",
                    "updatedAt": "2021-08-24T12:41:04.083Z",
                    "activityId": 1,
                    "countryId": 11
                }
            },
            {
                "id": 2,
                "name": "rafting",
                "difficulty": "3",
                "duration": "3 days",
                "season": "Spring",
                "createdAt": "2021-08-24T12:58:52.527Z",
                "updatedAt": "2021-08-24T12:58:52.527Z",
                "RelationTable": {
                    "createdAt": "2021-08-24T12:58:52.716Z",
                    "updatedAt": "2021-08-24T12:58:52.716Z",
                    "activityId": 2,
                    "countryId": 11
                }
            }
        ]
*/