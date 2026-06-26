import { tokenize, TokenType, type Token } from "./lexer.ts";

type NodeType =
    | "Program"
    | "NumericLiteral"
    | "Identifier"
    | "BinaryExpr"

export interface Stmt {
    kind: NodeType
}

export interface Program extends Stmt {
    kind: "Program"
    body: Stmt[];
}

// TODO: This definition implies that an expression IS A statement and this is not true. So I should find some other way to represent expressions.
export interface Expr extends Stmt { };

export interface NumericLiteral extends Expr {
    kind: "NumericLiteral";
    value: number;
}

export interface Identifier extends Expr {
    kind: "Identifier";
    value: string;
}

export interface BinaryExpr extends Expr {
    kind: "BinaryExpr";
    left: Expr;
    right: Expr;
    operator: string;
}