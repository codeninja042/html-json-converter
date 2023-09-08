const cheerio = require('cheerio');

const html = `
<div style="background-color: yellow; font-size: 14px" id="first-div">
    Hello, friends
    <p class="para" style="font-family: monospace; font-size: 11px">
        Lorem ipsum dolor sit
    </p>
    <footer style="width: auto; height: 100px; color: blue">
        <span>
            This is the end
        </span>
    </footer>
</div>
`;

function htmlToObject(html) {
    const $ = cheerio.load(html);

    function convertElementToJson(element) {
        const obj = {
            tag: element.prop("tagName").toLowerCase(),
            text: element.text().trim(),
        };

        const attributes = element[0].attribs;
        if (Object.keys(attributes).length > 0) {
            obj.attributes = attributes;
        }

        const style = element.css();
        if (Object.keys(style).length > 0) {
            obj.style = style;
        }

        const children = [];
        element.children().each((index, child) => {
            children.push(convertElementToJson($(child)));
        });

        if (children.length > 0) {
            obj.children = children;
        }

        return obj;
    }

    const rootElement = $("body").children().first();
    return convertElementToJson(rootElement);
}

module.exports = htmlToObject;
