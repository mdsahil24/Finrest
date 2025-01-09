import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'x-rapidapi-key': '8aa6284843msh21bcdba61b55d7dp12485ajsne003c4203e0d',
            'x-rapidapi-host': 'bayut.p.rapidapi.com'
        }
    })

    return data;
}