const fs = require('fs');

let readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const arrayDigits = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const decodedPassword = [];
let row = 1;
let column = 1;

function decode(line, digit) {
    // base case;
    if (line.length === 0) {
        return digit;
    }
    switch (line[0]) {
        case 'U':
            if (column >= 1) {
                column -= 1;
                digit = arrayDigits[column][row];
            }
            break;
        case 'D':
            if (column < 2) {
                column += 1;
                digit = arrayDigits[column][row];
            }
            break;
        case 'R':
            if (row < 2) {
                row += 1;
                digit = arrayDigits[column][row];
            }
            break;
        case 'L':
            if (row >= 1) {
                row -= 1;
                digit = arrayDigits[column][row];
            }
            break;
        default:
            throw Error("File contains unknown characters")
    }
    return decode(line.substring(1, line.length), digit, row, column);
}

function readTextFile(fileName) {
    const fileBuffer = fs.readFileSync(fileName, 'utf-8');
    // split the file's content by line
    fileBuffer.split(/\r?\n/).forEach((line) => {
        // this condition is set to avoid reading the last empty line
        if (line.length > 0) {
            decodedPassword.push(decode(line, arrayDigits[column][row], row, column));
        }
    });
    readLine.close();

    // Final result
    console.log("Password is : ", decodedPassword.join(" "));
}

readTextFile('./doc.txt');
