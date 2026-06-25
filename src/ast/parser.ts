import type { BinaryExpr, Expr, Identifier, NumericLiteral, Program, Stmt } from "./ast.ts";
import { tokenize, TokenType, type Token } from "./lexer.ts";

class Parser {
    private tokens: Token[] = [];
    private current = 0;

    private at() {
        return this.tokens[this.current]!;
    }

    private eat() {
        const token = this.tokens[this.current]!;
        this.current++;
        return token;
    }

    private parseStmt() {
        // Not handling statements yet, so skip to parse expressions.
        return this.parseExpr();
    }

    private parseExpr() {
        return this.parseAdditiveExpr();
    }

    private parsePrimaryExpr(): Expr {
        const token = this.eat();

        switch (token.type) {
            case TokenType.IDENTIFIER:
                return { kind: "Identifier", value: token.value } as Identifier;
            case TokenType.NUMBER:
                return { kind: "NumericLiteral", value: Number(token.value) } as NumericLiteral;
            case TokenType.OPEN_PAREN:
                const expr = this.parseExpr();
                this.eat();
                return expr;
            default:
                console.error("Invalid primary expression detected:", token.value);
                process.exit();
        }
    }

    private parseMultiplicativeExpr() {
        let left = this.parsePrimaryExpr();

        while (this.at().value == "*" || this.at().value == "/") {
            const operator = this.eat();
            const right = this.parsePrimaryExpr();

            left = {
                kind: "BinaryExpr",
                left, right,
                operator: operator.value
            } as BinaryExpr;
        }


        return left;
    }

    private parseAdditiveExpr() {
        let left = this.parseMultiplicativeExpr();

        while (this.at().value == "+" || this.at().value == "-") {
            const operator = this.eat();
            const right = this.parseMultiplicativeExpr();

            left = {
                kind: "BinaryExpr",
                left, right,
                operator: operator.value
            } as BinaryExpr;
        }


        return left;
    }

    public produceAST(sourceCode: string) {
        this.tokens = tokenize(sourceCode);
        this.current = 0;

        const program: Program = {
            kind: "Program",
            body: []
        };

        while (this.tokens[this.current]!.type != "EOF") {
            program.body.push(this.parseStmt())
        }

        return program;
    }
}

const parser = new Parser();
console.log(JSON.stringify(parser.produceAST("let x = 5"), null, 2));