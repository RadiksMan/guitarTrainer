//pick a random property from object
export const pickRandomProperty = (obj) =>{
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

//get element position (in document)
export const getOffset = el => {
    el = el.getBoundingClientRect();
    return {
        left: el.left + window.scrollX,
        top: el.top + window.scrollY
    };
};