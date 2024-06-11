const api = useApi();

const getJokes = async () => {
    try {
        const {data} = await api.get('random');
        return data;
    } catch (error) {
        console.error("Une erreur s'est produite : ", error);
    }
}

const getCategories = async () => {
    try {
        const {data} = await api.get('categories');
        return data;
    } catch (error) {
        console.error("Une erreur s'est produite : ", error);
    }
}

const getJokeByCategory = async (category) => {
    try {
        const {data} = await api.get(`random?category=${category}`);
        return data;
    } catch (error) {
        console.error("Une erreur s'est produite : ", error);
    }
}