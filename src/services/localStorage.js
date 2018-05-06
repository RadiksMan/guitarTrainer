export const setToLocalStorage = (key,value) => {
    try{
        window.localStorage.setItem(key, JSON.stringify(value));
    }catch(e){
        console.warn("Your browser doesn't support HTML5 LocalStorage which this site make use of");
    }
}

export const getFromLocalStorage = value => {
    return JSON.parse(window.localStorage[value] || '{}')
}

export const clearLocalStorage = () => {
    return window.localStorage.clear();
}