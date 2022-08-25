import mockMedic from "../../../data/mock.medic.json";

export const medics = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify(mockMedic)
    }
}