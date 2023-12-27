function executeScripts(html) {
    const parsedHTML = new DOMParser().parseFromString(html, "text/html");

    parsedHTML.querySelectorAll("script").forEach((script) => {
        const scriptContent = script.textContent;
        const scriptFunction = new Function(scriptContent);
        scriptFunction();
    });
}

function loadComponent(componentName, dom, data = {}) {
    if (!(dom instanceof Element))
        throw new Error("Invalid DOM element provided!");

    fetch(`assets/html/components/${componentName}.html`)
        .then((response) => response.text())
        .then((html) => {
            if (Object.keys(data) !== 0) {
                html = replacePlaceholders(html, data);
            }
            // Assuming you have a specific container in your main.html
            executeScripts(html);
            dom.outerHTML = html;

            // or wrap with div . . .
            // const newDom = document.createElement("div");
            // newDom.innerHTML = html;

            // dom.parentNode.replaceChild(newDom, dom);
        });
}

function loadPage(componentName, dom, data = {}) {
    if (!(dom instanceof Element))
        throw new Error("Invalid DOM element provided!");

    fetch(`assets/html/components/pages/${componentName}.html`)
        .then((response) => response.text())
        .then((html) => {
            if (Object.keys(data) !== 0) {
                html = replacePlaceholders(html, data);
            }

            executeScripts(html);
            dom.innerHTML = html;
        });
}

function replacePlaceholders(html, data) {
    // Replace placeholders in the HTML with actual data
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, "g");
            html = html.replace(placeholder, formatXData(data[key]));
        }
    }
    return html;
}

//for passed variables between components
function formatXData(data) {
    let output = "";

    switch (typeof data) {
        case "object": {
            if (Array.isArray(data)) {
                output = `[${getRecursiveFormatedXDataByDeterminingType(
                    data
                )}]`;
                break;
            }
            output = `{ ${getRecursiveFormatedXDataByDeterminingType(data)} }`;
            break;
        }
        case "string": {
            output = data.replace(/'/g, "\\'");
            //"'" + data.replace(/'/g, "\\'") + "'";
            break;
        }
        default: {
            output = data;
            break;
        }
    }

    return output;
}

//for passed variables in variable(objects with data)
//reacts to strings differently when formatXData
function getRecursiveFormatedXDataByDeterminingType(data) {
    if (Array.isArray(data)) {
        return getRecursiveFormatedArrayForXData(data);
    }
    return getRecursiveFormatedObjectForXData(data);
}

function getRecursiveFormatedObjectForXData(data) {
    return Object.entries(data)
        .map(([key, value]) => {
            if (typeof value === "string") {
                value = value.replace(/'/g, "\\'");
            } else if (typeof value === "object") {
                if (Array.isArray(value)) {
                    return `[${getRecursiveFormatedXDataByDeterminingType(
                        value
                    )}]`;
                }
                value = `{ ${getRecursiveFormatedXDataByDeterminingType(
                    value
                )} }`;

                return `${key.replace(/'/g, "\\'")}: ${value}`;
            }

            return `${key.replace(/'/g, "\\'")}: '${value}'`;
        })
        .join(", ");
}

function getRecursiveFormatedArrayForXData(data) {
    return Object.entries(data)
        .map(([key, value]) => {
            if (typeof value === "string") {
                value = value.replace(/'/g, "\\'");
            } else if (typeof value === "object") {
                if (Array.isArray(value)) {
                    return `[${getRecursiveFormatedXDataByDeterminingType(
                        value
                    )}]`;
                }
                value = `{ ${getRecursiveFormatedXDataByDeterminingType(
                    value
                )} }`;

                return `${value}`;
            }

            return `'${value}'`;
        })
        .join(", ");
}
