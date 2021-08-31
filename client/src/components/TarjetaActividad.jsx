import React from 'react';
//import './Card.css';


export default function TarjetaActividad({ name, difficulty, duration, season }) {
    return (
        <div className="tarjetaActividad">

            <h5 className="activity-title">{name}</h5>
            <div className="row">
                <div>
                    <p>Difficulty:</p>
                    <p>{difficulty}</p>
                </div>
                <div>
                    <p>Duración:</p>
                    <p>{duration}</p>
                </div>
                <div>
                    <p>Temporada</p>
                    <p>{season}</p>
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