const isInputWithSelectMethod = function (node) {
    return (
        node?.tagName &&
        node.tagName.toLowerCase() === 'input' &&
        typeof node.select === 'function'
    );
};
