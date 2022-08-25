import mockAgenda from "../../../data/mock.agenda.json";

export const agend = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(mockAgenda)
    }
}