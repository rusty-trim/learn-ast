export const TokenType = {

    LET: "Let",
    CONST: "Const",

    IDENTIFIER: "Identifier",
    NUMBER: "Number",
    NULL: "Null",

    ASSIGN: "Assign",

    PLUS: "Plus",
    MINUS: "Minus",
    STAR: "Star",
    SLASH: "Slash",
    PERCENT: "Percent",

    EQUAL: "Equal",
    NOT_EQUAL: "NotEqual",

    LESS: "Less",
    LESS_EQUAL: "LessEqual",
    GREATER: "Greater",
    GREATER_EQUAL: "GreaterEqual",

    OPEN_PAREN: "OpenParen",
    CLOSE_PAREN: "CloseParen",

    EOF: "EOF",
} as const;

const Keywords = {
    "LET": "let",
    "CONST": "const",
    "NULL": "null",
} as const;

export type TokenTypeValue =
    typeof TokenType[keyof typeof TokenType];

export interface Token {
    type: TokenTypeValue;
    value: string;
}

function isDigit(char: string) {
    return char >= "0" && char <= "9"
};

function isAlpha(char: string) {
    return (
        char >= "a" && char <= "z" ||
        char >= "A" && char <= "Z"
    );
}

export function tokenize(sourceCode: string) {
    const tokens: Token[] = [];

    for (let i = 0; i < sourceCode.length; i++) {
        let char = sourceCode[i] as string;

        if (sourceCode[i + 1]) {
            let peek = sourceCode[i]! + sourceCode[i + 1];
            switch (peek) {
                case "==":
                    tokens.push({ type: TokenType.EQUAL, value: peek });
                    i += 1;
                    continue;

                case "!=":
                    tokens.push({ type: TokenType.NOT_EQUAL, value: peek });
                    i += 1;
                    continue;
                case "<=":
                    tokens.push({ type: TokenType.LESS_EQUAL, value: peek });
                    i += 1;
                    continue;
                case ">=":
                    tokens.push({ type: TokenType.GREATER_EQUAL, value: peek });
                    i += 1;
                    continue;
            }
        }

        switch (char) {
            case "+":
                tokens.push({ type: TokenType.PLUS, value: char });
                break;
            case "-":
                tokens.push({ type: TokenType.MINUS, value: char });
                break;
            case "*":
                tokens.push({ type: TokenType.STAR, value: char });
                break;
            case "/":
                tokens.push({ type: TokenType.SLASH, value: char });
                break;
            case "%":
                tokens.push({ type: TokenType.PERCENT, value: char });
                break;
            case "=":
                tokens.push({ type: TokenType.ASSIGN, value: char });
                break;
            case "(":
                tokens.push({ type: TokenType.OPEN_PAREN, value: char });
                break;
            case ")":
                tokens.push({ type: TokenType.CLOSE_PAREN, value: char });
                break;
            case "<":
                tokens.push({ type: TokenType.LESS, value: char });
                break;
            case ">":
                tokens.push({ type: TokenType.GREATER, value: char });
                break;
            case " ":
            case "\t":
            case "\n":
            case "\r":
                continue;
            default:
                if (isDigit(char)) {
                    let number = "";

                    while (i < sourceCode.length && isDigit(sourceCode[i]!)) {
                        number += sourceCode[i];
                        i++;
                    }

                    i--;

                    tokens.push({ type: TokenType.NUMBER, value: number });
                } else if (isAlpha(char)) {
                    let word = "";

                    while (i < sourceCode.length && (isAlpha(sourceCode[i]!) || isDigit(sourceCode[i]!))) {
                        word += sourceCode[i];
                        i++;
                    }

                    i--;

                    switch (word) {
                        case Keywords.LET:
                            tokens.push({ type: TokenType.LET, value: word });
                            break;
                        case Keywords.CONST:
                            tokens.push({ type: TokenType.CONST, value: word });
                            break;
                        case Keywords.NULL:
                            tokens.push({ type: TokenType.NULL, value: word });
                        default:
                            tokens.push({ type: TokenType.IDENTIFIER, value: word });
                            break;
                    }
                }
        }
    }

    tokens.push({ type: TokenType.EOF, value: "EOF" });

    return tokens;
}